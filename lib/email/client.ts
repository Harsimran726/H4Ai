import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT) || 465;
const secure = port === 465;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!user || !pass) {
    console.warn("SMTP credentials missing. Email not sent.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"H4Ai" <${user}>`,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
