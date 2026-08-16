export function getBookingReminderHtml(name: string, timeString: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2>Meeting Reminder</h2>
      <p>Hi ${name},</p>
      <p>This is a quick reminder that your discovery call with H4Ai is starting at <strong>${timeString}</strong>.</p>
      <p>We look forward to speaking with you!</p>
    </div>
  `;
}
