import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validation/bookings";
import { sendEmail } from "@/lib/email/client";
import { getBookingConfirmationHtml } from "@/lib/email/templates/booking-confirmation";
import { getBookingAdminNotificationHtml } from "@/lib/email/templates/booking-admin-notification";
import crypto from "crypto";

// In-memory rate limiting: max 5 bookings per IP per hour
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - rateData.lastReset > WINDOW_MS) {
      rateData.count = 1;
      rateData.lastReset = now;
    } else {
      rateData.count++;
      if (rateData.count > MAX_REQUESTS) {
        return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, rateData);

    const json = await req.json();

    if (json.honeypot) {
      return NextResponse.json({ success: true });
    }

    const parseResult = bookingSchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid data", details: parseResult.error.flatten() }, { status: 400 });
    }

    const data = parseResult.data;

    const result = await prisma.$transaction(async (tx) => {
      const slot = await tx.availabilitySlot.findUnique({
        where: { id: data.slot_id },
        include: { booking: true },
      });

      if (!slot) throw new Error("Slot not found");
      if (slot.is_blocked) throw new Error("Slot is blocked");
      if (slot.booking && slot.booking.status !== "CANCELLED") throw new Error("Slot already booked");

      const service = await tx.service.findUnique({ where: { id: data.service_id } });
      if (!service) throw new Error("Service not found");

      const booking = await tx.booking.create({
        data: {
          availability_slot_id: slot.id,
          service_id: service.id,
          visitor_name: data.visitor_name,
          visitor_email: data.visitor_email,
          visitor_phone: data.visitor_phone,
          visitor_company_name: data.visitor_company_name,
          visitor_website: data.visitor_website,
          visitor_business: data.visitor_business,
          visitor_timezone: data.visitor_timezone,
          notes: data.notes,
        },
      });

      const cancelToken = crypto.randomBytes(32).toString("hex");
      await tx.bookingToken.create({
        data: {
          booking_id: booking.id,
          token_hash: cancelToken,
          purpose: "CANCEL",
        },
      });

      return { booking, slot, service, cancelToken };
    });

    // Format date & time nicely for confirmation email
    const tz = data.visitor_timezone || "Asia/Kolkata";
    let formattedDate = "";
    let formattedTime = "";

    try {
      const startDate = new Date(result.slot.start_time);
      const endDate = new Date(result.slot.end_time);

      formattedDate = startDate.toLocaleDateString("en-US", {
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

      formattedTime = `${startTimeStr} – ${endTimeStr}`;
    } catch {
      formattedDate = new Date(result.slot.start_time).toDateString();
      formattedTime = new Date(result.slot.start_time).toTimeString();
    }

    // Send confirmation email to visitor
    const visitorSent = await sendEmail({
      to: data.visitor_email,
      subject: `Booking Confirmed: ${result.service.name} with H4Ai`,
      html: getBookingConfirmationHtml({
        name: data.visitor_name,
        serviceName: result.service.name,
        date: formattedDate,
        time: formattedTime,
        timezone: tz,
        cancelToken: result.cancelToken,
      }),
    });

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || "contact@h4ai.in";
    const adminSent = await sendEmail({
      to: adminEmail,
      subject: `New Booking: ${data.visitor_name} (${result.service.name})`,
      html: getBookingAdminNotificationHtml({
        visitorName: data.visitor_name,
        visitorEmail: data.visitor_email,
        visitorPhone: data.visitor_phone,
        visitorCompany: data.visitor_company_name,
        visitorWebsite: data.visitor_website,
        visitorBusiness: data.visitor_business,
        notes: data.notes,
        serviceName: result.service.name,
        date: formattedDate,
        time: formattedTime,
        timezone: tz,
      }),
    });

    // Log the emails
    try {
      await prisma.emailLog.createMany({
        data: [
          {
            booking_id: result.booking.id,
            template: "BOOKING_CONFIRMATION",
            recipient: data.visitor_email,
            status: visitorSent ? "SENT" : "FAILED",
          },
          {
            booking_id: result.booking.id,
            template: "BOOKING_ADMIN_NOTIFY",
            recipient: adminEmail,
            status: adminSent ? "SENT" : "FAILED",
          },
        ],
      });
    } catch (logError) {
      console.warn("Failed to create email logs:", logError);
    }

    return NextResponse.json({ success: true, booking_id: result.booking.id });
  } catch (error: any) {
    console.error("Booking error", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
