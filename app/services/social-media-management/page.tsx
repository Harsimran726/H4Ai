import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management & Growth for Local Businesses",
  description: "H4Ai handles content, posting, and growth for your Instagram and Facebook — so your business stays visible without you touching a phone. Serving Mansa, Punjab & beyond.",
  alternates: {
    canonical: '/services/social-media-management',
  },
  openGraph: {
    title: "Social Media Management & Growth for Local Businesses | H4Ai",
    description: "H4Ai handles content, posting, and growth for your Instagram and Facebook so your business stays visible.",
    url: 'https://www.h4ai.in/services/social-media-management',
  },
};

export default function SocialMediaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.h4ai.in/services/social-media-management#service",
        "name": "Social Media Management & Growth",
        "serviceType": "Social Media Marketing & Brand Authority Building",
        "description": "End-to-end social media management, content creation, high-converting reels editing, and audience growth across Instagram and Facebook.",
        "provider": {
          "@type": "Organization",
          "name": "H4Ai",
          "url": "https://www.h4ai.in",
          "@id": "https://www.h4ai.in/#localbusiness"
        },
        "offers": {
          "@type": "Offer",
          "price": "15000",
          "priceCurrency": "INR",
          "description": "Monthly Growth Package starting at ₹15,000/mo"
        },
        "areaServed": [
          { "@type": "City", "name": "Mansa" },
          { "@type": "City", "name": "Chandigarh" },
          { "@type": "City", "name": "Ludhiana" },
          { "@type": "City", "name": "Bathinda" },
          { "@type": "Country", "name": "India" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.h4ai.in/services/social-media-management#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does social media management cost per month?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our base Growth Package starts at ₹15,000/month, which covers regular high-quality posting, custom graphic design, reels editing, and growth strategy. Custom packages are available based on your volume needs."
            }
          },
          {
            "@type": "Question",
            "name": "Who writes and designs the content?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our dedicated in-house creative team handles all copywriting and design. You approve the direction and monthly calendar, and we execute it entirely."
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
              { name: "Social Media Management", href: "/services/social-media-management" },
            ]}
          />
          
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            Social Media Management That Actually Brings In Customers
          </h1>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground max-w-none">
            <p className="text-xl text-foreground font-medium mb-12">
              H4Ai&apos;s social media management service handles content creation, posting, and audience growth on Instagram and Facebook for local businesses. We plan, design, write, and post consistently — so your page looks active and professional without you spending a single hour on it.
            </p>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">What&apos;s Included</h2>
            <ul className="mb-12 space-y-2">
              <li><strong>Content Calendar &amp; Strategy:</strong> A clear plan aligned with your business goals.</li>
              <li><strong>Graphic Design &amp; Reels Editing:</strong> High-quality, on-brand visual assets.</li>
              <li><strong>Consistent Posting Schedule:</strong> Regular updates to keep your audience engaged.</li>
              <li><strong>Monthly Reporting:</strong> Transparent metrics on growth and engagement.</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold text-foreground mt-12 mb-6">Who This Is For</h2>
            <p className="mb-12">
              Perfect for local shops, clinics, restaurants, real estate agents, and coaching businesses looking to build trust and authority in their market without the daily hassle of content creation.
            </p>
          </div>

          <div className="my-16">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-8 text-center">Pricing</h2>
            <Card className="bg-card border-border shadow-sm max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="font-sora text-2xl text-foreground">Growth Package</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-sora font-bold text-secondary mb-4">Starting at ₹15,000<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                <p className="text-muted-foreground mb-8">Everything you need to maintain a professional, growing presence.</p>
                <Link href="/book-a-call" className={buttonVariants({ className: "w-full uppercase font-sora rounded-lg text-primary-foreground" })}>Book a Call</Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">How much does social media management cost per month?</h3>
                  <p className="text-muted-foreground">Our base Growth Package starts at ₹15,000/month, which covers regular high-quality posting, custom graphic design, reels editing, and growth strategy. Custom packages are available based on your volume needs.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-none shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-2">Who writes and designs the content?</h3>
                  <p className="text-muted-foreground">Our dedicated in-house creative team handles all copywriting and design. You approve the direction and monthly calendar, and we execute it entirely.</p>
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
