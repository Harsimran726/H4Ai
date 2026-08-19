import { SITE_URL } from "@/lib/site";

export function getBookingCancellationHtml(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Booking Cancelled — H4Ai</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background: #ef4444; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Booking Cancelled</h1>
          </div>
          <div style="padding: 32px 28px;">
            <p style="font-size: 15px; line-height: 1.6; color: #475569;">
              Hi <strong>${name}</strong>,<br/>
              Your meeting with H4Ai has been successfully cancelled as requested.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-top: 20px;">
              If you'd like to reschedule for another time, please feel free to visit our booking page whenever you are ready:
            </p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${SITE_URL}/book-a-call" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 14px;">
                Schedule a New Call
              </a>
            </div>
          </div>
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8;">
            H4Ai — AI Voice Agents & Web Development | <a href="mailto:contact@h4ai.in" style="color: #64748b;">contact@h4ai.in</a>
          </div>
        </div>
      </body>
    </html>
  `;
}
