export function getBookingConfirmationHtml(name: string, date: string, time: string, cancelToken: string) {
  const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cancel-booking/${cancelToken}`;
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2>Booking Confirmed!</h2>
      <p>Hi ${name},</p>
      <p>Your discovery call with H4Ai has been successfully scheduled.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      </div>
      <p>We have attached an ICS calendar invitation to this email so you can add it directly to your calendar.</p>
      <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
        If you need to cancel this meeting, please click the link below:<br/>
        <a href="${cancelUrl}">Cancel Booking</a>
      </p>
    </div>
  `;
}
