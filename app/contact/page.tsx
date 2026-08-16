import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Metadata } from "next";
import { ContactForm } from "@/components/marketing/contact-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact H4Ai — Book a Free Call | AI, Web & Social Media",
  description: "Get in touch with H4Ai. Based in Mansa, Punjab — serving businesses across India, Canada, and the US. Book a free strategy call today.",
};

const contactDetails = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    ),
    label: "Email",
    value: "contact@h4ai.in",
    href: "mailto:contact@h4ai.in",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
    ),
    label: "Phone",
    value: "+91 78143 51011",
    href: "tel:+917814351011",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
    label: "Address",
    value: "Mansa, Punjab, India — 151505",
    href: "https://maps.google.com/?q=Mansa,Punjab,India",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
    ),
    label: "Instagram",
    value: "@official.h4ai",
    href: "https://instagram.com/official.h4ai",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ContactPage", "url": "https://h4ai.in/contact", "name": "Contact H4Ai" },
      {
        "@type": "LocalBusiness",
        "name": "H4Ai",
        "image": "https://h4ai.in/logo.png",
        "@id": "https://h4ai.in/#localbusiness",
        "url": "https://h4ai.in",
        "telephone": "7814351011",
        "email": "contact@h4ai.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "",
          "addressLocality": "Mansa",
          "addressRegion": "Punjab",
          "postalCode": "151505",
          "addressCountry": "IN",
        },
        "sameAs": ["https://instagram.com/official.h4ai"],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1 bg-background">

        {/* ── Hero ── */}
        <section className="relative border-b border-border bg-card/40 pt-28 pb-20 px-4 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #4B3FA8, transparent)" }} aria-hidden />
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-8 h-px bg-primary" />
              <span className="text-xs uppercase tracking-widest text-primary font-sora font-semibold">Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-sora font-semibold text-foreground leading-tight mb-6 max-w-2xl">
              Let's Talk About Your Business
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Have a question? Prefer a direct conversation? Send us a message and we'll get back to you within 24 hours. Or just book a call directly.
            </p>
          </div>
        </section>

        {/* ── Main content ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Left — Form */}
              <div>
                <h2 className="font-sora font-semibold text-xl text-foreground mb-6">Send a Message</h2>
                <ContactForm />
              </div>

              {/* Right — Info */}
              <div className="space-y-8">
                {/* Contact cards */}
                <div>
                  <h2 className="font-sora font-semibold text-xl text-foreground mb-6">Contact Information</h2>
                  <div className="space-y-3">
                    {contactDetails.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">{item.label}</p>
                          <p className="text-sm font-medium text-foreground">{item.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Response time badge */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Typically responds within 4–6 hours</strong> on business days.
                  </p>
                </div>

                {/* Prefer a call CTA */}
                <div className="p-6 rounded-2xl border border-border bg-card/60">
                  <h3 className="font-sora font-semibold text-foreground mb-2">Prefer to talk directly?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Book a free 20-minute discovery call. No pitch, just a conversation about what you need.</p>
                  <Link
                    href="/book-a-call"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-sora font-semibold rounded-lg px-6 py-3 text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors"
                  >
                    Book a Call
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
