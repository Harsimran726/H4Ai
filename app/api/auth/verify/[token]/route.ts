import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  try {
    const token = (await params).token;

    const authToken = await prisma.authToken.findFirst({
      where: {
        token_hash: token,
        type: "VERIFY",
        used_at: null,
        expires_at: { gt: new Date() },
      },
    });

    if (!authToken) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid_token", req.url));
    }

    await prisma.authToken.update({
      where: { id: authToken.id },
      data: { used_at: new Date() },
    });

    await prisma.adminUser.update({
      where: { id: authToken.admin_user_id },
      data: { email_verified: true },
    });

    return NextResponse.redirect(new URL("/admin/login?verified=true", req.url));
  } catch (error) {
    console.error("Verify error", error);
    return NextResponse.redirect(new URL("/admin/login?error=internal", req.url));
  }
}
