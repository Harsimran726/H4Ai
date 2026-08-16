"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function AdminAvailabilityPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created?: number; error?: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<any[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Generate Slots
  const generateSlots = async (days: number) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/slots/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, startHour: 9, endHour: 17, slotDuration: 30 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error || "Failed to generate slots" });
      } else {
        setResult({ created: data.created });
        fetchSlots(selectedDate); // Refresh current view
      }
    } catch (e: any) {
      setResult({ error: e.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Slots for Selected Date
  const fetchSlots = async (date: Date) => {
    setSlotsLoading(true);
    try {
      // Need start of day
      const queryDate = new Date(date);
      queryDate.setHours(0,0,0,0);
      
      const res = await fetch(`/api/admin/slots?date=${queryDate.toISOString()}`);
      if (res.ok) {
        const data = await res.json();
        setSlots(data.slots || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSlotsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  // Toggle Slot Status
  const toggleSlot = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/slots/${id}/toggle`, { method: "PATCH" });
      if (res.ok) {
        fetchSlots(selectedDate);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-sora font-semibold text-foreground">Availability Manager</h2>
        <p className="text-muted-foreground mt-1">Manage, generate, and adjust your open time slots.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Generator */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Generate Slots</CardTitle>
              <CardDescription>
                Creates 30-minute booking slots on weekdays. Existing slots are skipped.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => generateSlots(7)} disabled={loading} variant="outline">
                  Next 7 Days
                </Button>
                <Button onClick={() => generateSlots(14)} disabled={loading} variant="outline">
                  Next 14 Days
                </Button>
                <Button onClick={() => generateSlots(30)} disabled={loading}>
                  {loading ? "Generating..." : "Next 30 Days"}
                </Button>
              </div>

              {result && (
                <div className={`rounded-lg px-4 py-3 text-sm font-medium ${result.error ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-700"}`}>
                  {result.error
                    ? `❌ Error: ${result.error}`
                    : `✅ Successfully created ${result.created} new slots.`}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Click a slot on the right to block/unblock it manually.</li>
                <li>Blocked slots appear greyed out to users.</li>
                <li>Slots already booked cannot be unblocked here without cancelling the booking.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Daily View */}
        <Card className="flex flex-col h-full min-h-[500px]">
          <CardHeader className="border-b pb-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>Previous Day</Button>
              <h3 className="font-semibold text-lg">{format(selectedDate, "EEEE, MMM d, yyyy")}</h3>
              <Button variant="outline" size="sm" onClick={() => changeDate(1)}>Next Day</Button>
            </div>
            <div className="flex justify-center mt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedDate(new Date())}>Today</Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pt-6">
            {slotsLoading ? (
              <p className="text-center text-muted-foreground py-8">Loading slots...</p>
            ) : slots.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No slots generated for this day.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots.map(slot => {
                  const isBooked = slot.booking && slot.booking.status !== "CANCELLED";
                  return (
                    <button
                      key={slot.id}
                      onClick={() => !isBooked && toggleSlot(slot.id)}
                      disabled={isBooked}
                      className={`
                        py-3 px-2 rounded-md border text-sm font-medium transition-all
                        ${isBooked 
                          ? "bg-primary/10 border-primary text-primary opacity-60 cursor-not-allowed" 
                          : slot.is_blocked 
                            ? "bg-muted border-border text-muted-foreground line-through opacity-70"
                            : "bg-background border-border hover:border-primary hover:text-primary"}
                      `}
                    >
                      {format(new Date(slot.start_time), "h:mm a")}
                      {isBooked && <span className="block text-[10px] uppercase mt-1 tracking-wider font-bold">Booked</span>}
                      {slot.is_blocked && !isBooked && <span className="block text-[10px] uppercase mt-1">Blocked</span>}
                      {!slot.is_blocked && !isBooked && <span className="block text-[10px] uppercase mt-1 text-green-600">Available</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
