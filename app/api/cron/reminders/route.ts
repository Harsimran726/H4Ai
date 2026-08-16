import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: query upcoming bookings and dispatch reminder emails
    return NextResponse.json({ success: true, processed: 0 });
  } catch (error) {
    console.error("Cron error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
