export function getBookingCancellationHtml(name: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2>Booking Cancelled</h2>
      <p>Hi ${name},</p>
      <p>Your meeting with H4Ai has been successfully cancelled.</p>
      <p>If you'd like to reschedule, please visit our website and book a new time slot.</p>
    </div>
  `;
}
