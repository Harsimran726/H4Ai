import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | H4Ai",
  description: "Terms of Service for H4Ai",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-sora font-semibold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>

            <h2>2. Services</h2>
            <p>
              H4Ai provides software development, AI integration, and digital marketing services. The specific scope, deliverables, and timelines will be agreed upon in a separate Statement of Work (SOW) or contract.
            </p>

            <h2>3. Intellectual Property</h2>
            <p>
              Unless otherwise stated in a specific contract, H4Ai retains all intellectual property rights to the underlying code, tools, and systems we develop. Upon full payment, clients are granted a license to use the delivered product for its intended business purpose.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              H4Ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or any related products.
            </p>

            <h2>5. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, specifically within the jurisdiction of Punjab.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at contact@h4ai.in.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
