import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Voice Agents for Local Business — 24/7 Phone Receptionist",
  description: "H4Ai builds AI voice calling agents that answer calls, qualify leads, and book appointments 24/7 for local businesses — dental, home services, salons, and more. See how it works.",
  alternates: {
    canonical: '/services/ai-voice-agents',
  },
  openGraph: {
    title: "AI Voice Agents for Local Business — 24/7 Phone Receptionist | H4Ai",
    description: "H4Ai builds AI voice calling agents that answer calls, qualify leads, and book appointments 24/7 for local businesses. See how it works.",
    url: 'https://www.h4ai.in/services/ai-voice-agents',
  },
};

export default function AIVoiceAgentsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.h4ai.in/services/ai-voice-agents#service",
        "name": "AI Voice Agents for Local Businesses",
        "serviceType": "AI Voice Calling Agent & Virtual Receptionist",
        "description": "Autonomous AI phone agents that answer inbound calls, qualify leads, answer FAQs, and book calendar appointments 24/7 with natural conversational latency.",
        "provider": {
          "@type": "Organization",
          "name": "H4Ai",
          "url": "https://www.h4ai.in",
          "@id": "https://www.h4ai.in/#localbusiness"
        },
        "areaServed": [
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "United States" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.h4ai.in/services/ai-voice-agents#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will the AI voice agent sound robotic to customers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. We use state-of-the-art conversational voice AI models with sub-2-second response latency that include natural pauses, breathing sounds, and varied intonation. Most callers do not realize they are speaking with an AI assistant."
            }
          },
          {
            "@type": "Question",
            "name": "Can the AI voice agent handle multiple languages like Punjabi, Hindi, and English?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The voice agent can seamlessly understand and switch between languages (English, Hindi, Punjabi, Hinglish) mid-conversation based on what the caller speaks."
            }
          },
          {
            "@type": "Question",
            "name": "How much does an AI voice agent cost per month?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pricing is based on call volume, typically starting at a fraction of the cost of a part-time receptionist hire. Book a free discovery call for a custom quote tailored to your monthly minutes."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: "AI Voice Agents", href: "/services/ai-voice-agents" },
            ]}
          />
          
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            An AI Receptionist That Answers Every Call, Every Time
          </h1>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground max-w-none">
            <p className="text-xl text-foreground font-medium mb-12">
              An AI voice agent from H4Ai is an AI-powered phone assistant that answers incoming calls, understands what the caller needs, books appointments, answers common questions, and hands off to a human when needed — all in a natural-sounding voice, available 24/7, without adding headcount.
            </p>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">1. Answers Instantly</h3>
                  <p className="text-muted-foreground text-sm">No hold music. The agent answers on the first ring, greeting the customer warmly.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">2. Qualifies &amp; Answers</h3>
                  <p className="text-muted-foreground text-sm">Understands complex questions, checks FAQs, and speaks naturally in multiple languages.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">3. Books Appointments</h3>
                  <p className="text-muted-foreground text-sm">Connects directly to your calendar to find slots and schedule the customer seamlessly.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">4. Smart Handoff</h3>
                  <p className="text-muted-foreground text-sm">If a request is too complex, it gracefully forwards the call or takes a detailed message for you.</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">Who It&apos;s For</h2>
            <div className="flex flex-wrap gap-3 mb-16">
              {['Dental Clinics', 'Med Spas', 'Law Firms', 'Real Estate Agencies', 'Home Services (HVAC/Plumbing)', 'Salons & Barbershops', 'Auto Repair', 'Restaurants', 'Veterinary Clinics', 'Property Management'].map(industry => (
                <span key={industry} className="px-4 py-2 bg-card text-foreground rounded-full text-sm font-medium border border-border">
                  {industry}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">AI Voice Agent vs. Human Hiring</h2>
            <div className="overflow-x-auto mb-16">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 font-sora font-semibold text-foreground">Feature</th>
                    <th className="py-4 font-sora font-semibold text-foreground">Human Receptionist</th>
                    <th className="py-4 font-sora font-semibold text-secondary">H4Ai Voice Agent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-4 text-muted-foreground">Availability</td>
                    <td className="py-4 text-foreground">40 hours / week</td>
                    <td className="py-4 text-secondary font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> 24/7/365</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 text-muted-foreground">Concurrent Calls</td>
                    <td className="py-4 text-foreground">1 at a time (others on hold)</td>
                    <td className="py-4 text-secondary font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> Unlimited simultaneous calls</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 text-muted-foreground">Consistency</td>
                    <td className="py-4 text-foreground">Varies by day</td>
                    <td className="py-4 text-secondary font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> Perfect tone every time</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-muted-foreground">Training Time</td>
                    <td className="py-4 text-foreground">Weeks</td>
                    <td className="py-4 text-secondary font-semibold flex items-center gap-2"><Check className="w-4 h-4"/> Instant deployment</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mb-16">
              <Link href="/book-a-call" className={buttonVariants({ size: "lg", className: "uppercase font-sora rounded-lg px-8" })}>Hear It In Action</Link>
            </div>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Will the AI voice agent sound robotic to customers?</h3>
                  <p className="text-muted-foreground">No. We use state-of-the-art conversational voice AI models with sub-2-second response latency that include natural pauses, breathing sounds, and varied intonation. Most callers do not realize they are speaking with an AI assistant.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Can the AI voice agent handle multiple languages like Punjabi, Hindi, and English?</h3>
                  <p className="text-muted-foreground">Yes. The voice agent can seamlessly understand and switch between languages (English, Hindi, Punjabi, Hinglish) mid-conversation based on what the caller speaks.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">How much does an AI voice agent cost per month?</h3>
                  <p className="text-muted-foreground">Pricing is based on call volume, typically starting at a fraction of the cost of a part-time receptionist hire. Book a free discovery call for a custom quote tailored to your monthly minutes.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
