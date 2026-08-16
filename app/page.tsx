import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { SectionCard } from "@/components/marketing/section-card";
import { ProofStats } from "@/components/marketing/proof-stats";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Brain, Code, Share2, Video, Workflow, PhoneCall, CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "H4Ai — AI Development, Websites & Social Media for Growing Businesses | Mansa, Punjab",
  description: "H4Ai builds AI voice agents, agentic AI systems, premium websites, and social media growth for local businesses across Punjab, India & North America. Book a free call.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://h4ai.in/#organization",
        "name": "H4Ai",
        "url": "https://h4ai.in",
        "logo": "https://h4ai.in/logo.png",
        "sameAs": ["https://instagram.com/official.h4ai"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mansa",
          "addressRegion": "Punjab",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "contact@h4ai.in"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://h4ai.in/#website",
        "url": "https://h4ai.in",
        "name": "H4Ai",
        "publisher": {
          "@id": "https://h4ai.in/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1">
        <Hero />
        
        {/* The Problem (GEO direct-answer replacement) */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed font-inter">
              H4Ai is an AI Development & Integration based in Mansa, Punjab. We build AI voice agents, agentic AI systems, premium websites, and run social media for local businesses across Punjab, India, and North America that generate the revenues for you - so you can focus on running the business, not managing five vendors.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-sora font-semibold text-foreground">What We Do</h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">One partner for everything digital.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <Link href="/services/ai-voice-agents" className="block group">
                <SectionCard 
                  title="AI Voice Agents"
                  description="Never miss a lead. Our AI phone agents answer calls, qualify leads, and book appointments 24/7."
                  icon={<PhoneCall className="w-full h-full" />}
                  delay={0.1}
                />
              </Link>
              <Link href="/services/agentic-ai-systems" className="block group">
                <SectionCard 
                  title="Agentic AI Systems"
                  description="Custom AI systems that automate your multi-step back-office workflows from end to end."
                  icon={<Workflow className="w-full h-full" />}
                  delay={0.2}
                />
              </Link>
              <Link href="/services/website-development" className="block group">
                <SectionCard 
                  title="Website Development"
                  description="Fast, high-converting websites designed to turn local visitors into paying customers."
                  icon={<Code className="w-full h-full" />}
                  delay={0.3}
                />
              </Link>
              <Link href="/services/social-media-management" className="block group">
                <SectionCard 
                  title="Social Media Management"
                  description="We handle the content, design, and posting so your brand stays active effortlessly."
                  icon={<Share2 className="w-full h-full" />}
                  delay={0.4}
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Where We Work */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-sora font-semibold text-3xl md:text-4xl mb-8">Where We Work</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From our base in Mansa, Punjab, we work with businesses across North India, plus AI & web development clients across Canada (Saskatoon, Toronto) and the US (Boston and beyond).
            </p>
          </div>
        </section>

        {/* Why H4Ai */}
        <section className="py-24 bg-card border-t border-b border-border">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="font-sora font-semibold text-3xl md:text-4xl">Why H4Ai?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most agencies just resell white-labeled tools. <Link href="/about" className="text-foreground underline underline-offset-4">H4Ai is built by an AI engineer</Link>. We actually write the code, train the models, and design the systems with Marketing team help you to gain the more Revenue.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground text-lg">One team for AI, web, and social.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground text-lg">Engineering-grade custom solutions.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground text-lg">Clear pricing and tangible ROI.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="aspect-video bg-muted rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                 <Image src="/team.png" alt="H4Ai Team" width={800} height={450} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Proof / What Clients Say */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-sora font-semibold text-3xl md:text-4xl mb-16">What Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-card p-8 rounded-xl border shadow-sm text-left">
                 <p className="italic text-muted-foreground mb-6">"H4Ai transformed how we handle customer inquiries. The AI voice agent alone paid for itself in week one."</p>
                 <p className="font-semibold text-foreground">— Client A, Saskatoon</p>
               </div>
               <div className="bg-card p-8 rounded-xl border shadow-sm text-left">
                 <p className="italic text-muted-foreground mb-6">"Finally an agency that actually understands the tech. They built a custom system that automated our entire backend."</p>
                 <p className="font-semibold text-foreground">— Client B, Chandigarh</p>
               </div>
               <div className="bg-card p-8 rounded-xl border shadow-sm text-left">
                 <p className="italic text-muted-foreground mb-6">"Our website is blazing fast and the social media content is always spot on. Highly recommend."</p>
                 <p className="font-semibold text-foreground">— Client C, Mansa</p>
               </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 max-w-3xl mx-auto px-4">
           <h2 className="font-sora font-semibold text-3xl md:text-4xl text-center mb-12">FAQ</h2>
           <div className="space-y-6">
              <div className="border-b border-border pb-6">
                 <h3 className="font-semibold text-lg mb-2 text-foreground">What does H4Ai actually do?</h3>
                 <p className="text-muted-foreground">We build AI voice agents, agentic AI systems, modern websites, and manage social media for businesses. We act as your all-in-one digital growth and tech partner.</p>
              </div>
              <div className="border-b border-border pb-6">
                 <h3 className="font-semibold text-lg mb-2 text-foreground">Where are you based and who do you serve?</h3>
                 <p className="text-muted-foreground">We are based in Mansa, Punjab. We work closely with local businesses across Punjab and India, while also serving premium AI and web clients in North America (Canada and the US).</p>
              </div>
              <div className="border-b border-border pb-6">
                 <h3 className="font-semibold text-lg mb-2 text-foreground">How do we get started?</h3>
                 <p className="text-muted-foreground">It starts with a free discovery call. We'll look at how your business runs currently and identify the biggest opportunities for growth or automation.</p>
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-background border-t border-border text-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8 leading-tight">
              Ready to upgrade your business?
            </h2>
            <Link href="/book-a-call" className={buttonVariants({ size: "lg", className: "uppercase font-sora text-base h-14 px-10 rounded-lg shadow-sm mb-6" })}>Book a Free Call</Link>
            <p className="text-sm text-muted-foreground">
              Let's talk about where you're losing time and how we can fix it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
