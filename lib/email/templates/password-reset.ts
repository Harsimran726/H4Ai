import { SITE_URL } from "@/lib/site";

export function getPasswordResetHtml(token: string) {
  const url = `${SITE_URL}/admin/reset-password/${token}`;
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1e293b;">
      <h2 style="color: #0f172a;">Reset your H4Ai Admin Password</h2>
      <p style="line-height: 1.5; color: #475569;">Click the button below to set a new password. This link expires in 1 hour.</p>
      <div style="margin: 24px 0;">
        <a href="${url}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 13px; color: #94a3b8;">If you did not request this, please ignore this email.</p>
    </div>
  `;
}
