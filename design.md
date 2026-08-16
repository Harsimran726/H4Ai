# H4Ai Website — Design System

**Source:** consolidated from the provided `H4Ai_Website_Theme_Design.md` and `Logo.jpeg`
**Theme:** Light, single scrolling page, CTA-first, premium/restrained
**Companion to:** `prd.md`, `Architecture.md`

Core message the entire site is built around:

> **"Run your business. We handle the rest."**

This line does the psychological work for the brand — it removes the burden of understanding AI from the client and reframes H4Ai as the operator, not a vendor. Every section reinforces the same promise: **you focus on your business, we quietly handle the technical/creative complexity.**

---

## 1. Logo

The primary logomark (`Logo.jpeg`, supplied) is the wordmark **"H4Ai"** in a deep indigo/navy gradient, with a single Antique Gold dot accenting the "i," set on a white circular badge.

**Usage rules:**
- Use the logo on white or Ivory White (`#F6F4EE`) backgrounds only — do not place it on the Warm Grey section background without a white/ivory container behind it, or on Deep Indigo (contrast fails).
- Maintain clear space around the mark equal to the height of the "H" on all sides.
- Do not recolor, stretch, drop-shadow, or outline-glow the logo. Do not recreate the gold dot in any other color.
- Export a transparent-background PNG/SVG version from the source file for use in the header/footer and for the `og:image` fallback; the circular white-badge version is for favicons/social avatars.
- Minimum digital size: 24px height (favicon/nav) up to full-size in the footer; never smaller than 20px tall where the wordmark must remain legible.

## 2. Color Theme — Light (Primary)

| Role | Color | Hex | Usage |
|---|---|---|---|
| Background — base | Ivory White | `#F6F4EE` | Page background |
| Background — section alt | Warm Grey | `#E7E3D8` | Alternating section backgrounds, cards, dividers |
| Primary accent | Deep Indigo | `#4B3FA8` | Buttons, links, section headers, active states |
| Secondary accent (sparing) | Antique Gold | `#A9812F` | Proof/results numbers, badges, "premium client" cues only |
| Text — primary | Charcoal | `#161821` | Headlines, body copy |
| Text — muted | Warm Grey-brown | `#8A8A80` | Captions, footer, secondary info |
| Border / divider | Light hairline | `#E7E3D8` at 50% opacity | Card borders, section separators |

**Rule:** Gold appears only next to numbers/results (e.g., "3x faster turnaround," "24/7 automation") — never as a decorative fill. If more than ~10% of any section uses gold, it stops feeling premium and starts feeling decorative. This keeps it feeling earned, not decorative.

### Tailwind token mapping (for implementation)

```js
// tailwind.config.ts — theme.extend.colors
colors: {
  ivory: '#F6F4EE',
  'warm-grey': '#E7E3D8',
  indigo: {
    DEFAULT: '#4B3FA8',
  },
  gold: {
    DEFAULT: '#A9812F',
  },
  charcoal: '#161821',
  'muted-grey': '#8A8A80',
  border: 'rgba(231, 227, 216, 0.5)', // #E7E3D8 @ 50%
}
```

## 3. Typography

| Use | Font | Weight | Notes |
|---|---|---|---|
| Hero headline | Sora | 600 (Semibold) | Large, tight line-height, charcoal + one indigo word |
| Section headers | Sora | 600 | Slightly smaller than hero, consistent across site |
| Accent word / tagline flourish | Playfair Display | 500 Italic | Use on ONE word max per section — e.g., the word "handle" in the hero line |
| Body copy | Inter | 400 | 16–18px, 1.6 line-height, charcoal on ivory |
| Buttons / CTAs | Sora | 500 | Uppercase or sentence case, never all-lowercase (reads unfinished) |
| Numbers / stats | Sora | 700 (Bold) | In Gold accent, large size — these are the proof points |

Load via `next/font` (Google Fonts) for Sora, Playfair Display, and Inter — self-hosted through Next.js font optimization to avoid layout shift and protect the LCP/CLS targets in `prd.md` §7.

## 4. Page Structure (Single Scrolling Home Page)

### Section 1 — Hero
- **Headline:** "Run your business. We *handle* the rest." *(italic Playfair on "handle")*
- **Subhead (Inter, muted grey):** AI consultancy, infrastructure, and creative systems for ambitious businesses — built, deployed, and managed end-to-end.
- **Primary CTA button:** "Book a Call" (indigo fill, white text) — the only action available in the hero, no secondary button competing for attention.
- **Visual:** abstract soft-glow graphic (indigo gradient blob or subtle node/line pattern), animated with a slow scroll-linked parallax (Framer Motion) — no stock photography, no literal robot imagery.

### Section 2 — The Problem (psychological hook)
Short section, 2–3 lines max. Names the exact anxiety the buyer feels without saying "AI" yet:

> "Every week you don't modernize is a week a competitor gets ahead. But hiring a full AI team, or learning it yourself, isn't realistic when you're already running a business."

This section has **no CTA** — its only job is to create tension that Section 3 resolves.

### Section 3 — What You Get (outcomes, not a services list)
Frame every service as an **outcome**, not a deliverable — the single most important copy shift for a premium-feeling site. Clients don't buy "Web Development," they buy "a site that converts visitors while you sleep."

| Instead of listing... | Say... |
|---|---|
| AI Development & Integration | "Custom AI systems that run your operations — quietly, in the background" |
| AI Consultancy | "A clear roadmap for where AI actually saves you time and money — no guesswork" |
| Web Development | "A website that sells for you, 24/7, without you touching it" |
| Social Media Management | "Content and presence that builds trust while you focus on delivery" |
| AI Film Making | "Premium video content, produced faster and cheaper than a traditional studio" |

Present as 4–5 cards, Warm Grey background (`#E7E3D8`), indigo icon/number, charcoal heading, muted-grey supporting line. One outcome sentence + one supporting sentence per card — no feature bullet lists.

### Section 4 — Proof / Why H4Ai
- 3–4 stat callouts in large Gold-bold numbers (e.g., turnaround time, automation hours saved, client retention) — use placeholder framing like "Built for measurable results" until real client numbers exist.
- One short trust line: "Based in Mansa. Built for premium clients — local access, enterprise-grade delivery."

### Section 5 — How It Works (removes friction/fear)
3-step visual (not a long process doc):
1. **Book a call** — 20 minutes, no obligation
2. **We build the roadmap** — you approve before anything starts
3. **We handle execution** — you check in, we deliver

This directly earns the "we handle the rest" promise — it shows the client they stay in control without doing the work.

### Section 6 — Final CTA (Book a Call)
- Repeat the hero line as a closing statement: "You run the business. We'll handle the rest."
- Single button: **"Book a Call"** — the only conversion action on the entire site. Do not add a contact form as a competing option here; it dilutes the CTA, and Calendly-style booking converts better for premium consultancy positioning (see the first-party booking system in `Architecture.md`).
- Below the button, a small trust line: "No sales pitch. Just a conversation about where AI can save you time."

### Footer
- Logo mark (small, left)
- h4ai.in · contact@h4ai.in · 7814351011 · Mansa, Punjab
- Social icons (Instagram — @official.h4ai)
- Muted grey text on ivory, minimal, no clutter

## 5. Interior Pages (Services, Locations, About, Contact, Blog)

Interior pages inherit the same color/type system but shift to a more conventional long-form layout (hero + H2 sections + FAQ) since they carry the SEO/AEO/GEO content depth described in `seo_aeo_geo.md`. Rules that carry over from the home page:

- One primary CTA type per page ("Book a Call") — never mixed with a competing CTA in the same viewport.
- FAQ blocks use the same card treatment as Section 3 (Warm Grey background, no heavy borders).
- Proof/comparison tables (e.g., AI Voice Agent vs. hiring, Agentic AI vs. chatbot) use Gold only for the standout numeric column, per the "gold = earned, not decorative" rule.
- Location pages (`/locations/[city]`) reuse the Hero + Direct-answer-opener pattern but stay visually lighter — one hero, no repeated parallax blob per city page, to keep load times low across the programmatic page set.

## 6. Component Styling Notes

- **Buttons:** `rounded-lg` (not fully pill-shaped — pill reads more startup/casual, `rounded-lg` reads more enterprise). Indigo fill with white text for primary; indigo outline for secondary (only where genuinely needed, e.g., "Learn more" on a card, never competing with "Book a Call").
- **Cards:** Warm Grey background, 12–16px radius, no heavy drop shadows — a very soft, barely-visible shadow only. Hard shadows break the premium/minimal feel.
- **Section spacing:** generous vertical padding (80–120px between sections) — premium sites breathe; cramped spacing reads cheap regardless of color choices.
- **Icons:** thin-line/geometric (not filled/rounded cartoon icons) — matches the Sora/indigo precision aesthetic. Recommended set: Lucide (pairs cleanly with shadcn/ui).
- **Motion (Framer Motion):**
  - Subtle fade-up on scroll for section content as it enters viewport.
  - Slow scroll-linked parallax on the hero background graphic only — not applied to text or cards.
  - No bouncy/playful easing — use gentle ease-out curves; restraint signals premium.
  - Respect `prefers-reduced-motion`: disable parallax translation and reduce fade-up to a simple opacity fade when the user has this OS setting enabled.
- **Forms (booking, contact, auth):** shadcn/ui `Form`, `Input`, `Select`, `Calendar`, and `Dialog` primitives themed to this palette — indigo focus rings, charcoal labels, muted-grey helper text, error states in a desaturated red that still fits the palette (e.g., `#B3453A`) rather than a stock bright red.

## 7. What NOT to Do

- No stock photos of generic "business people shaking hands" or "AI robot" clipart.
- No more than one CTA type per section (don't offer "Book a Call" and "Contact Us" side by side).
- No feature-dump bullet lists — every line should read as an outcome for the client, not a technical capability.
- Don't overuse Gold — cap it strictly to numbers/results/badges.
- No dark mode at launch (see `prd.md` §8 — flagged as a future enhancement, not a v1 requirement) — don't half-implement it.
- No animation on the 404/error pages beyond a simple fade-in — these are recovery moments, not showcase moments.
