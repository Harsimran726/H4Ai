import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : new Uint8Array(0);

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Protect any route under /admin EXCEPT login, verify, forgot-password, reset-password
  if (path.startsWith("/admin") && !path.startsWith("/admin/login") && !path.startsWith("/admin/verify") && !path.startsWith("/admin/forgot-password") && !path.startsWith("/admin/reset-password")) {
    const sessionCookie = req.cookies.get("session")?.value;

    if (!sessionCookie || !secretKey) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(sessionCookie, encodedKey, {
        algorithms: ["HS256"],
      });
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
