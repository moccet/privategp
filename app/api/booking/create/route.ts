import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

interface BookingData {
  service: string | null;
  treatment: string | null;
  treatmentName: string | null;
  price: string | null;
  duration: string | null;
  personal: {
    fullName?: string;
    email?: string;
    phone?: string;
    dob?: string;
    gender?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    marketing?: string;
  };
  health: Record<string, any>;
  appointment: {
    appointmentDate?: string;
    appointmentTime?: string;
  };
  payment?: {
    paymentIntentId?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingData, paymentIntentId } = body as { 
      bookingData: BookingData; 
      paymentIntentId?: string;
    };

    if (!bookingData || !bookingData.personal.email) {
      return NextResponse.json(
        { error: 'Booking data with email is required' },
        { status: 400 }
      );
    }

    // Verify payment if it's a paid booking
    if (paymentIntentId && bookingData.price !== 'FREE') {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { error: 'Payment has not been completed' },
          { status: 400 }
        );
      }
    }

    let userId: string;
    let isNewUser = false;

    // Check if user exists or create new user
    try {
      const existingUser = await adminAuth.getUserByEmail(bookingData.personal.email);
      userId = existingUser.uid;
    } catch (error: any) {
      // User doesn't exist, create a new one
      if (error.code === 'auth/user-not-found') {
        // Generate a random password for the user
        const tempPassword = Math.random().toString(36).slice(-8) + 'Aa1!';
        
        const newUser = await adminAuth.createUser({
          email: bookingData.personal.email,
          password: tempPassword,
          displayName: bookingData.personal.fullName,
          phoneNumber: bookingData.personal.phone?.startsWith('+') 
            ? bookingData.personal.phone 
            : undefined,
        });
        
        userId = newUser.uid;
        isNewUser = true;

        // Create user profile in Firestore
        await adminDb.collection('users').doc(userId).set({
          uid: userId,
          email: bookingData.personal.email,
          fullName: bookingData.personal.fullName,
          phone: bookingData.personal.phone,
          dateOfBirth: bookingData.personal.dob,
          gender: bookingData.personal.gender,
          address: {
            line1: bookingData.personal.addressLine1 || '',
            line2: bookingData.personal.addressLine2,
            city: bookingData.personal.city || '',
            postalCode: bookingData.personal.postalCode || '',
            country: bookingData.personal.country || '',
          },
          marketingConsent: bookingData.personal.marketing === 'true',
          createdAt: FieldValue.serverTimestamp(),
          bookings: [],
        });

        // Send password reset email so user can set their own password
        const resetLink = await adminAuth.generatePasswordResetLink(bookingData.personal.email);
        
        // TODO: Send welcome email with reset link
        console.log('Password reset link:', resetLink);
      } else {
        throw error;
      }
    }

    // Create booking in Firestore
    const bookingRef = adminDb.collection('bookings').doc();
    const bookingId = bookingRef.id;
    
    const bookingRecord = {
      id: bookingId,
      userId,
      service: bookingData.service,
      treatment: bookingData.treatment,
      treatmentName: bookingData.treatmentName,
      price: bookingData.price,
      duration: bookingData.duration,
      personal: bookingData.personal,
      health: bookingData.health,
      appointment: bookingData.appointment,
      paymentIntentId: paymentIntentId || null,
      status: 'confirmed',
      createdAt: FieldValue.serverTimestamp(),
    };
    
    await bookingRef.set(bookingRecord);

    // Add booking to user's bookings array
    await adminDb.collection('users').doc(userId).update({
      bookings: FieldValue.arrayUnion(bookingId),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Send notifications
    if (process.env.SLACK_WEBHOOK_URL) {
      console.log('Attempting to send Slack notification for booking:', bookingId);
      const slackMessage = {
        text: `New ${bookingData.price === 'FREE' ? 'FREE' : 'PAID'} booking! 🎉\n` +
              `Service: ${bookingData.treatmentName}\n` +
              `Customer: ${bookingData.personal.fullName} ${isNewUser ? '(NEW USER)' : ''}\n` +
              `Email: ${bookingData.personal.email}\n` +
              `Phone: ${bookingData.personal.phone || 'N/A'}\n` +
              `Appointment: ${bookingData.appointment.appointmentDate} at ${bookingData.appointment.appointmentTime}\n` +
              `Amount: ${bookingData.price}`
      };

      try {
        const slackResponse = await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage),
        });
        
        if (!slackResponse.ok) {
          console.error('Slack webhook returned error:', slackResponse.status, await slackResponse.text());
        } else {
          console.log('Slack notification sent successfully for booking:', bookingId);
        }
      } catch (err) {
        console.error('Failed to send Slack notification:', err);
      }
    } else {
      console.log('SLACK_WEBHOOK_URL not configured, skipping notification');
    }

    // Email sending is handled by the Stripe webhook after payment confirmation
    // This prevents duplicate emails being sent

    return NextResponse.json({
      success: true,
      booking: {
        ...bookingRecord,
        createdAt: new Date().toISOString(),
      },
      isNewUser,
      message: isNewUser 
        ? 'Booking confirmed! Check your email to set up your account password.'
        : 'Booking confirmed successfully!',
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}