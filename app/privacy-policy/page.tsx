import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | H4Ai",
  description: "Privacy Policy for H4Ai",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-sora font-semibold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <div className="prose prose-lg text-muted-foreground prose-headings:font-sora prose-headings:text-foreground">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out a contact form, book a call, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services.</li>
              <li>Communicate with you, including responding to your inquiries and sending you updates.</li>
              <li>Process transactions and send related information.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as necessary to provide our services or as required by law.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at contact@h4ai.in.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
