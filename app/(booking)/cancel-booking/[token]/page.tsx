"use client";

import { useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CancelBookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings/cancel/${token}`, {
        method: "POST"
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to cancel booking");
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>Booking Cancelled</CardTitle>
            <CardDescription>Your meeting has been successfully cancelled.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle>Cancel Booking</CardTitle>
          <CardDescription>Are you sure you want to cancel your upcoming meeting?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button variant="destructive" className="w-full" onClick={handleCancel} disabled={loading}>
            {loading ? "Cancelling..." : "Yes, Cancel My Meeting"}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
            No, Keep It
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
