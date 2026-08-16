import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/validation/leads";
import { sendEmail } from "@/lib/email/client";
import { getLeadNotificationHtml } from "@/lib/email/templates/lead-notification";
import { getLeadConfirmationHtml } from "@/lib/email/templates/lead-confirmation";

// In-memory rate limiting: max 10 requests per IP per 2 seconds
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 2000;
  const maxRequests = 10;

  let record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (now - record.lastReset > windowMs) {
    record.count = 1;
    record.lastReset = now;
    return false;
  }

  if (record.count >= maxRequests) return true;

  record.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid data", details: result.error.errors }, { status: 400 });
    }

    const data = result.data;

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    let lead;
    try {
      lead = await prisma.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service_interest: data.service,
          message: data.message,
          source: "CONTACT_FORM",
          status: "NEW",
        },
      });
    } catch (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || "contact@h4ai.in";

    const adminSent = await sendEmail({
      to: adminEmail,
      subject: `New Lead: ${data.name}`,
      html: getLeadNotificationHtml(data),
    });

    const visitorSent = await sendEmail({
      to: data.email,
      subject: "We've received your inquiry - H4Ai",
      html: getLeadConfirmationHtml(data.name),
    });

    await prisma.emailLog.createMany({
      data: [
        { lead_id: lead.id, template: "LEAD_NOTIFY", recipient: adminEmail, status: adminSent ? "SENT" : "FAILED" },
        { lead_id: lead.id, template: "LEAD_CONFIRMATION", recipient: data.email, status: visitorSent ? "SENT" : "FAILED" },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unhandled error in leads route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
