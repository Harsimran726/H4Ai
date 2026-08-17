import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for H4Ai — AI Development, Web & Digital Marketing Services.",
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: "Privacy Policy | H4Ai",
    description: "Privacy Policy for H4Ai.",
    url: 'https://www.h4ai.in/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
          
          <h1 className="text-4xl font-sora font-semibold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: August 17, 2026</p>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out a contact form, book a strategy call, or communicate with us. This may include your name, email address, phone number, and company details.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information solely to:
            </p>
            <ul>
              <li>Provide, maintain, and deliver our AI and web development services.</li>
              <li>Communicate directly regarding your inquiries, consultations, and technical support.</li>
              <li>Process client agreements and send relevant onboarding details.</li>
            </ul>

            <h2>3. Information Sharing &amp; Privacy</h2>
            <p>
              We do not sell or rent your personal information to third parties. We only share information with infrastructure providers strictly necessary to deliver services (e.g. email delivery, secure hosting) or as required by law.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard encryption and security protocols to safeguard your business information and communication data.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us at <a href="mailto:contact@h4ai.in" className="text-primary hover:underline">contact@h4ai.in</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
