import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic AI Systems — Multi-Agent Workflow Automation",
  description: "H4Ai designs agentic AI systems — coordinated AI agents that handle multi-step business workflows automatically. Custom-built for how your business actually runs.",
  alternates: {
    canonical: '/services/agentic-ai-systems',
  },
  openGraph: {
    title: "Agentic AI Systems — Multi-Agent Workflow Automation | H4Ai",
    description: "H4Ai designs agentic AI systems — coordinated AI agents that handle multi-step business workflows automatically.",
    url: 'https://www.h4ai.in/services/agentic-ai-systems',
  },
};

export default function AgenticAIPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.h4ai.in/services/agentic-ai-systems#service",
        "name": "Agentic AI Systems & Multi-Agent Automation",
        "serviceType": "Multi-Agent Workflow Architecture",
        "description": "Custom agentic systems that orchestrate multi-step business tasks, tool calls, data verification, and process automation without manual intervention.",
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
        "@id": "https://www.h4ai.in/services/agentic-ai-systems#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an agentic AI system and how is it different from a chatbot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A chatbot waits for a prompt and returns text. An agentic system is given a goal (e.g., \"process this invoice\"), plans the steps, uses tools to execute them, and verifies its own work."
            }
          },
          {
            "@type": "Question",
            "name": "How do businesses use AI agents to automate workflows in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "They deploy them for high-volume, rules-based tasks that require cognitive flexibility—like customer support triaging, invoice reconciliation, CRM updates, and personalized lead outreach."
            }
          },
          {
            "@type": "Question",
            "name": "Is company data safe when using custom agentic AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We build using enterprise-grade providers with zero-retention policies, or run open-source models privately on your infrastructure if strict data residency is required."
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
              { name: "Agentic AI Systems", href: "/services/agentic-ai-systems" },
            ]}
          />
          
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            AI That Doesn&apos;t Just Answer — It Acts
          </h1>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground max-w-none">
            <p className="text-xl text-foreground font-medium mb-12">
              An agentic AI system is a set of AI agents that work together to complete multi-step business tasks automatically — not just answering a single question like a chatbot, but carrying out an entire workflow (e.g., reading an inquiry, checking availability, drafting a response, and updating a record) end to end. H4Ai designs and builds these systems using frameworks like LangGraph, tailored to a specific business&apos;s process.
            </p>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">Agentic AI vs. a Chatbot</h2>
            <div className="overflow-x-auto mb-16">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 font-sora font-semibold text-foreground">Capability</th>
                    <th className="py-4 font-sora font-semibold text-foreground">Standard Chatbot</th>
                    <th className="py-4 font-sora font-semibold text-secondary">Agentic AI System</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-4 text-muted-foreground">Goal</td>
                    <td className="py-4 text-foreground">Answer user queries</td>
                    <td className="py-4 text-secondary font-semibold">Complete complex business tasks</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 text-muted-foreground">Action</td>
                    <td className="py-4 text-foreground">Provides text response</td>
                    <td className="py-4 text-secondary font-semibold">Takes actions in external tools (API, DB, Email)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 text-muted-foreground">Reasoning</td>
                    <td className="py-4 text-foreground">Single-step generation</td>
                    <td className="py-4 text-secondary font-semibold">Plans, executes, reviews, and loops until done</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">Example Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Lead Qualification Engine</h3>
                  <p className="text-muted-foreground text-sm">An agent reads incoming lead emails, searches your CRM to check if they exist, scrapes their website for context, and drafts a personalized reply for you to review.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Automated Research Analyst</h3>
                  <p className="text-muted-foreground text-sm">An agent monitors competitor pricing across the web, compiles the data into a spreadsheet daily, and alerts you via Slack if significant changes occur.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-16">
              <Link href="/book-a-call" className={buttonVariants({ size: "lg", className: "uppercase font-sora rounded-lg px-8" })}>Discuss Your Workflow</Link>
            </div>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">What is an agentic AI system and how is it different from a chatbot?</h3>
                  <p className="text-muted-foreground">A chatbot waits for a prompt and returns text. An agentic system is given a goal (e.g., &ldquo;process this invoice&rdquo;), plans the steps, uses tools to execute them, and verifies its own work.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">How do businesses use AI agents to automate workflows in 2026?</h3>
                  <p className="text-muted-foreground">They deploy them for high-volume, rules-based tasks that require cognitive flexibility—like customer support triaging, invoice reconciliation, data entry, and personalized outreach.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Is my data safe?</h3>
                  <p className="text-muted-foreground">Yes. We build using enterprise-grade providers with zero-retention policies, or run open-source models privately on your infrastructure if strict data residency is required.</p>
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
