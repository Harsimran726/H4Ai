import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { SectionCard } from "@/components/marketing/section-card";
import { Brain, Code, Share2, Workflow } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — AI, Web Development & Social Media | H4Ai",
  description: "Explore H4Ai's services: AI voice agents, agentic AI systems, AI integration, custom website development, and social media management for businesses in India and North America.",
};

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://h4ai.in/services/ai-voice-agents"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "url": "https://h4ai.in/services/agentic-ai-systems"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "url": "https://h4ai.in/services/ai-integration-development"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "url": "https://h4ai.in/services/website-development"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "url": "https://h4ai.in/services/social-media-management"
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-6">
              Services Built to Run Your Business, Not Add to Your To-Do List
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              H4Ai is an AI development and digital growth studio. We build custom AI systems, 
              premium websites, and run social media for local businesses across Punjab, India, 
              and North America — so you can focus on running the business, not managing five vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/services/ai-voice-agents" className="block group">
              <SectionCard 
                title="AI Voice Agents"
                description="An AI-powered phone assistant that answers incoming calls, understands what the caller needs, and books appointments."
                icon={<Brain className="w-full h-full" />}
                delay={0.1}
              />
            </Link>
            
            <Link href="/services/agentic-ai-systems" className="block group">
              <SectionCard 
                title="Agentic AI Systems"
                description="Networks of task-specific AI agents that automate multi-step business workflows end to end, not just single responses."
                icon={<Workflow className="w-full h-full" />}
                delay={0.2}
              />
            </Link>

            <Link href="/services/ai-integration-development" className="block group">
              <SectionCard 
                title="AI Integration & Development"
                description="We integrate AI directly into your business's existing workflow, automating repetitive tasks and connecting your tools."
                icon={<Workflow className="w-full h-full" />}
                delay={0.3}
              />
            </Link>

            <Link href="/services/website-development" className="block group">
              <SectionCard 
                title="Website Development"
                description="Custom business websites — from fast small-business sites to fully bespoke premium builds. Mobile-first and built to convert."
                icon={<Code className="w-full h-full" />}
                delay={0.4}
              />
            </Link>

            <Link href="/services/social-media-management" className="block group">
              <SectionCard 
                title="Social Media Management"
                description="Content creation, posting, and audience growth on Instagram and Facebook. We handle the content so your page looks active and professional."
                icon={<Share2 className="w-full h-full" />}
                delay={0.5}
              />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
