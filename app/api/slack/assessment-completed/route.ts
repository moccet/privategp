import { NextRequest, NextResponse } from 'next/server'

interface AssessmentData {
  // Patient Information
  patient_name: string
  patient_email?: string
  patient_phone?: string
  patient_address?: string
  booking_id?: string

  // Package Information
  package_name: string
  package_price?: number

  // MRI Information
  mri_date?: string
  mri_time?: string
  mri_previous?: boolean
  mri_metal_work?: boolean
  mri_pacemaker?: boolean
  mri_metal_details?: string

  // Microbiome Kit Information
  microbiome_kit_address?: string
  microbiome_kit_notes?: string
  microbiome_kit_delivery_date?: string

  // Blood Test Information
  blood_test_same_day?: boolean
  blood_test_date?: string
  blood_test_time?: string

  // Follow-up Information
  follow_up_months?: number

  // Meta Information
  form_id?: string
  response_id?: string
  completed_at?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: AssessmentData = await request.json()

    const webhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!webhookUrl) {
      console.log('SLACK_WEBHOOK_URL not configured, skipping notification')
      return NextResponse.json({
        success: true,
        message: 'Slack notification skipped (webhook not configured)'
      })
    }

    // Format the MRI date and time
    const formatMRIDateTime = () => {
      if (body.mri_date) {
        const date = new Date(body.mri_date).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        return `${date}${body.mri_time ? ` at ${body.mri_time}` : ''}`
      }
      return 'Not scheduled'
    }

    // Format blood test date and time
    const formatBloodTestDateTime = () => {
      if (body.blood_test_same_day) {
        return `Same day as MRI${body.blood_test_time ? ` at ${body.blood_test_time}` : ''}`
      } else if (body.blood_test_date) {
        const date = new Date(body.blood_test_date).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        return `${date}${body.blood_test_time ? ` at ${body.blood_test_time}` : ''}`
      }
      return 'Not scheduled'
    }

    // Format microbiome delivery date
    const formatDeliveryDate = () => {
      if (body.microbiome_kit_delivery_date) {
        return new Date(body.microbiome_kit_delivery_date).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
      return 'Not specified'
    }

    // Create the Slack message with all assessment information
    const slackMessage = {
      text: `✅ Assessment Completed - ${body.package_name}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "✅ Assessment Form Completed"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Package:*\n${body.package_name}${body.package_price ? ` (£${body.package_price})` : ''}`
            },
            {
              type: "mrkdwn",
              text: `*Completed:*\n${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`
            }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*👤 Patient Information*"
          },
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:* ${body.patient_name}`
            },
            {
              type: "mrkdwn",
              text: `*Email:* ${body.patient_email || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Phone:* ${body.patient_phone || 'Not provided'}`
            },
            {
              type: "mrkdwn",
              text: `*Booking ID:* ${body.booking_id || 'N/A'}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Address:*\n${body.patient_address ? body.patient_address.replace(/\n/g, ', ') : 'Not provided'}`
          }
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*🏥 MRI Scan Details*"
          },
          fields: [
            {
              type: "mrkdwn",
              text: `*Scheduled:* ${formatMRIDateTime()}`
            },
            {
              type: "mrkdwn",
              text: `*Previous MRI:* ${body.mri_previous === true ? 'Yes' : body.mri_previous === false ? 'No' : 'Not answered'}`
            },
            {
              type: "mrkdwn",
              text: `*Metal Work:* ${body.mri_metal_work === true ? 'Yes' : body.mri_metal_work === false ? 'No' : 'Not answered'}`
            },
            {
              type: "mrkdwn",
              text: `*Pacemaker:* ${body.mri_pacemaker === true ? 'Yes ⚠️' : body.mri_pacemaker === false ? 'No' : 'Not answered'}`
            }
          ]
        },
        ...(body.mri_metal_details ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Metal Work Details:*\n${body.mri_metal_details}`
            }
          }
        ] : []),
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*🧬 Microbiome Kit Delivery*"
          },
          fields: [
            {
              type: "mrkdwn",
              text: `*Delivery Date:* ${formatDeliveryDate()}`
            },
            {
              type: "mrkdwn",
              text: `*Delivery Address:*\n${body.microbiome_kit_address ? body.microbiome_kit_address.replace(/\n/g, ', ') : 'Same as patient address'}`
            }
          ]
        },
        ...(body.microbiome_kit_notes ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Delivery Notes:*\n${body.microbiome_kit_notes}`
            }
          }
        ] : []),
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*💉 Blood Test*"
          },
          fields: [
            {
              type: "mrkdwn",
              text: `*Scheduled:* ${formatBloodTestDateTime()}`
            }
          ]
        },
        {
          type: "divider"
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*📅 Follow-up Consultation*"
          },
          fields: [
            {
              type: "mrkdwn",
              text: `*Preferred Timing:* ${body.follow_up_months ? `${body.follow_up_months} month${body.follow_up_months > 1 ? 's' : ''} after initial consultation` : 'Not specified'}`
            }
          ]
        },
        ...(body.form_id || body.response_id ? [
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `Form ID: ${body.form_id || 'N/A'} | Response ID: ${body.response_id || 'N/A'}`
              }
            ]
          }
        ] : [])
      ]
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      })

      if (!response.ok) {
        console.error('Slack webhook returned error:', response.status, await response.text())
        return NextResponse.json({
          success: false,
          error: 'Failed to send Slack notification'
        }, { status: 500 })
      }

      console.log('Slack notification sent for assessment completion:', body.patient_name)

      return NextResponse.json({
        success: true,
        message: 'Slack notification sent successfully'
      })

    } catch (error) {
      console.error('Failed to send Slack notification:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to send Slack notification'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error processing assessment completion notification:', error)
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    )
  }
}