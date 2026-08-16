import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      slot: true,
      service: true,
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-sora font-semibold text-foreground">Bookings</h2>
        <p className="text-muted-foreground mt-1">View and manage visitor bookings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings found.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-4 border rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{booking.visitor_name} ({booking.visitor_email})</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.slot ? format(booking.slot.start_time, "PPp") : "Slot unassigned"} - {booking.status}
                    </p>
                  </div>
                  <div className="text-sm font-medium px-2 py-1 bg-muted rounded">
                    {booking.service.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
