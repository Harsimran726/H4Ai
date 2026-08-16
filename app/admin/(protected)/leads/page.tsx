import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import LeadStatusSelect from "./LeadStatusSelect";

export const dynamic = "force-dynamic";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { created_at: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-sora font-semibold text-foreground">Leads</h2>
        <p className="text-muted-foreground mt-1">Manage inquiries from the contact form.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-sm text-muted-foreground">No leads found.</p>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="p-4 border rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="font-medium">{lead.name} <span className="text-muted-foreground text-sm font-normal">({lead.email})</span></p>
                    <p className="text-sm mt-1">{lead.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(lead.created_at, "PPp")} • Interest: {lead.service_interest || 'N/A'}
                    </p>
                  </div>
                  <LeadStatusSelect leadId={lead.id} initialStatus={lead.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
