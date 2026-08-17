import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for H4Ai — AI Engineering, Website Development & Digital Services.",
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: "Terms of Service | H4Ai",
    description: "Terms of Service for H4Ai.",
    url: 'https://www.h4ai.in/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ name: "Terms of Service", href: "/terms" }]} />
          
          <h1 className="text-4xl font-sora font-semibold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 17, 2026</p>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website or engaging H4Ai for AI engineering, web development, or marketing services, you agree to be bound by these Terms of Service.
            </p>

            <h2>2. Services &amp; Scope</h2>
            <p>
              H4Ai provides software development, AI voice agent integration, agentic automation, and digital marketing services. Specific project deliverables, milestone schedules, and payment terms will be formalized in an agreed Statement of Work (SOW).
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              Upon full payment for custom development services, the client owns 100% of the custom application source code, content, and branding created specifically for their business.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              H4Ai shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use delivered systems, beyond the fees paid for the specific service.
            </p>

            <h2>5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, within the jurisdiction of Punjab.
            </p>

            <h2>6. Contact Information</h2>
            <p>
              For legal inquiries or questions regarding these terms, please contact <a href="mailto:contact@h4ai.in" className="text-primary hover:underline">contact@h4ai.in</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
