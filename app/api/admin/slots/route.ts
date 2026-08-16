import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const dateParam = url.searchParams.get("date");
    
    if (!dateParam) {
      return NextResponse.json({ error: "date is required" }, { status: 400 });
    }

    const date = new Date(dateParam);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const slots = await prisma.availabilitySlot.findMany({
      where: {
        start_time: {
          gte: date,
          lt: nextDay
        }
      },
      orderBy: { start_time: "asc" },
      include: { booking: true }
    });

    return NextResponse.json({ slots });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
