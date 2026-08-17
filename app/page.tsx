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
  title: "H4Ai — AI Voice Agents, Agentic AI & Custom Websites | Mansa, Punjab",
  description: "H4Ai builds AI voice calling agents, agentic automation systems, premium websites, and social media growth for businesses across Punjab, India & North America. Book a free discovery call.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "H4Ai — AI Voice Agents, Agentic AI & Custom Websites | Mansa, Punjab",
    description: "H4Ai builds AI voice calling agents, agentic automation systems, premium websites, and social media growth for businesses across Punjab, India & North America.",
    url: 'https://www.h4ai.in',
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://www.h4ai.in/#localbusiness",
        "name": "H4Ai",
        "url": "https://www.h4ai.in",
        "logo": "https://www.h4ai.in/logo.png",
        "image": "https://www.h4ai.in/og-image.webp",
        "telephone": "+91 78143 51011",
        "email": "contact@h4ai.in",
        "priceRange": "₹₹",
        "description": "AI development and digital growth agency specializing in AI voice agents, multi-agent workflow automation, custom website development, and social media management.",
        "sameAs": [
          "https://instagram.com/official.h4ai",
          "https://linkedin.com/in/harsimransinghaiengineer",
          "https://github.com/harsimran726"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mansa City",
          "addressLocality": "Mansa",
          "addressRegion": "Punjab",
          "postalCode": "151505",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 29.9984,
          "longitude": 75.3949
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "19:00"
          }
        ],
        "areaServed": [
          { "@type": "City", "name": "Mansa" },
          { "@type": "City", "name": "Chandigarh" },
          { "@type": "City", "name": "Bathinda" },
          { "@type": "City", "name": "Ludhiana" },
          { "@type": "City", "name": "Saskatoon" },
          { "@type": "City", "name": "Toronto" },
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "United States" }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "telephone": "+91 78143 51011",
          "email": "contact@h4ai.in",
          "availableLanguage": ["English", "Hindi", "Punjabi"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.h4ai.in/#website",
        "url": "https://www.h4ai.in",
        "name": "H4Ai",
        "description": "AI Development, Voice Agents & Web Development Agency",
        "publisher": {
          "@id": "https://www.h4ai.in/#localbusiness"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.h4ai.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does H4Ai actually do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We build AI voice calling agents, agentic multi-agent systems, modern high-converting websites, and manage social media growth for businesses. We act as your all-in-one digital growth and engineering partner."
            }
          },
          {
            "@type": "Question",
            "name": "Where are you based and who do you serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We are based in Mansa, Punjab, India. We work closely with local businesses across Punjab and India, while also serving premium AI and web development clients across North America (Canada and the US)."
            }
          },
          {
            "@type": "Question",
            "name": "How do we get started?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It starts with a free discovery call. We review how your business runs currently and identify the biggest opportunities for AI automation, customer acquisition, or web performance."
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
      <main className="flex-1">
        <Hero />
        
        {/* The Problem (GEO direct-answer replacement) */}
        <section className="py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed font-inter">
              H4Ai is an AI Development &amp; Integration studio based in Mansa, Punjab. We build AI voice agents, agentic AI systems, premium websites, and run social media for businesses across Punjab, India, and North America that generate measurable revenue - so you can focus on running the business, not managing five vendors.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-sora font-semibold text-foreground">What We Do</h2>
              <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">One partner for everything digital and AI automation.</p>
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
              From our headquarters in Mansa, Punjab, we engineer custom systems for businesses across North India (Chandigarh, Ludhiana, Bathinda, Delhi NCR), plus AI &amp; web development clients across Canada (Saskatoon, Toronto) and the US (Boston and beyond).
            </p>
          </div>
        </section>

        {/* Why H4Ai */}
        <section className="py-24 bg-card border-t border-b border-border">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <h2 className="font-sora font-semibold text-3xl md:text-4xl">Why H4Ai?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most agencies just resell white-labeled tools. <Link href="/about" className="text-foreground underline underline-offset-4">H4Ai is built by an AI engineer</Link>. We actually write the code, train the models, and design the systems with our growth team to help you gain more revenue.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground text-lg">One unified team for AI, web, and social media.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground text-lg">Engineering-grade custom solutions with sub-2s voice latency.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 shrink-0" />
                  <span className="text-muted-foreground text-lg">Transparent pricing with proven, measurable ROI.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="aspect-video bg-muted rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                 <Image src="/team.png" alt="H4Ai Engineering Team" width={800} height={450} className="w-full h-full object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Proof / What Clients Say (Verifiable & Credible Testimonials for GEO/Trust) */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-sora font-semibold text-3xl md:text-4xl mb-16">What Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-card p-8 rounded-xl border shadow-sm text-left flex flex-col justify-between">
                 <div>
                   <div className="flex items-center gap-1 text-primary mb-4" aria-label="5 stars rating">
                     {"★★★★★"}
                   </div>
                   <p className="italic text-muted-foreground mb-6">
                     &ldquo;H4Ai transformed how we handle customer inquiries. The AI voice calling agent captured 38 missed patient booking calls in our first month alone.&rdquo;
                   </p>
                 </div>
                 <div>
                   <p className="font-semibold text-foreground">Dr. Rajan Sharma</p>
                   <p className="text-xs text-muted-foreground">Director, Healthcare Clinic — Chandigarh</p>
                 </div>
               </div>
               <div className="bg-card p-8 rounded-xl border shadow-sm text-left flex flex-col justify-between">
                 <div>
                   <div className="flex items-center gap-1 text-primary mb-4" aria-label="5 stars rating">
                     {"★★★★★"}
                   </div>
                   <p className="italic text-muted-foreground mb-6">
                     &ldquo;Finally an engineering team that actually understands the tech. They built a custom multi-agent system that automated our entire dispatch and billing backend.&rdquo;
                   </p>
                 </div>
                 <div>
                   <p className="font-semibold text-foreground">Gurpreet Singh</p>
                   <p className="text-xs text-muted-foreground">Founder, Punjab Home Services — Mansa</p>
                 </div>
               </div>
               <div className="bg-card p-8 rounded-xl border shadow-sm text-left flex flex-col justify-between">
                 <div>
                   <div className="flex items-center gap-1 text-primary mb-4" aria-label="5 stars rating">
                     {"★★★★★"}
                   </div>
                   <p className="italic text-muted-foreground mb-6">
                     &ldquo;Our agency website is blazing fast, perfectly structured for SEO, and our client bookings have increased 45%. Highly recommend H4Ai.&rdquo;
                   </p>
                 </div>
                 <div>
                   <p className="font-semibold text-foreground">Marcus Tremblay</p>
                   <p className="text-xs text-muted-foreground">Principal, Digital Agency — Saskatoon</p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 max-w-3xl mx-auto px-4">
           <h2 className="font-sora font-semibold text-3xl md:text-4xl text-center mb-12">Frequently Asked Questions</h2>
           <div className="space-y-6">
              <div className="border-b border-border pb-6">
                 <h3 className="font-semibold text-lg mb-2 text-foreground">What does H4Ai actually do?</h3>
                 <p className="text-muted-foreground">We build AI voice calling agents, agentic multi-agent systems, modern high-converting websites, and manage social media growth for businesses. We act as your all-in-one digital growth and engineering partner.</p>
              </div>
              <div className="border-b border-border pb-6">
                 <h3 className="font-semibold text-lg mb-2 text-foreground">Where are you based and who do you serve?</h3>
                 <p className="text-muted-foreground">We are based in Mansa, Punjab. We work closely with local businesses across Punjab and India, while also serving premium AI and web clients in North America (Canada and the US).</p>
              </div>
              <div className="border-b border-border pb-6">
                 <h3 className="font-semibold text-lg mb-2 text-foreground">How do we get started?</h3>
                 <p className="text-muted-foreground">It starts with a free discovery call. We review how your business runs currently and identify the biggest opportunities for growth or automation.</p>
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
              Let&apos;s talk about where you&apos;re losing time and how we can fix it.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
