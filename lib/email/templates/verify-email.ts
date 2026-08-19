import { SITE_URL } from "@/lib/site";

export function getVerifyEmailHtml(token: string) {
  const url = `${SITE_URL}/api/auth/verify/${token}`;
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1e293b;">
      <h2 style="color: #0f172a;">Verify your H4Ai Admin Account</h2>
      <p style="line-height: 1.5; color: #475569;">Click the button below to verify your email address and activate your admin dashboard access.</p>
      <div style="margin: 24px 0;">
        <a href="${url}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
          Verify Email
        </a>
      </div>
    </div>
  `;
}
