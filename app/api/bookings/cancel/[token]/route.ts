import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import { getBookingCancellationHtml } from "@/lib/email/templates/booking-cancellation";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Find the token
    const bookingToken = await prisma.bookingToken.findFirst({
      where: {
        token_hash: token,
        purpose: "CANCEL",
      },
      include: {
        booking: {
          include: {
            service: true,
            slot: true,
          },
        },
      },
    });

    if (!bookingToken || !bookingToken.booking) {
      return NextResponse.json({ error: "Invalid or expired cancellation link." }, { status: 404 });
    }

    const booking = bookingToken.booking;

    if (booking.status === "CANCELLED") {
      return NextResponse.json({ success: true, message: "Booking is already cancelled." });
    }

    // Update booking status to CANCELLED and mark token as used
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: booking.id },
        data: { status: "CANCELLED" },
      }),
      prisma.bookingToken.update({
        where: { id: bookingToken.id },
        data: { used_at: new Date() },
      }),
    ]);

    // Send cancellation email to visitor
    const visitorSent = await sendEmail({
      to: booking.visitor_email,
      subject: `Booking Cancelled: ${booking.service.name} with H4Ai`,
      html: getBookingCancellationHtml(booking.visitor_name),
    });

    // Send cancellation notice to admin
    const adminEmail = process.env.ADMIN_EMAIL || "contact@h4ai.in";
    const adminSent = await sendEmail({
      to: adminEmail,
      subject: `Booking Cancelled: ${booking.visitor_name} (${booking.service.name})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Booking Cancelled</h2>
          <p><strong>${booking.visitor_name}</strong> (${booking.visitor_email}) has cancelled their booking for <strong>${booking.service.name}</strong>.</p>
        </div>
      `,
    });

    try {
      await prisma.emailLog.createMany({
        data: [
          {
            booking_id: booking.id,
            template: "BOOKING_CANCELLATION",
            recipient: booking.visitor_email,
            status: visitorSent ? "SENT" : "FAILED",
          },
          {
            booking_id: booking.id,
            template: "BOOKING_ADMIN_CANCEL_NOTIFY",
            recipient: adminEmail,
            status: adminSent ? "SENT" : "FAILED",
          },
        ],
      });
    } catch (logError) {
      console.warn("Failed to create email logs for cancellation:", logError);
    }

    return NextResponse.json({ success: true, message: "Booking successfully cancelled." });
  } catch (error: any) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json({ error: error.message || "Failed to cancel booking" }, { status: 500 });
  }
}
