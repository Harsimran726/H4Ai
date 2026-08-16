import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import { getPasswordResetHtml } from "@/lib/email/templates/password-reset";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (admin) {
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.authToken.create({
        data: {
          admin_user_id: admin.id,
          token_hash: token,
          type: "RESET",
          expires_at: expiresAt,
        },
      });

      await sendEmail({
        to: email,
        subject: "Password Reset - H4Ai Admin",
        html: getPasswordResetHtml(token),
      });
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
