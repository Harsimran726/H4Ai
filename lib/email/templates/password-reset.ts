export function getPasswordResetHtml(token: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/reset-password/${token}`;
  return `
    <div style="font-family: sans-serif;">
      <h2>Reset your H4Ai Admin Password</h2>
      <p>Click the link below to set a new password. This link expires in 1 hour.</p>
      <a href="${url}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;
}
