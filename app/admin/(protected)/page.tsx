import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [newLeadsCount, upcomingBookingsCount, recentLeads, recentBookings] = await Promise.all([
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.booking.count({
      where: {
        status: "CONFIRMED",
        slot: { start_time: { gte: new Date() } },
      },
    }),
    prisma.lead.findMany({ take: 3, orderBy: { created_at: "desc" } }),
    prisma.booking.findMany({ take: 3, orderBy: { created_at: "desc" }, include: { slot: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-sora font-semibold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome to the H4Ai Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader><CardTitle className="text-lg">New Leads</CardTitle></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{newLeadsCount}</p>
            <p className="text-sm text-muted-foreground mt-2">Awaiting contact</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader><CardTitle className="text-lg">Upcoming Bookings</CardTitle></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{upcomingBookingsCount}</p>
            <p className="text-sm text-muted-foreground mt-2">Confirmed meetings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Leads</CardTitle>
            <Link href="/admin/leads" className={buttonVariants({ variant: "ghost", size: "sm" })}>View all</Link>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent leads.</p>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex justify-between items-center text-sm border-b pb-3 last:border-0 last:pb-0 pt-3 first:pt-0">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-muted-foreground">{format(lead.created_at, "MMM d, yyyy")}</p>
                    </div>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">{lead.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
            <Link href="/admin/bookings" className={buttonVariants({ variant: "ghost", size: "sm" })}>View all</Link>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent bookings.</p>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center text-sm border-b pb-3 last:border-0 last:pb-0 pt-3 first:pt-0">
                    <div>
                      <p className="font-medium">{booking.visitor_name}</p>
                      <p className="text-muted-foreground">
                        {booking.slot ? format(booking.slot.start_time, "MMM d, h:mm a") : "No slot"}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">{booking.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
