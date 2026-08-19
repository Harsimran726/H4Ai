import { SITE_URL } from "@/lib/site";

export function getBookingConfirmationHtml({
  name,
  serviceName,
  date,
  time,
  timezone,
  cancelToken,
}: {
  name: string;
  serviceName: string;
  date: string;
  time: string;
  timezone: string;
  cancelToken: string;
}) {
  const cancelUrl = `${SITE_URL}/cancel-booking/${cancelToken}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Booking Confirmed — H4Ai</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 32px 28px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">H4Ai</h1>
            <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">Discovery Call & Strategy Session</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px 28px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 0; margin-bottom: 16px;">
              Booking Confirmed! 🎉
            </h2>
            <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
              Hi <strong>${name}</strong>,<br/>
              Your session for <strong>${serviceName}</strong> with H4Ai has been successfully scheduled. We look forward to speaking with you.
            </p>

            <!-- Meeting Details Box -->
            <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 18px 20px; border-radius: 6px; margin-bottom: 28px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 35%;">Service:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${serviceName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;">Date:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;">Time:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${time} (${timezone})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;">Format:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">Google Meet / Phone Call</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 14px; line-height: 1.5; color: #64748b; margin-bottom: 24px;">
              An invitation link will be shared prior to the call. If you have any preparation documents, business details, or specific workflows you'd like us to review, feel free to reply directly to this email.
            </p>

            <!-- Cancel Button / Link -->
            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
              <p style="font-size: 13px; color: #94a3b8; margin-bottom: 8px;">
                Need to make changes or cancel?
              </p>
              <a href="${cancelUrl}" style="display: inline-block; color: #ef4444; font-size: 13px; text-decoration: underline; font-weight: 500;">
                Cancel this booking
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8;">
            H4Ai — AI Voice Agents, Automation & Web Systems | Mansa, Punjab<br/>
            Email: <a href="mailto:contact@h4ai.in" style="color: #64748b;">contact@h4ai.in</a> | Phone: +91 78143 51011
          </div>

        </div>
      </body>
    </html>
  `;
}
