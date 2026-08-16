import { LeadInput } from "@/lib/validation/leads";

export function getLeadNotificationHtml(data: LeadInput) {
  return `
    <div style="font-family: sans-serif;">
      <h2>New Lead Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
      <p><strong>Service Interest:</strong> ${data.service || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
  `;
}
