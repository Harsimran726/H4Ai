import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development Company | Custom Business Websites | H4Ai",
  description: "H4Ai designs and builds fast, modern, mobile-first websites for local and premium businesses — from small business sites to fully custom builds. Get a free quote.",
};

export default function WebsiteDevelopmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Website Development",
        "provider": {
          "@type": "Organization",
          "name": "H4Ai",
          "url": "https://h4ai.in"
        },
        "areaServed": [
          { "@type": "City", "name": "Mansa" },
          { "@type": "City", "name": "Chandigarh" },
          { "@type": "City", "name": "Ludhiana" },
          { "@type": "City", "name": "Bathinda" },
          { "@type": "City", "name": "New Delhi" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does it take to build?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard business sites take 2-3 weeks. Premium custom builds typically take 4-8 weeks depending on complexity."
            }
          },
          {
            "@type": "Question",
            "name": "Do I own my website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Once the final payment is made, you own 100% of the codebase, content, and design."
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
            Websites That Load Fast, Look Premium, and Actually Convert
          </h1>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground">
            <p className="text-xl text-foreground font-medium mb-12">
              H4Ai builds custom business websites — from simple, fast small-business sites to fully bespoke premium builds with custom functionality. Every site is mobile-first, built for speed, and designed to turn visitors into inquiries, not just look good.
            </p>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">What's Included</h2>
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
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">How long does it take to build?</h3>
                  <p className="text-muted-foreground">Standard business sites take 2-3 weeks. Premium custom builds typically take 4-8 weeks depending on complexity.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Do I own my website?</h3>
                  <p className="text-muted-foreground">Absolutely. Once the final payment is made, you own 100% of the codebase, content, and design.</p>
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
