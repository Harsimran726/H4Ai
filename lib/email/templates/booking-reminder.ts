export function getBookingReminderHtml({
  name,
  serviceName,
  date,
  time,
  timezone,
}: {
  name: string;
  serviceName: string;
  date: string;
  time: string;
  timezone: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Reminder: Your Call with H4Ai is Coming Up</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background: #1e3a8a; padding: 28px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Meeting Reminder ⏰</h1>
          </div>
          <div style="padding: 32px 28px;">
            <p style="font-size: 15px; line-height: 1.6; color: #475569;">
              Hi <strong>${name}</strong>,<br/>
              This is a quick reminder that your discovery session for <strong>${serviceName}</strong> with H4Ai is starting soon.
            </p>
            <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 4px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 4px 0;"><strong>Time:</strong> ${time} (${timezone})</p>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #64748b;">
              We look forward to speaking with you!
            </p>
          </div>
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px; text-align: center; font-size: 12px; color: #94a3b8;">
            H4Ai | <a href="mailto:contact@h4ai.in" style="color: #64748b;">contact@h4ai.in</a> | +91 78143 51011
          </div>
        </div>
      </body>
    </html>
  `;
}
