"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LeadStatusSelect({ leadId, initialStatus }: { leadId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string | null) => {
    if (!newStatus) return;
    setStatus(newStatus);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch (e) {
      console.error(e);
      setStatus(initialStatus); // Revert on failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={status} onValueChange={handleStatusChange} disabled={loading}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="NEW">New</SelectItem>
        <SelectItem value="CONTACTED">Contacted</SelectItem>
        <SelectItem value="CLOSED">Closed</SelectItem>
      </SelectContent>
    </Select>
  );
}
