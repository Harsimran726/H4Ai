import { z } from "zod";

export const bookingSchema = z.object({
  slot_id: z.string().uuid(),
  service_id: z.string().uuid(),
  visitor_name: z.string().min(2, "Name must be at least 2 characters"),
  visitor_email: z.string().email("Invalid email address"),
  visitor_phone: z.string().optional(),
  visitor_company_name: z.string().optional(),
  visitor_website: z.string().optional(),
  visitor_business: z.string().optional(),
  visitor_timezone: z.string(),
  notes: z.string().optional(),
  honeypot: z.string().max(0, "Invalid field").optional() // spam protection
});
