"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, LeadInput } from "@/lib/validation/leads";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-6 md:p-8">
        {success ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-sora font-semibold text-foreground mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
            <Button className="mt-6" onClick={() => setSuccess(false)}>Send Another Message</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field - visually hidden */}
            <div className="hidden" aria-hidden="true">
              <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                <Input id="name" placeholder="John Doe" className="bg-background border-border" {...register("name")} />
                {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-background border-border" {...register("email")} />
                {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone (Optional)</label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-background border-border" {...register("phone")} />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium text-foreground">Service Interest</label>
              <select id="service" className="w-full h-10 rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" {...register("service")}>
                <option value="">Select a service</option>
                <option value="voice">AI Voice Agents</option>
                <option value="agentic">Agentic AI Systems</option>
                <option value="web">Website Development</option>
                <option value="social">Social Media Management</option>
                <option value="other">Other</option>
              </select>
              {errors.service && <p className="text-destructive text-xs">{errors.service.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
              <Textarea id="message" placeholder="How can we help?" className="min-h-[120px] bg-background border-border" {...register("message")} />
              {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
            </div>

            {error && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" disabled={isSubmitting} className="w-full font-sora uppercase rounded-lg text-primary-foreground">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              By submitting this form, you agree to our <a href="/terms" className="underline hover:text-foreground">Terms of Service</a> and <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
