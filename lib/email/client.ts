import nodemailer from "nodemailer";

export function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("SMTP credentials missing (SMTP_USER / SMTP_PASS). Email not sent.");
    return false;
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Could not create nodemailer transporter. Email not sent.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"H4Ai" <${user}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully to %s: messageId=%s", to, info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email to " + to + ":", error);
    return false;
  }
}
