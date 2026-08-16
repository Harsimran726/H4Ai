import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validation/bookings";
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

    return NextResponse.json({ success: true, booking_id: result.booking.id });
  } catch (error: any) {
    console.error("Booking error", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
