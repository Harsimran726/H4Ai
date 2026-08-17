import { getAllLocationsData } from "@/lib/content";
import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations We Serve — Punjab, India & North America",
  description: "H4Ai provides AI voice agents, web development, and digital marketing to businesses across Punjab (Mansa, Chandigarh, Bathinda, Ludhiana) and North America (Saskatoon, Toronto).",
  alternates: {
    canonical: '/locations',
  },
  openGraph: {
    title: "Locations We Serve — Punjab, India & North America | H4Ai",
    description: "H4Ai provides AI voice agents, web development, and digital marketing across India and North America.",
    url: 'https://www.h4ai.in/locations',
  },
};

export default async function LocationsIndex() {
  const locations = await getAllLocationsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Locations Served by H4Ai",
    "description": "Directory of geographic markets served by H4Ai for AI engineering, website development, and social media management.",
    "url": "https://www.h4ai.in/locations",
    "hasPart": locations.map((loc) => ({
      "@type": "WebPage",
      "name": loc.title,
      "url": `https://www.h4ai.in/locations/${loc.id}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs items={[{ name: "Locations", href: "/locations" }]} />
          
          <h1 className="text-4xl md:text-5xl font-sora font-semibold text-foreground mb-8">
            Locations We Serve
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Based in Mansa, Punjab, H4Ai partners with local businesses across India and delivers premium AI automation and web solutions to clients across North America.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link key={loc.id} href={`/locations/${loc.id}`} className="block group">
                <Card className="hover:border-primary transition-colors h-full">
                  <CardContent className="p-6">
                    <h2 className="font-sora font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {loc.city}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {loc.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
