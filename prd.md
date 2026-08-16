# H4Ai Website — Product Requirements Document (PRD)

**Product:** h4ai.in — marketing website + booking + lead system
**Owner:** Harsimran / H4Ai
**Status:** Draft v1.0
**Related docs:** `Architecture.md`, `design.md`, `seo_aeo_geo.md`, `phases.md`

---

## 1. Overview

H4Ai is an AI development and digital growth studio based in Mansa, Punjab. The website is the primary sales asset for the business — its job is to convert visitors (local Indian SMBs + premium North American clients) into **booked calls**, using the core positioning line:

> **"Run your business. We handle the rest."**

The site must feel premium, fast, and calm (elegant, clean, generous whitespace, subtle parallax/motion) — not like a templated agency site — while being fully functional as a lead-generation and booking engine, not just a brochure.

## 2. Goals

| Goal | Why it matters |
|---|---|
| Convert visitors into booked discovery calls | This is the single conversion action on the site (per `design.md`) |
| Feel premium and trustworthy at first glance | Justifies premium pricing tier, differentiates from templated competitor sites |
| Rank organically (SEO), get quoted by AI assistants (AEO/GEO), and rank locally (GBP-linked) | Primary and only planned acquisition channel at launch — see `seo_aeo_geo.md` |
| Let Harsimran manage bookings/leads without a third-party SaaS dependency | Full ownership, no recurring Calendly-style fee, no vendor lock-in |
| Be maintainable and extensible in isolated phases | See `phases.md` — features are built and shipped independently to avoid regressions |

## 3. Target Users

1. **Visitor / Prospect (India cluster)** — local business owner (clinic, salon, shop, real estate, manufacturing) researching AI voice agents, websites, or social media management. Price-sensitive, needs plain-English reassurance.
2. **Visitor / Prospect (Premium/NA cluster)** — dental/legal/med-spa/home-services business owner in Canada/US, higher intent, researching AI voice agents or agentic AI systems, expects a polished, professional site.
3. **Admin (Harsimran / future team member)** — logs into a protected dashboard to view/manage bookings, contact-form leads, and (later) blog content.

There is **no public client-facing account/portal** in v1 — authentication exists solely to protect the admin dashboard. (See §5.3 and Assumptions.)

## 4. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js** (App Router) | SSR/SSG for SEO, route handlers for API, image optimization |
| Language | **TypeScript** | End-to-end type safety, especially for booking/auth data models |
| Styling | **Tailwind CSS** | Utility-first, matches design tokens in `design.md` |
| UI components | **shadcn/ui** | Accessible headless primitives (forms, dialogs, calendar, toast) themed to the H4Ai palette |
| Animation | **Framer Motion** | Scroll-linked parallax, fade-up-on-scroll, page transitions — used with restraint per `design.md` §"What NOT to Do" |
| Database | **PostgreSQL** (via **Prisma ORM**) | Bookings, leads, tokens, admin users, blog metadata |
| Auth | Custom session-based auth (see §5.3) | No third-party OAuth per requirement — email + password only |
| Email | **Resend** (primary) with SMTP/Nodemailer fallback | Transactional email: verification, password reset, booking confirmation, reminders, cancellation |
| Scheduled jobs | Cron (Vercel Cron / node-cron worker) | Sends 24h and 1h booking reminders |
| Content (blog/city pages) | MDX or headless CMS (Sanity/Contentful — TBD in `phases.md`) | Keeps SEO copy editable without redeploys |
| Hosting | Vercel (app) + managed Postgres (Neon/Supabase) | See `Architecture.md` for deployment diagram |

## 5. Core Features

### 5.1 Marketing Website — Visual & Interaction Requirements
- Single-scroll, light-theme, section-based homepage per `design.md` (Hero → Problem → What You Get → Proof → How It Works → Final CTA → Footer).
- **Parallax & motion:** subtle scroll-linked parallax on the hero background graphic (indigo gradient blob / node pattern — no stock photos, no literal robot imagery); fade-up-on-scroll for section content as elements enter viewport; smooth anchor-scroll and page transitions. Motion must always read as *restrained*, never bouncy/playful (per design doc).
- Fully responsive (mobile-first) — the AI Voice Agent and premium pages are frequently the first touchpoint for mobile searchers.
- Dark-on-light contrast throughout (no dark-mode requirement at launch — flagged as a future enhancement in `phases.md`).
- Every interactive element (buttons, cards, forms) must have visible hover/focus states and satisfy WCAG AA contrast.

### 5.2 Meeting Booking System
Replaces a third-party scheduler (Calendly, etc.) with a first-party system.

**Functional requirements:**
- Visitor selects a service (optional context field) and picks an available date/time from Harsimran's configured availability (admin-managed working hours + blackout dates).
- Visitor submits name, email, phone (optional), and a short note.
- On submission:
  - A **booking confirmation email** is sent to the visitor (with date/time, cancel link, add-to-calendar `.ics` attachment).
  - A **notification email** is sent to the admin inbox with lead details.
  - The slot is marked unavailable to prevent double-booking.
- **Reminder emails** are sent automatically: 24 hours before and 1 hour before the meeting.
- **Cancellation:** the confirmation email includes a unique, expiring cancellation link. Visiting it lets the visitor cancel without logging in; both parties receive a cancellation-confirmed email and the slot is released back to availability.
- **Rescheduling** (v1.1 — flagged, not blocking launch): cancel + rebook flow reuses the same token.
- Admin can view all upcoming/past bookings, manually cancel, and adjust availability from the admin dashboard (protected by auth, §5.3).
- All booking timestamps are stored in UTC and displayed in the visitor's local timezone (client-side conversion) and IST for the admin dashboard.

### 5.3 Authentication System (password-based only)
Protects `/admin/*` routes. No social login, no magic links — email + password, exactly as scoped.

- **Sign-up:** admin account creation (seeded manually or via a one-time invite; public self-signup is disabled in v1).
- **Login:** email + password → session cookie (httpOnly, secure, signed).
- **Email verification:** on account creation, a verification email with a unique expiring token is sent; unverified accounts have read-only or no dashboard access until verified.
- **Password reset:** "Forgot password" flow — visitor requests reset → expiring token emailed → reset form → password updated → confirmation email sent → all existing sessions invalidated.
- Passwords hashed with bcrypt/argon2; never logged or stored in plaintext.
- Rate limiting on login and password-reset endpoints to prevent brute force/enumeration.
- Full flow detail and token lifecycle in `Architecture.md` §"Authentication Architecture."

### 5.4 Contact Us Form
- Available on `/contact` and as a persistent secondary path (not competing visually with the primary "Book a Call" CTA, per `design.md`).
- Fields: name, email, phone (optional), business type/service interest (dropdown), message.
- Server-side validation + spam protection (honeypot field + rate limiting; CAPTCHA as a fallback if spam becomes an issue).
- On submission: confirmation email to the visitor, notification email to admin, entry saved to DB and visible in the admin dashboard alongside bookings (unified "Leads" view).

### 5.5 Blog (structure only at launch, per `seo_aeo_geo.md`)
- MDX/CMS-driven posts under `/blog/[slug]`.
- Each post supports: title, meta description, hero image, direct-answer opener, FAQ block (rendered with `FAQPage` schema), internal links to relevant service/location pages.
- Listing page `/blog` with pagination.

### 5.6 Location Pages
- Dynamic route `/locations/[city]` driven by a content data source (MDX/CMS entries), not one hardcoded page per city — see `Architecture.md` for the data model.
- Each city page requires at least one unique paragraph (no thin/duplicate content) per the explicit warning in the source content doc.
- Mansa page carries full `LocalBusiness` schema (real, verified location); all other city pages carry `Service` + `areaServed` schema only.

### 5.7 404 & Error Handling
- Custom branded `not-found.tsx` (Next.js) matching the site's design system (ivory background, indigo accents, Sora/Playfair type) — not the framework default.
- Copy: friendly, on-brand, one clear CTA back to Home and a secondary link to `/contact`. No dead-end page.
- Custom `error.tsx` boundary for unhandled runtime errors (distinct from 404), logged server-side (e.g., Sentry — see `phases.md`), showing a generic "something went wrong" message with a retry/back-home action.
- Booking/cancellation links that are expired or already used show a dedicated, friendly "This link has expired" state (not a generic 404), with a CTA to rebook.

## 6. Page Inventory

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home | Full section structure per `design.md` |
| `/services` | Services overview | Hub linking to all 5 service pages |
| `/services/social-media-management` | Service detail | Pricing table, FAQ, schema |
| `/services/website-development` | Service detail | Tiers, portfolio, FAQ, schema |
| `/services/ai-integration-development` | Service detail (hub for the two flagship pages below) | FAQ, schema |
| `/services/ai-voice-agents` | Flagship service | Highest content depth, industry grid, comparison table, FAQ + schema |
| `/services/agentic-ai-systems` | Flagship service | Comparison table (agentic vs chatbot), use cases, FAQ + schema |
| `/locations/[city]` | Dynamic location page | Template + unique content per city; Mansa = full LocalBusiness schema |
| `/about` | Founder/entity page | Person + AboutPage schema — key GEO trust page |
| `/contact` | Contact form + NAP block | ContactPage schema, embedded map |
| `/blog` | Blog index | Paginated |
| `/blog/[slug]` | Blog post | FAQPage schema where applicable |
| `/book-a-call` (or in-page booking widget) | Booking flow | Can be a dedicated route or a modal launched from CTA buttons — decide in Phase 1 design pass |
| `/cancel-booking/[token]` | Cancellation handler | Token-gated, no login required |
| `/admin/login`, `/admin/verify`, `/admin/forgot-password`, `/admin/reset-password/[token]` | Auth flows | See §5.3 |
| `/admin` (dashboard) | Protected admin area | Leads, bookings, availability settings |
| `/privacy-policy`, `/terms` | Legal | Required given data collection (bookings, forms, emails) |
| `not-found` (404) | Error page | See §5.7 |

## 7. Non-Functional Requirements

- **Performance:** Core Web Vitals target — LCP < 2.5s, CLS < 0.1, INP < 200ms (explicitly called out in `seo_aeo_geo.md` as more important for mobile premium leads than almost any other factor).
- **Accessibility:** WCAG 2.1 AA baseline — keyboard navigable, sufficient contrast, alt text on all images (pattern defined in `seo_aeo_geo.md`), reduced-motion support (`prefers-reduced-motion` disables/limits parallax and fade animations).
- **Security:** HTTPS everywhere, hashed passwords, httpOnly session cookies, CSRF protection on all mutating routes, rate limiting on auth/booking/contact endpoints, input validation/sanitization (Zod schemas end-to-end).
- **Reliability of email delivery:** SPF/DKIM/DMARC configured for h4ai.in sending domain; delivery failures logged and retried; admin notified if reminder/cancellation email dispatch fails.
- **SEO-readiness:** every page server-rendered/static with correct meta tags, canonical URLs, and structured data — full spec in `seo_aeo_geo.md`.
- **Data privacy:** booking/contact data stored securely, retention policy defined, privacy policy published and linked from every form.
- **Internationalization:** not required at launch (single language); `hreflang` revisited only if French is added for the Canada cluster (per source doc).

## 8. Out of Scope for v1

- Public client login/portal (only admin auth exists).
- Payment processing / invoicing.
- Rescheduling UI (only cancel + rebook manually).
- Multi-admin roles/permissions (single admin role at launch).
- CRM integration (leads live in the admin dashboard only; export/integration is a future phase).
- Live chat widget.

## 9. Success Metrics

- Booked-call conversion rate from organic + AEO/GEO traffic.
- Contact-form-to-call conversion rate.
- Core Web Vitals scores in the "Good" band across all templates.
- Number of city/blog pages indexed and ranking within 90 days (ties to `phases.md` rollout cadence).
- Zero missed reminder/cancellation emails (delivery success rate).

## 10. Assumptions

1. **Auth scope:** authentication protects only an internal admin dashboard (bookings, leads, availability, and eventually blog authoring), not a public client account system. This was inferred because no client-portal requirement exists elsewhere in the provided materials — confirm with Harsimran before Phase 4 (see `phases.md`).
2. **Booking system is first-party**, not a Calendly embed — required explicitly ("meeting booking system with email sender and reminder including cancellation").
3. Blog/location-page content is data-driven (MDX or headless CMS) rather than one hand-coded page per city, to support the "2–3 pages/month, never bulk-published" rollout warned about in `seo_aeo_geo.md`.
