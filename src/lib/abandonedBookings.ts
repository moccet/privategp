import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

export type BloodTestPackage = 'essential' | 'comprehensive' | 'ultimate';

interface AbandonedBooking {
  id?: string; // Unique ID for tracking before payment intent
  paymentIntentId?: string; // Optional initially
  email: string;
  createdAt: Timestamp;
  capturedAt?: Timestamp; // When we first captured their details
  completedAt?: Timestamp;
  followUpEmailSent?: boolean;
  followUpEmailSentAt?: Timestamp;
  bookingType: string;
  packageType?: BloodTestPackage;
  amount?: number; // Optional initially
  currency: string;
  stage?: 'captured' | 'payment_intent_created' | 'completed'; // Track booking stage
  customerDetails?: {
    name?: string;
    phone?: string;
  };
  metadata?: any;
}

/**
 * Capture early-stage abandoned booking (before payment intent)
 */
export async function captureAbandonedBooking(data: {
  email: string;
  bookingType: string;
  packageType?: BloodTestPackage;
  customerDetails?: {
    name?: string;
    phone?: string;
  };
  metadata?: any;
}) {
  try {
    // Generate a unique ID - Firebase doesn't allow certain characters in document IDs
    const sanitizedEmail = data.email.replace(/[@.]/g, '_');
    const uniqueId = `${sanitizedEmail}_${Date.now()}`;
    const abandonedBookingRef = doc(db, 'abandonedBookings', uniqueId);
    
    // Build the document, excluding undefined values
    const abandonedBooking: any = {
      id: uniqueId,
      email: data.email,
      createdAt: Timestamp.now(),
      capturedAt: Timestamp.now(),
      bookingType: data.bookingType,
      currency: 'gbp',
      stage: 'captured',
      followUpEmailSent: false
    };

    // Only add optional fields if they have values
    if (data.packageType !== undefined) {
      abandonedBooking.packageType = data.packageType;
    }
    if (data.customerDetails !== undefined) {
      abandonedBooking.customerDetails = data.customerDetails;
    }
    if (data.metadata !== undefined) {
      abandonedBooking.metadata = data.metadata;
    }

    await setDoc(abandonedBookingRef, abandonedBooking);
    
    console.log('Early abandoned booking captured:', uniqueId);
    return { ...abandonedBooking, id: uniqueId };
  } catch (error) {
    console.error('Error capturing abandoned booking:', error);
    throw error;
  }
}

/**
 * Update abandoned booking when payment intent is created
 */
export async function updateAbandonedBookingWithPaymentIntent(data: {
  email: string;
  paymentIntentId: string;
  amount: number;
  abandonedBookingId?: string;
}) {
  try {
    // First, try to find existing abandoned booking by email
    let bookingToUpdate = null;
    
    if (data.abandonedBookingId) {
      // If we have the ID from early capture, use it
      const bookingRef = doc(db, 'abandonedBookings', data.abandonedBookingId);
      const bookingDoc = await getDoc(bookingRef);
      if (bookingDoc.exists()) {
        bookingToUpdate = { id: data.abandonedBookingId, ref: bookingRef };
      }
    }
    
    if (!bookingToUpdate) {
      // Otherwise, search by email for recent abandoned bookings
      const q = query(
        collection(db, 'abandonedBookings'),
        where('email', '==', data.email),
        where('stage', '==', 'captured')
      );
      const querySnapshot = await getDocs(q);
      
      // Find the most recent one
      if (!querySnapshot.empty) {
        const recentDoc = querySnapshot.docs[0];
        bookingToUpdate = { id: recentDoc.id, ref: recentDoc.ref };
      }
    }
    
    if (bookingToUpdate) {
      // Update existing booking with payment intent
      await updateDoc(bookingToUpdate.ref, {
        paymentIntentId: data.paymentIntentId,
        amount: data.amount,
        stage: 'payment_intent_created',
        updatedAt: Timestamp.now()
      });
      console.log('Updated abandoned booking with payment intent:', data.paymentIntentId);
    } else {
      // Create new booking if none exists (fallback)
      await saveAbandonedBooking({
        paymentIntentId: data.paymentIntentId,
        email: data.email,
        bookingType: 'unknown',
        amount: data.amount,
        currency: 'gbp'
      });
    }
  } catch (error) {
    console.error('Error updating abandoned booking with payment intent:', error);
    throw error;
  }
}

/**
 * Save abandoned booking when payment intent is created (legacy function)
 */
export async function saveAbandonedBooking(data: {
  paymentIntentId: string;
  email: string;
  bookingType: string;
  packageType?: BloodTestPackage;
  amount: number;
  currency: string;
  customerDetails?: {
    name?: string;
    phone?: string;
  };
  metadata?: any;
}) {
  try {
    const abandonedBookingRef = doc(db, 'abandonedBookings', data.paymentIntentId);
    
    // Build the document, excluding undefined values
    const abandonedBooking: any = {
      paymentIntentId: data.paymentIntentId,
      email: data.email,
      createdAt: Timestamp.now(),
      bookingType: data.bookingType,
      amount: data.amount,
      currency: data.currency,
      stage: 'payment_intent_created',
      followUpEmailSent: false
    };

    // Only add optional fields if they have values
    if (data.packageType !== undefined) {
      abandonedBooking.packageType = data.packageType;
    }
    if (data.customerDetails !== undefined) {
      abandonedBooking.customerDetails = data.customerDetails;
    }
    if (data.metadata !== undefined) {
      abandonedBooking.metadata = data.metadata;
    }

    await setDoc(abandonedBookingRef, abandonedBooking);
    
    console.log('Abandoned booking saved:', data.paymentIntentId);
    return abandonedBooking;
  } catch (error) {
    console.error('Error saving abandoned booking:', error);
    throw error;
  }
}

/**
 * Mark booking as completed when payment succeeds
 */
export async function markBookingAsCompleted(paymentIntentIdOrEmail: string) {
  try {
    // First try to find by payment intent ID
    const bookingRef = doc(db, 'abandonedBookings', paymentIntentIdOrEmail);
    const bookingDoc = await getDoc(bookingRef);
    
    if (bookingDoc.exists()) {
      await updateDoc(bookingRef, {
        completedAt: Timestamp.now(),
        stage: 'completed'
      });
      console.log('Booking marked as completed by payment intent:', paymentIntentIdOrEmail);
      return;
    }
    
    // If not found by payment intent, search by email for recent bookings
    const q = query(
      collection(db, 'abandonedBookings'),
      where('email', '==', paymentIntentIdOrEmail),
      where('stage', '!=', 'completed')
    );
    const querySnapshot = await getDocs(q);
    
    // Mark all matching bookings as completed
    for (const doc of querySnapshot.docs) {
      await updateDoc(doc.ref, {
        completedAt: Timestamp.now(),
        stage: 'completed'
      });
      console.log('Booking marked as completed by email:', doc.id);
    }
  } catch (error) {
    console.error('Error marking booking as completed:', error);
    throw error;
  }
}

/**
 * Get abandoned bookings that need follow-up emails
 * (Created more than 1 hour ago, not completed, and no email sent yet)
 */
export async function getAbandonedBookingsForFollowUp() {
  try {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    
    const q = query(
      collection(db, 'abandonedBookings'),
      where('followUpEmailSent', '==', false),
      where('createdAt', '<=', Timestamp.fromDate(oneHourAgo))
    );
    
    const querySnapshot = await getDocs(q);
    const abandonedBookings: AbandonedBooking[] = [];
    
    for (const doc of querySnapshot.docs) {
      const data = doc.data() as AbandonedBooking;
      // Only include if not completed
      if (!data.completedAt) {
        abandonedBookings.push(data);
      }
    }
    
    return abandonedBookings;
  } catch (error) {
    console.error('Error getting abandoned bookings:', error);
    throw error;
  }
}

/**
 * Mark follow-up email as sent
 */
export async function markFollowUpEmailSent(paymentIntentId: string) {
  try {
    const bookingRef = doc(db, 'abandonedBookings', paymentIntentId);
    
    await updateDoc(bookingRef, {
      followUpEmailSent: true,
      followUpEmailSentAt: Timestamp.now()
    });
    
    console.log('Follow-up email marked as sent:', paymentIntentId);
  } catch (error) {
    console.error('Error marking follow-up email as sent:', error);
    throw error;
  }
}