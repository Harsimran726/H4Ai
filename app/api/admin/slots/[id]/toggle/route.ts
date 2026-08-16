import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const slot = await prisma.availabilitySlot.findUnique({ where: { id } });
    if (!slot) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = await prisma.availabilitySlot.update({
      where: { id },
      data: { is_blocked: !slot.is_blocked }
    });

    return NextResponse.json({ success: true, is_blocked: updated.is_blocked });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
