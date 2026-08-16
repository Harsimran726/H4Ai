export function getVerifyEmailHtml(token: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/verify/${token}`;
  return `
    <div style="font-family: sans-serif;">
      <h2>Verify your H4Ai Admin Account</h2>
      <p>Click the link below to verify your email address and log in to the admin dashboard.</p>
      <a href="${url}">Verify Email</a>
    </div>
  `;
}
