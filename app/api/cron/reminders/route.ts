import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import { getBookingReminderHtml } from "@/lib/email/templates/booking-reminder";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    // Find confirmed bookings starting within the next 2 hours that haven't received a reminder
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        slot: {
          start_time: {
            gte: now,
            lte: twoHoursFromNow,
          },
        },
        email_logs: {
          none: {
            template: "BOOKING_REMINDER",
          },
        },
      },
      include: {
        slot: true,
        service: true,
      },
    });

    let processed = 0;

    for (const booking of upcomingBookings) {
      if (!booking.slot) continue;

      const tz = booking.visitor_timezone || "Asia/Kolkata";
      const startDate = new Date(booking.slot.start_time);
      const endDate = new Date(booking.slot.end_time);

      const formattedDate = startDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: tz,
      });

      const startTimeStr = startDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: tz,
      });

      const endTimeStr = endDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: tz,
      });

      const formattedTime = `${startTimeStr} – ${endTimeStr}`;

      const sent = await sendEmail({
        to: booking.visitor_email,
        subject: `Reminder: Your call for ${booking.service.name} is starting soon`,
        html: getBookingReminderHtml({
          name: booking.visitor_name,
          serviceName: booking.service.name,
          date: formattedDate,
          time: formattedTime,
          timezone: tz,
        }),
      });

      await prisma.emailLog.create({
        data: {
          booking_id: booking.id,
          template: "BOOKING_REMINDER",
          recipient: booking.visitor_email,
          status: sent ? "SENT" : "FAILED",
        },
      });

      processed++;
    }

    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error("Cron reminders error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
