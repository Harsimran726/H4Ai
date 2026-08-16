import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, admin.password_hash);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!admin.email_verified) {
      return NextResponse.json({ error: "Email not verified" }, { status: 401 });
    }

    await createSession(admin.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
