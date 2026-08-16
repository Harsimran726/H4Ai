"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Loader2, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";

export default function BookACallPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    business: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (date) {
      fetchSlots(date);
    }
  }, [date]);

  const fetchSlots = async (selectedDate: Date) => {
    setLoading(true);
    try {
      const start = new Date(selectedDate);
      start.setHours(0,0,0,0);
      const end = new Date(selectedDate);
      end.setHours(23,59,59,999);

      const res = await fetch(`/api/availability?start=${start.toISOString()}&end=${end.toISOString()}`);
      const data = await res.json();
      if (res.ok) {
        setSlots(data.slots || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_id: selectedSlot,
          service_id: "00000000-0000-0000-0000-000000000000", // Dynamic ID usually
          visitor_name: formData.name,
          visitor_email: formData.email,
          visitor_phone: formData.phone,
          visitor_company_name: formData.company,
          visitor_website: formData.website,
          visitor_business: formData.business,
          visitor_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-lg border-border/50">
          <CardHeader className="pt-8">
            <div className="mx-auto bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-sora">Booking Confirmed!</CardTitle>
            <CardDescription className="text-base mt-2">
              Thank you, {formData.name}. We've sent a calendar invitation with meeting details to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-12 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground tracking-tight">Book a Discovery Call</h1>
          <p className="text-muted-foreground mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Choose a time to discuss your business goals, automation needs, or digital growth strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step 1: Select Date & Time */}
          <Card className={`lg:col-span-5 shadow-sm transition-opacity duration-300 ${selectedSlot ? 'opacity-50 md:opacity-100' : 'opacity-100'}`}>
            <CardHeader className="bg-muted/30 border-b pb-6">
              <div className="flex items-center gap-2 text-primary font-medium mb-1">
                <CalendarIcon className="w-4 h-4" /> <span>Step 1</span>
              </div>
              <CardTitle className="text-xl font-sora">Date & Time</CardTitle>
              <CardDescription>Select an available slot below</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 border-b flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { if(d) { setDate(d); setSelectedSlot(null); } }}
                  className="rounded-md"
                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                />
              </div>
              <div className="p-6 max-h-[300px] overflow-y-auto">
                <h4 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Available times for {date ? format(date, "MMM d") : "Selected Date"}
                </h4>
                {loading ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
                ) : slots.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm p-4 bg-muted/30 rounded-md">No available slots for this date.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {slots.map((slot) => {
                      const d = new Date(slot.start_time);
                      const isSelected = selectedSlot === slot.id;
                      return (
                        <Button
                          key={slot.id}
                          variant={isSelected ? "default" : "outline"}
                          className={`w-full transition-all ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:border-primary/50'}`}
                          onClick={() => setSelectedSlot(slot.id)}
                        >
                          {format(d, "h:mm a")}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Details */}
          <Card className={`lg:col-span-7 shadow-lg border-primary/20 transition-all duration-500 ${selectedSlot ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none translate-y-2'}`}>
            <CardHeader className="bg-primary/5 border-b pb-6">
              <div className="flex items-center gap-2 text-primary font-medium mb-1">
                <Clock className="w-4 h-4" /> <span>Step 2</span>
              </div>
              <CardTitle className="text-xl font-sora">Your Details</CardTitle>
              <CardDescription>
                {selectedSlot && date 
                  ? `You selected ${format(date, "MMMM d, yyyy")} at ${format(new Date(slots.find(s => s.id === selectedSlot)?.start_time || new Date()), "h:mm a")}` 
                  : "Please select a time slot first"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name <span className="text-destructive">*</span></label>
                    <Input required name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
                    <Input required type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="bg-background" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
                    <Input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company Name <span className="text-muted-foreground font-normal">(Optional)</span></label>
                    <Input name="company" placeholder="Acme Corp" value={formData.company} onChange={handleChange} className="bg-background" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Website Link <span className="text-muted-foreground font-normal">(Optional)</span></label>
                  <Input type="url" name="website" placeholder="https://example.com" value={formData.website} onChange={handleChange} className="bg-background" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">What business do you do? <span className="text-destructive">*</span></label>
                  <Textarea required name="business" placeholder="Tell us briefly about your business and what you're looking to achieve..." value={formData.business} onChange={handleChange} className="bg-background resize-none" rows={3} />
                </div>

                <div className="pt-4 border-t">
                  <Button type="submit" size="lg" className="w-full text-base font-medium h-12" disabled={loading || !selectedSlot}>
                    {loading ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Confirming Booking...</span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By booking this call, you agree to our <a href="/terms" className="underline hover:text-foreground">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
