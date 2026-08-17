import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Website Development & High-Converting Web Design",
  description: "H4Ai designs and builds fast, modern, mobile-first websites for local and premium businesses — from small business sites to fully custom builds. Get a free quote.",
  alternates: {
    canonical: '/services/website-development',
  },
  openGraph: {
    title: "Custom Website Development & High-Converting Web Design | H4Ai",
    description: "H4Ai designs and builds fast, modern, mobile-first websites for local and premium businesses.",
    url: 'https://www.h4ai.in/services/website-development',
  },
};

export default function WebsiteDevelopmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.h4ai.in/services/website-development#service",
        "name": "Website Development & High-Converting Web Design",
        "serviceType": "Custom Web Development & Performance Optimization",
        "description": "High-speed, SEO-optimized, mobile-responsive business websites built using modern Next.js architectures designed to maximize customer conversion.",
        "provider": {
          "@type": "Organization",
          "name": "H4Ai",
          "url": "https://www.h4ai.in",
          "@id": "https://www.h4ai.in/#localbusiness"
        },
        "areaServed": [
          { "@type": "City", "name": "Mansa" },
          { "@type": "City", "name": "Chandigarh" },
          { "@type": "City", "name": "Ludhiana" },
          { "@type": "City", "name": "Bathinda" },
          { "@type": "Country", "name": "India" },
          { "@type": "Country", "name": "Canada" },
          { "@type": "Country", "name": "United States" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.h4ai.in/services/website-development#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does it take to build a custom business website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard business websites take 2-3 weeks from kick-off to launch. Premium custom builds with bespoke web applications typically take 4-8 weeks depending on scope."
            }
          },
          {
            "@type": "Question",
            "name": "Do I own 100% of my website after launch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Once the project is completed, you own 100% of the source code, content, domain, and design assets with zero vendor lock-in."
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
              { name: "Website Development", href: "/services/website-development" },
            ]}
          />
          
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            Websites That Load Fast, Look Premium, and Actually Convert
          </h1>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground max-w-none">
            <p className="text-xl text-foreground font-medium mb-12">
              H4Ai builds custom business websites — from simple, fast small-business sites to fully bespoke premium builds with custom functionality. Every site is mobile-first, built for speed, and designed to turn visitors into inquiries, not just look good.
            </p>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">What&apos;s Included</h2>
            <ul className="mb-12 space-y-2">
              <li><strong>Mobile-First Design:</strong> Optimized for where your customers actually search.</li>
              <li><strong>Speed Optimization:</strong> Lightning-fast load times to retain visitors.</li>
              <li><strong>SEO Fundamentals:</strong> Built-in best practices to help you rank locally.</li>
              <li><strong>Conversion Focus:</strong> Clear calls to action to drive leads and bookings.</li>
            </ul>
          </div>

          <div className="my-16">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-8 text-center">Website Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-sora text-xl text-foreground">Starter / Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Perfect for local businesses needing a fast, professional, and high-converting presence.</p>
                  <Link href="/contact" className={buttonVariants({ variant: "outline", className: "w-full uppercase font-sora border-border hover:bg-background" })}>Get a Quote</Link>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-border shadow-sm border-t-4 border-t-primary">
                <CardHeader>
                  <CardTitle className="font-sora text-xl text-foreground">Premium Custom</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">Bespoke design with custom functionality, perfect for scaling brands and agencies.</p>
                  <Link href="/book-a-call" className={buttonVariants({ className: "w-full uppercase font-sora text-primary-foreground" })}>Book Discovery</Link>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">How long does it take to build a custom business website?</h3>
                  <p className="text-muted-foreground">Standard business websites take 2-3 weeks from kick-off to launch. Premium custom builds with bespoke web applications typically take 4-8 weeks depending on scope.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Do I own 100% of my website after launch?</h3>
                  <p className="text-muted-foreground">Absolutely. Once the project is completed, you own 100% of the source code, content, domain, and design assets with zero vendor lock-in.</p>
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
