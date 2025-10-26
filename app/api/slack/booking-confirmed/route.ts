import { NextRequest, NextResponse } from 'next/server'

interface BookingConfirmedData {
  email: string;
  fullName: string;
  phone?: string;
  service?: string | null;
  treatmentName?: string | null;
  price?: string | number | null;
  appointmentDate?: string;
  appointmentTime?: string;
  location?: string;
  referenceNumber?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingConfirmedData = await request.json();

    if (!body.email || !body.fullName) {
      return NextResponse.json(
        { error: 'Email and full name are required' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.log('SLACK_WEBHOOK_URL not configured, skipping notification');
      return NextResponse.json({
        success: true,
        message: 'Slack notification skipped (webhook not configured)'
      });
    }

    // Create the Slack message
    const slackMessage = {
      text: `✅ BOOKING CONFIRMED\n\n` +
            `Reference: ${body.referenceNumber || 'N/A'}\n` +
            `Name: ${body.fullName}\n` +
            `Email: ${body.email}\n` +
            `Phone: ${body.phone || 'Not provided'}\n` +
            `Service: ${body.treatmentName || body.service || 'Not specified'}\n` +
            `Price: ${body.price || 'Not specified'}\n` +
            (body.appointmentDate ? `Date: ${new Date(body.appointmentDate).toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}\n` : '') +
            (body.appointmentTime ? `Time: ${body.appointmentTime}\n` : '') +
            (body.location ? `Location: ${body.location}\n` : '') +
            `Confirmed: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });

      if (!response.ok) {
        console.error('Slack webhook returned error:', response.status, await response.text());
        return NextResponse.json({
          success: false,
          error: 'Failed to send Slack notification'
        }, { status: 500 });
      }

      console.log('Slack notification sent for booking confirmation:', body.email);

      return NextResponse.json({
        success: true,
        message: 'Slack notification sent successfully'
      });

    } catch (error) {
      console.error('Failed to send Slack notification:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to send Slack notification'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing booking confirmation notification:', error);
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}
