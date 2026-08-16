import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { sendEmail } from "@/lib/email/client";
import { getPasswordChangedHtml } from "@/lib/email/templates/password-changed";

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const token = (await params).token;
    const { password } = await req.json();

    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const authToken = await prisma.authToken.findFirst({
      where: {
        token_hash: token,
        type: "RESET",
        used_at: null,
        expires_at: { gt: new Date() },
      },
      include: { admin_user: true },
    });

    if (!authToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const newHash = await hashPassword(password);

    await prisma.adminUser.update({
      where: { id: authToken.admin_user_id },
      data: { password_hash: newHash },
    });

    await prisma.authToken.update({
      where: { id: authToken.id },
      data: { used_at: new Date() },
    });

    await sendEmail({
      to: authToken.admin_user.email,
      subject: "Your password has been changed",
      html: getPasswordChangedHtml(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
