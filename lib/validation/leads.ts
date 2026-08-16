import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
