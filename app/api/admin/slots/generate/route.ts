import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    // Auth check
    const session = await verifySession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { days = 14, startHour = 9, endHour = 17, slotDuration = 30 } = await req.json().catch(() => ({}));

    const now = new Date();
    let created = 0;
    let skipped = 0;

    for (let d = 0; d < days; d++) {
      const day = new Date(now);
      day.setDate(now.getDate() + d + 1);
      day.setHours(0, 0, 0, 0);

      const dayOfWeek = day.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += slotDuration) {
          const start = new Date(day);
          start.setHours(hour, min, 0, 0);
          const end = new Date(start);
          end.setMinutes(end.getMinutes() + slotDuration);

          const slotDate = new Date(day);
          slotDate.setHours(0, 0, 0, 0);

          try {
            await prisma.availabilitySlot.create({
              data: { slot_date: slotDate, start_time: start, end_time: end },
            });
            created++;
          } catch {
            skipped++;
          }
        }
      }
    }

    return NextResponse.json({ success: true, created, skipped });
  } catch (error: any) {
    console.error("Slot generation error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
