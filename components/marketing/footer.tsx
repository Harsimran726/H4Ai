import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border pt-20 pb-10 mt-24">
      {/* Main grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <span
                className="font-sora font-bold text-2xl"
                style={{
                  background: "linear-gradient(180deg, #1F4F91 0%, #0D223C 50%, #020810 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                H4Ai
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              AI development, premium websites, and social media growth — built, deployed, and managed end-to-end for ambitious businesses.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/official.h4ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="H4Ai on Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/harsimransinghaiengineer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="H4Ai on LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-sora font-semibold text-foreground mb-5 text-xs uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services/ai-voice-agents" className="hover:text-primary transition-colors">AI Voice Agents</Link></li>
              <li><Link href="/services/agentic-ai-systems" className="hover:text-primary transition-colors">Agentic AI Systems</Link></li>
              <li><Link href="/services/ai-integration-development" className="hover:text-primary transition-colors">AI Integration</Link></li>
              <li><Link href="/services/website-development" className="hover:text-primary transition-colors">Website Development</Link></li>
              <li><Link href="/services/social-media-management" className="hover:text-primary transition-colors">Social Media Management</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-sora font-semibold text-foreground mb-5 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/locations" className="hover:text-primary transition-colors">Locations</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-sora font-semibold text-foreground mb-5 text-xs uppercase tracking-widest">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4 mt-0.5 shrink-0 text-primary"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <span>contact@h4ai.in</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4 mt-0.5 shrink-0 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span>+91 78143 51011</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-4 h-4 mt-0.5 shrink-0 text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>Mansa, Punjab, India — 151505</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} H4Ai. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
