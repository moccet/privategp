import { NextRequest, NextResponse } from 'next/server'

interface EnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  serviceOfInterest: string;
  message?: string;
  preferredContactMethod?: string;
  howDidYouHear?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EnquiryData = await request.json();

    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
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
      text: `🔔 New Enquiry Received\n` +
            `Name: ${body.firstName} ${body.lastName}\n` +
            `Email: ${body.email}\n` +
            `Phone: ${body.phone}\n` +
            `Service of Interest: ${body.serviceOfInterest}\n` +
            (body.company ? `Company: ${body.company}\n` : '') +
            (body.preferredContactMethod ? `Preferred Contact: ${body.preferredContactMethod}\n` : '') +
            (body.howDidYouHear ? `Source: ${body.howDidYouHear}\n` : '') +
            (body.message ? `Message: ${body.message}\n` : '') +
            `Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`
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

      console.log('Slack notification sent for enquiry from:', body.email);

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
    console.error('Error processing enquiry notification:', error);
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}
