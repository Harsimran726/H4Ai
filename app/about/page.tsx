import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About H4Ai — AI Engineer-Led Development Studio | Mansa, Punjab",
  description: "H4Ai is founded by Harsimran, an AI engineer building production AI systems for businesses across India and North America. Learn our story.",
};

const stats = [
  { value: "1+", label: "Years of AI Engineering" },
  { value: "5+", label: "Services Delivered" },
  { value: "2", label: "Continents Served" },
  { value: "100%", label: "Custom, No Templates" },
];

const values = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    ),
    title: "Engineering-Grade AI",
    desc: "We build actual production systems — multi-agent pipelines, RAG systems, voice AI — not off-the-shelf chatbots rebranded as custom solutions.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: "Built for Real Businesses",
    desc: "We focus on local and growing businesses — clinics, home services, agencies — that need real ROI, not complex dashboards they never use.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    title: "End-to-End Execution",
    desc: "We don't just hand over code. We build, deploy, maintain, and iterate — you focus on running your business, we handle the digital engine.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "AboutPage", "url": "https://h4ai.in/about", "name": "About H4Ai" },
      {
        "@type": "Person",
        "name": "Harsimran",
        "jobTitle": "Founder & AI Engineer",
        "worksFor": { "@type": "Organization", "name": "H4Ai" },
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
          {/* Subtle decorative background circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #4B3FA8, transparent)" }} aria-hidden />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #a9812f, transparent)" }} aria-hidden />

          <div className="container mx-auto max-w-5xl relative">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block w-8 h-px bg-primary" />
              <span className="text-xs uppercase tracking-widest text-primary font-sora font-semibold">About H4Ai</span>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-sora font-semibold text-foreground leading-tight mb-6">
                  Built by an AI Engineer, Not a Reseller
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  H4Ai was founded by Harsimran, an AI engineer based in Mansa, Punjab, with hands-on experience building production multi-agent systems, RAG pipelines, and AI backends. We bring that same engineering-grade AI capability to local and growing businesses — not templated tools, actual custom systems.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sora font-semibold text-primary hover:gap-3 transition-all text-sm uppercase tracking-widest"
                >
                  Work with us
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              {/* Founder card */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-64 h-80 rounded-2xl border border-border bg-card flex flex-col items-center justify-end p-6 overflow-hidden">
                  <div
                    className="absolute inset-0 flex items-start justify-center pt-8"
                    style={{ background: "linear-gradient(160deg, #1a2a6c10 0%, #a9812f15 100%)" }}
                  >
                    {/* Abstract initials art */}
                    <div className="w-28 h-28 rounded-full border-2 border-primary/20 flex items-center justify-center bg-background">
                      <span
                        className="font-sora font-bold text-4xl"
                        style={{
                          background: "linear-gradient(135deg, #1a2a6c 0%, #2d4a9e 45%, #a9812f 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        H
                      </span>
                    </div>
                  </div>
                  <div className="relative text-center">
                    <p className="font-sora font-semibold text-foreground text-lg">Harsimran</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Founder & AI Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">Mansa, Punjab, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-b border-border py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="font-sora font-bold text-4xl mb-1"
                    style={{
                      background: "linear-gradient(135deg, #1a2a6c 0%, #2d4a9e 45%, #a9812f 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="py-20 px-4 border-b border-border">
          <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-sora font-semibold text-3xl text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We saw too many businesses struggling to keep up with digital trends while simultaneously trying to deliver their core services. From clinics missing calls after hours, to businesses paying thousands for generic websites that didn't drive revenue.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                H4Ai was created to be the operator behind the scenes. We don't just hand you software and wish you luck; we build, deploy, and manage the systems that allow you to focus entirely on your business.
              </p>
            </div>
            <div>
              <h2 className="font-sora font-semibold text-3xl text-foreground mb-6">How We Work</h2>
              <ol className="space-y-5">
                {["Discovery Call — We listen first, then identify exactly where AI or digital can save time or generate revenue.", "Roadmap — We design a clear, scoped plan. No surprises.", "Build & Deploy — We execute end-to-end, from code to launch.", "Ongoing Support — We stay on as the operator, not a one-off vendor."].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #1a2a6c, #a9812f)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-sm">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 px-4 border-b border-border bg-card/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-primary font-sora font-semibold">What We Stand For</span>
              <h2 className="font-sora font-semibold text-4xl text-foreground mt-3">Our Principles</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="p-8 rounded-2xl border border-border bg-background hover:border-primary/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    {v.icon}
                  </div>
                  <h3 className="font-sora font-semibold text-lg text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Where We Serve ── */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-sora font-semibold text-3xl text-foreground mb-4">Where We're Based &amp; Who We Serve</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              H4Ai is based in <strong className="text-foreground">Mansa, Punjab, India</strong>. We serve local businesses across Punjab (Bathinda, Chandigarh, Ludhiana) and premium clients across North America (Saskatoon, Toronto, Boston).
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Mansa", "Bathinda", "Chandigarh", "Ludhiana", "Amritsar", "Delhi NCR", "Saskatoon", "Toronto"].map((city) => (
                <div key={city} className="px-4 py-3 rounded-lg border border-border bg-card text-sm text-center text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 border-t border-border bg-card/30">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-sora font-semibold text-4xl text-foreground mb-4">Ready to work with us?</h2>
            <p className="text-muted-foreground mb-8">Book a free discovery call — no pitch, just a conversation about what you actually need.</p>
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sora font-semibold rounded-lg px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors"
            >
              Book a Free Call
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
