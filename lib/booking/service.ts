import { prisma } from "@/lib/db";

export async function getAvailableSlots(startDate: Date, endDate: Date) {
  const slots = await prisma.availabilitySlot.findMany({
    where: {
      start_time: {
        gte: startDate,
        lte: endDate,
      },
      is_blocked: false,
      booking: {
        is: null,
      },
    },
    orderBy: { start_time: "asc" },
  });
  return slots;
}

export async function getActiveServices() {
  return prisma.service.findMany({
    where: { is_active: true },
    orderBy: { name: "asc" },
  });
}
