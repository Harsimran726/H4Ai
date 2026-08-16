import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration & Development Services for Business | H4Ai",
  description: "H4Ai integrates AI into how your business already runs — automating repetitive work, connecting your tools, and building custom AI systems. Book a free consultation.",
};

export default function AIIntegrationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "AI Integration & Development",
        "provider": {
          "@type": "Organization",
          "name": "H4Ai",
          "url": "https://h4ai.in"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can AI integration work with the tools I already use (WhatsApp, Google Sheets, CRM)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we integrate custom AI solutions directly into the platforms you already use every day. We ensure the AI bridges the gap between your existing tools without forcing you to change your workflow."
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
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            Put AI to Work in Your Business — Without the Complexity
          </h1>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground">
            <p className="text-xl text-foreground font-medium mb-12">
              H4Ai integrates AI directly into a business's existing workflow — automating repetitive tasks, connecting tools like WhatsApp and Google Sheets, and building custom AI systems (including RAG pipelines and multi-agent automation) tailored to how the business actually operates, not a generic off-the-shelf tool.
            </p>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">What We Build</h2>
            <ul className="mb-12 space-y-2">
              <li><strong>Workflow Automation:</strong> Connect disparate systems to save hours of manual data entry.</li>
              <li><strong>Custom RAG Pipelines:</strong> Chat with your own documents and private company data securely.</li>
              <li><strong>Tool Integrations:</strong> WhatsApp, CRM, Sheets, and email automation powered by AI.</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">How It Works</h2>
            <div className="space-y-6 mb-12">
              <div>
                <h3 className="font-sora font-medium text-foreground">1. Discovery</h3>
                <p>We audit your current operations and identify high-ROI automation targets.</p>
              </div>
              <div>
                <h3 className="font-sora font-medium text-foreground">2. Build</h3>
                <p>We develop the custom integration or pipeline securely in the background.</p>
              </div>
              <div>
                <h3 className="font-sora font-medium text-foreground">3. Launch & Support</h3>
                <p>We deploy the system and manage it, so you never have to touch code.</p>
              </div>
            </div>
            
            <div className="text-center mt-12 mb-16">
              <Link href="/book-a-call" className={buttonVariants({ size: "lg", className: "uppercase font-sora rounded-lg px-8" })}>Book a Consultation</Link>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Can AI integration work with the tools I already use (WhatsApp, Google Sheets, CRM)?</h3>
                  <p className="text-muted-foreground">Yes, we integrate custom AI solutions directly into the platforms you already use every day. We ensure the AI bridges the gap between your existing tools without forcing you to change your workflow.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 border-t border-border pt-16">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-8 text-center">Explore Our Flagship AI Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/services/ai-voice-agents" className="block">
                <Card className="bg-card border-border shadow-sm hover:border-primary transition-colors h-full">
                  <CardContent className="p-8">
                    <h3 className="font-sora font-semibold text-xl text-foreground mb-3">AI Voice Agents</h3>
                    <p className="text-muted-foreground">Automated phone answering and appointment booking for local businesses.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/services/agentic-ai-systems" className="block">
                <Card className="bg-card border-border shadow-sm hover:border-primary transition-colors h-full">
                  <CardContent className="p-8">
                    <h3 className="font-sora font-semibold text-xl text-foreground mb-3">Agentic AI Systems</h3>
                    <p className="text-muted-foreground">Networks of AI agents that execute complex, multi-step workflows autonomously.</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
