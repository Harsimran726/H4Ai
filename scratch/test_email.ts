import { config } from "dotenv";
config({ path: "../.env" }); // Load .env file FIRST

import { sendEmail } from "../lib/email/client"; // Import AFTER config

async function testEmail() {
  console.log("Testing SMTP connection with:", process.env.SMTP_USER);
  const success = await sendEmail({
    to: "contact@h4ai.in",
    subject: "H4Ai SMTP Test - It Works!",
    html: "<h1>SMTP Configuration is Working!</h1><p>Your email credentials have been successfully verified by the AI.</p>",
  });

  if (success) {
    console.log("✅ Email sent successfully!");
  } else {
    console.log("❌ Failed to send email. Check credentials or hostinger settings.");
  }
}

testEmail();
