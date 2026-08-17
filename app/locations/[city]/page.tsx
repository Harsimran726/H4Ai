import { getLocationData, getAllLocationIds } from "@/lib/content";
import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const locationData = await getLocationData(resolvedParams.city);
  if (!locationData) {
    return {
      title: "Location Not Found",
    };
  }
  return {
    title: locationData.title,
    description: locationData.description,
    alternates: {
      canonical: `/locations/${resolvedParams.city}`,
    },
    openGraph: {
      title: `${locationData.title} | H4Ai`,
      description: locationData.description,
      url: `https://www.h4ai.in/locations/${resolvedParams.city}`,
    },
  };
}

export async function generateStaticParams() {
  const ids = await getAllLocationIds();
  return ids.map((id) => ({
    city: id,
  }));
}

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const locationData = await getLocationData(resolvedParams.city);
  
  if (!locationData) {
    notFound();
  }

  const isAnchor = locationData.isAnchor === true;
  
  // LocalBusiness schema for Mansa (anchor), Service schema for other cities
  const jsonLd = isAnchor 
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfessionalService",
            "name": "H4Ai",
            "image": "https://www.h4ai.in/logo.png",
            "@id": "https://www.h4ai.in/#localbusiness",
            "url": "https://www.h4ai.in",
            "telephone": "+91 78143 51011",
            "email": "contact@h4ai.in",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Mansa City",
              "addressLocality": "Mansa",
              "addressRegion": "Punjab",
              "postalCode": "151505",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://instagram.com/official.h4ai",
              "https://linkedin.com/in/harsimransinghaiengineer"
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take to build a business website in Mansa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Standard business sites take 2-3 weeks. Premium custom builds typically take 4-8 weeks depending on complexity."
                }
              },
              {
                "@type": "Question",
                "name": "What is an AI voice agent and how is it different from a chatbot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An AI voice agent handles real phone calls with natural conversational abilities (including pauses and breathing). It is completely different from a text-based chatbot, as it can book appointments and speak to customers on the phone in real time."
                }
              }
            ]
          }
        ]
      }
    : {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "name": locationData.service,
            "provider": {
              "@type": "Organization",
              "name": "H4Ai",
              "url": "https://www.h4ai.in",
              "@id": "https://www.h4ai.in/#localbusiness"
            },
            "areaServed": [
              { "@type": "City", "name": locationData.city }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `How long does it take to deploy AI and web services in ${locationData.city}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Standard business sites and AI voice agents take 2-3 weeks. Full custom workflow integrations take 4-8 weeks."
                }
              },
              {
                "@type": "Question",
                "name": "What is an AI voice agent and how does it help local businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An AI voice agent answers inbound phone calls 24/7, qualifies potential leads, answers FAQs, and books appointments straight into your calendar with zero delay."
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
              { name: "Locations", href: "/locations" },
              { name: locationData.city, href: `/locations/${resolvedParams.city}` },
            ]}
          />
          
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            {locationData.title}
          </h1>
          
          <article 
            className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 max-w-none"
            dangerouslySetInnerHTML={{ __html: locationData.contentHtml || "" }}
          />

          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-sora font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-sora font-semibold text-lg text-foreground mb-2">How long does it take to build a business website?</h3>
                <p className="text-muted-foreground">Standard business sites take 2-3 weeks. Premium custom builds typically take 4-8 weeks depending on complexity.</p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-sora font-semibold text-lg text-foreground mb-2">What is an AI voice agent and is it different from a chatbot?</h3>
                <p className="text-muted-foreground">An AI voice agent handles real phone calls with natural conversational abilities (including pauses and breathing). It is completely different from a text-based chatbot, as it can book appointments and speak to customers on the phone in real time.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 pt-12">
            <Link href="/book-a-call" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2 uppercase font-sora">
              Book a Call
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
