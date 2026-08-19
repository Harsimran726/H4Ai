export function getBookingAdminNotificationHtml({
  visitorName,
  visitorEmail,
  visitorPhone,
  visitorCompany,
  visitorWebsite,
  visitorBusiness,
  notes,
  serviceName,
  date,
  time,
  timezone,
}: {
  visitorName: string;
  visitorEmail: string;
  visitorPhone?: string | null;
  visitorCompany?: string | null;
  visitorWebsite?: string | null;
  visitorBusiness?: string | null;
  notes?: string | null;
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
        <title>New Booking Scheduled — H4Ai</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
          <div style="background: #1e3a8a; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">New Discovery Call Booked 📅</h1>
          </div>
          <div style="padding: 24px;">
            <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 16px;">
              Booking Details
            </h2>
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 4px 0;"><strong>Service:</strong> ${serviceName}</p>
              <p style="margin: 4px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 4px 0;"><strong>Time:</strong> ${time} (${timezone})</p>
            </div>

            <h3 style="font-size: 16px; color: #0f172a; margin-bottom: 12px;">Client Information</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 35%;">Name:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${visitorName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${visitorEmail}" style="color: #2563eb;">${visitorEmail}</a></td>
              </tr>
              ${visitorPhone ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Phone:</td>
                <td style="padding: 6px 0;"><a href="tel:${visitorPhone}" style="color: #2563eb;">${visitorPhone}</a></td>
              </tr>` : ''}
              ${visitorCompany ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Company:</td>
                <td style="padding: 6px 0; color: #0f172a;">${visitorCompany}</td>
              </tr>` : ''}
              ${visitorBusiness ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Business Type:</td>
                <td style="padding: 6px 0; color: #0f172a;">${visitorBusiness}</td>
              </tr>` : ''}
              ${visitorWebsite ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Website:</td>
                <td style="padding: 6px 0;"><a href="${visitorWebsite}" target="_blank" style="color: #2563eb;">${visitorWebsite}</a></td>
              </tr>` : ''}
              ${notes ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Notes:</td>
                <td style="padding: 6px 0; color: #0f172a;">${notes}</td>
              </tr>` : ''}
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
}
