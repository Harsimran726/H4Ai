import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/booking/service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const startParam = url.searchParams.get("start");
    const endParam = url.searchParams.get("end");

    if (!startParam || !endParam) {
      return NextResponse.json({ error: "start and end dates are required" }, { status: 400 });
    }

    const startDate = new Date(startParam);
    const endDate = new Date(endParam);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const slots = await getAvailableSlots(startDate, endDate);

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Availability GET error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
