export function getLeadConfirmationHtml(name: string) {
  return `
    <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #161821;">
      <h2 style="color: #4B3FA8;">Hi ${name},</h2>
      <p>Thank you for reaching out to H4Ai.</p>
      <p>We've received your inquiry and will review it shortly. You can expect to hear back from us within 24 hours to discuss how we can help your business.</p>
      <p>If you'd like to speak with us sooner, you can easily book a call directly on our calendar: <br/>
      <a href="https://h4ai.in/book-a-call" style="display: inline-block; padding: 10px 20px; background-color: #4B3FA8; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Book a Call</a></p>
      <br/>
      <p>Best regards,</p>
      <p><strong>The H4Ai Team</strong></p>
      <p>Mansa, Punjab</p>
      <p><a href="https://h4ai.in" style="color: #A9812F;">h4ai.in</a></p>
    </div>
  `;
}
