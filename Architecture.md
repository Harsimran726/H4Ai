# H4Ai Website — Architecture Document

**Companion to:** `prd.md`, `design.md`, `seo_aeo_geo.md`, `phases.md`
**Diagram format:** Mermaid (renders natively on GitHub/GitLab and most Markdown viewers; paste into [mermaid.live](https://mermaid.live) if your viewer doesn't render it)

---

## 1. High-Level System Architecture

```mermaid
graph TB
    subgraph Client["Client (Browser)"]
        A1[Next.js App Router Pages]
        A2[Framer Motion / Parallax Layer]
        A3[shadcn/ui Components]
    end

    subgraph Edge["Vercel Edge / Next.js Server"]
        B1[SSR / SSG Rendering]
        B2[Route Handlers - /api/*]
        B3[Middleware - Auth Guard, Rate Limiting]
        B4[Cron Job Runner - Reminders]
    end

    subgraph Services["Application Services (server-side)"]
        C1[Auth Service]
        C2[Booking Service]
        C3[Contact/Lead Service]
        C4[Email Service]
        C5[Content Service - Blog/Locations]
    end

    subgraph Data["Data Layer"]
        D1[(PostgreSQL via Prisma)]
        D2[(CMS / MDX Content Store)]
    end

    subgraph External["External Providers"]
        E1[Resend / SMTP - Transactional Email]
        E2[Vercel Cron]
        E3[Analytics - GA4/Plausible]
        E4[Error Monitoring - Sentry]
    end

    A1 --> B1
    A1 --> B2
    A3 --> A1
    A2 --> A1
    B2 --> B3
    B3 --> C1
    B3 --> C2
    B3 --> C3
    C1 --> D1
    C2 --> D1
    C3 --> D1
    C5 --> D2
    C2 --> C4
    C1 --> C4
    C3 --> C4
    C4 --> E1
    B4 --> C2
    B4 --> C4
    E2 --> B4
    A1 --> E3
    B2 --> E4
```

**Key decisions:**
- All mutating operations (booking, auth, contact) go through **Route Handlers** guarded by **Middleware** (session check for `/admin/*`, rate limiting for public POST endpoints).
- **Email Service** is a single internal abstraction over Resend (primary) with SMTP/Nodemailer as a fallback transport — every other service calls this one module rather than talking to the provider directly, so the provider can be swapped without touching booking/auth/contact logic.
- **Content Service** reads blog posts and location-page copy from MDX files or a headless CMS, decoupled from the transactional data in Postgres — content editors never touch the booking/lead tables.

---

## 2. Tech Stack Rationale

| Choice | Reason |
|---|---|
| Next.js App Router | Native SSR/SSG per route → required for `seo_aeo_geo.md` (meta tags, schema, Core Web Vitals); Route Handlers give us a first-party API without a separate backend service |
| TypeScript | Shared types between DB (Prisma-generated), API contracts, and forms (Zod) — one source of truth end to end |
| Prisma + PostgreSQL | Relational data (bookings, tokens, leads) with real foreign keys and constraints — critical for booking-slot integrity |
| Resend (+ SMTP fallback) | Modern deliverability, simple API, good Next.js support; SPF/DKIM/DMARC setup on `h4ai.in` domain required (see `seo_aeo_geo.md` technical checklist) |
| Framer Motion | Scroll-linked parallax + fade-up without hand-rolled Intersection Observer boilerplate |
| shadcn/ui | Accessible primitives (Dialog, Form, Calendar, Toast) we theme to the palette in `design.md` rather than fight a heavier component library |
| Vercel Cron | Reminder emails (24h / 1h) need a scheduled trigger outside the request/response cycle |

---

## 3. Data Model — Entity Relationship (ER) Diagram

```mermaid
erDiagram
    ADMIN_USER ||--o{ AVAILABILITY_SLOT : configures
    ADMIN_USER ||--o{ AUTH_TOKEN : owns
    AVAILABILITY_SLOT ||--o| BOOKING : "is booked as"
    BOOKING ||--o{ BOOKING_TOKEN : has
    BOOKING ||--o{ EMAIL_LOG : triggers
    LEAD ||--o{ EMAIL_LOG : triggers
    SERVICE ||--o{ BOOKING : "requested for"

    ADMIN_USER {
        uuid id PK
        string email UK
        string password_hash
        boolean email_verified
        datetime created_at
        datetime updated_at
    }

    AUTH_TOKEN {
        uuid id PK
        uuid admin_user_id FK
        string token_hash
        string type "VERIFY | RESET"
        datetime expires_at
        datetime used_at
        datetime created_at
    }

    AVAILABILITY_SLOT {
        uuid id PK
        date slot_date
        time start_time
        time end_time
        boolean is_blocked
        uuid created_by FK
    }

    SERVICE {
        uuid id PK
        string name
        string slug UK
    }

    BOOKING {
        uuid id PK
        uuid availability_slot_id FK
        uuid service_id FK "nullable"
        string visitor_name
        string visitor_email
        string visitor_phone "nullable"
        string note "nullable"
        string status "CONFIRMED | CANCELLED | COMPLETED"
        string timezone
        datetime created_at
        datetime cancelled_at "nullable"
    }

    BOOKING_TOKEN {
        uuid id PK
        uuid booking_id FK
        string token_hash
        string purpose "CANCEL | RESCHEDULE"
        datetime expires_at
        datetime used_at
    }

    LEAD {
        uuid id PK
        string name
        string email
        string phone "nullable"
        string service_interest "nullable"
        string message
        string source "CONTACT_FORM"
        string status "NEW | CONTACTED | CLOSED"
        datetime created_at
    }

    EMAIL_LOG {
        uuid id PK
        uuid booking_id FK "nullable"
        uuid lead_id FK "nullable"
        string template "CONFIRMATION | REMINDER_24H | REMINDER_1H | CANCELLATION | VERIFY | RESET | LEAD_NOTIFY"
        string recipient
        string status "SENT | FAILED"
        datetime sent_at
    }
```

**Notes:**
- `AVAILABILITY_SLOT` is generated by admin-configured working hours (recurring rule) materialized into concrete bookable slots — prevents double-booking via a unique constraint on `(slot_date, start_time)` combined with a one-to-one relationship to `BOOKING`.
- `AUTH_TOKEN` and `BOOKING_TOKEN` are deliberately separate tables (not one polymorphic "tokens" table) so admin-auth tokens and public booking-cancellation tokens never share a namespace or permission model — a leaked cancellation token can never be replayed against the auth system.
- Tokens store a **hash**, never the raw token — the raw value only ever exists in the emailed link and briefly in memory server-side.

---

## 4. Extended ER (EER) — Generalization/Specialization View

The EER view makes explicit the two places where the schema uses a supertype/subtype pattern (flattened into discriminator columns in the physical schema above, but conceptually generalized here):

```mermaid
erDiagram
    TOKEN ||--|| AUTH_TOKEN : "specializes"
    TOKEN ||--|| BOOKING_TOKEN : "specializes"
    EMAIL_LOG_ENTITY ||--|| BOOKING_EMAIL : "specializes"
    EMAIL_LOG_ENTITY ||--|| AUTH_EMAIL : "specializes"
    EMAIL_LOG_ENTITY ||--|| LEAD_EMAIL : "specializes"

    TOKEN {
        uuid id PK
        string token_hash
        datetime expires_at
        datetime used_at
    }
    AUTH_TOKEN {
        uuid admin_user_id FK
        string type "VERIFY | RESET"
    }
    BOOKING_TOKEN {
        uuid booking_id FK
        string purpose "CANCEL | RESCHEDULE"
    }

    EMAIL_LOG_ENTITY {
        uuid id PK
        string status
        datetime sent_at
    }
    BOOKING_EMAIL {
        uuid booking_id FK
        string template "CONFIRMATION | REMINDER_24H | REMINDER_1H | CANCELLATION"
    }
    AUTH_EMAIL {
        uuid admin_user_id FK
        string template "VERIFY | RESET"
    }
    LEAD_EMAIL {
        uuid lead_id FK
        string template "LEAD_NOTIFY | LEAD_CONFIRMATION"
    }
```

**Why this matters for build order:** the `TOKEN` supertype (disjoint, total specialization — every token is exactly one of AUTH or BOOKING) and the `EMAIL_LOG` supertype (disjoint, total specialization across BOOKING/AUTH/LEAD) are exactly why the physical schema in §3 uses a single table per concept with a `type`/`template` discriminator rather than three separate token tables — it keeps expiry/cleanup logic (a scheduled job purging expired tokens) written once against one table instead of three.

---

## 5. Sequence Diagram — Booking Flow

```mermaid
sequenceDiagram
    actor V as Visitor
    participant UI as Booking UI (Next.js)
    participant API as /api/bookings
    participant BS as Booking Service
    participant DB as PostgreSQL
    participant ES as Email Service
    participant Email as Resend/SMTP

    V->>UI: Select service + open date/time
    UI->>API: GET /api/availability?date=
    API->>DB: Query open AVAILABILITY_SLOT rows
    DB-->>API: Available slots
    API-->>UI: Render slot picker
    V->>UI: Fill name/email/phone/note, confirm
    UI->>API: POST /api/bookings
    API->>BS: createBooking(payload)
    BS->>DB: BEGIN TX — lock slot, insert BOOKING, mark slot booked
    DB-->>BS: TX committed
    BS->>DB: Insert BOOKING_TOKEN (purpose=CANCEL)
    BS->>ES: sendBookingConfirmation(visitor)
    BS->>ES: sendLeadNotification(admin)
    ES->>Email: Dispatch emails (with .ics attachment + cancel link)
    Email-->>V: Confirmation email received
    Email-->>V: (Admin) Notification email received
    API-->>UI: 201 Created + booking summary
    UI-->>V: "You're booked" confirmation screen

    Note over BS,ES: Cron (24h before, 1h before) triggers reminder emails automatically
```

## 6. Sequence Diagram — Cancellation Flow

```mermaid
sequenceDiagram
    actor V as Visitor
    participant Link as Emailed Cancel Link
    participant API as /api/bookings/cancel/[token]
    participant BS as Booking Service
    participant DB as PostgreSQL
    participant ES as Email Service

    V->>Link: Clicks cancel link
    Link->>API: GET /api/bookings/cancel/:token
    API->>DB: Look up BOOKING_TOKEN by hash(token)
    alt token invalid/expired/used
        API-->>V: "This link has expired" branded page
    else token valid
        API-->>V: Render confirm-cancellation page
        V->>API: POST confirm cancellation
        API->>BS: cancelBooking(bookingId)
        BS->>DB: Update BOOKING.status=CANCELLED, release AVAILABILITY_SLOT
        BS->>DB: Mark BOOKING_TOKEN.used_at
        BS->>ES: sendCancellationConfirmed(visitor + admin)
        API-->>V: "Booking cancelled" confirmation
    end
```

## 7. Sequence Diagram — Authentication (Signup Verify / Login / Reset)

```mermaid
sequenceDiagram
    actor A as Admin
    participant UI as Auth UI
    participant API as /api/auth/*
    participant AS as Auth Service
    participant DB as PostgreSQL
    participant ES as Email Service

    rect rgb(240,240,240)
    Note over A,ES: Verification (post account-creation)
    A->>UI: Account created (seeded/invited)
    AS->>DB: Insert AUTH_TOKEN (type=VERIFY, expires 24h)
    AS->>ES: sendVerificationEmail(admin)
    A->>UI: Clicks verify link
    UI->>API: GET /api/auth/verify/:token
    API->>DB: Validate + consume token, set email_verified=true
    API-->>A: "Verified" redirect to /admin/login
    end

    rect rgb(240,240,240)
    Note over A,ES: Login
    A->>UI: Submit email + password
    UI->>API: POST /api/auth/login
    API->>AS: verifyCredentials(email, password)
    AS->>DB: Fetch admin_user, compare bcrypt hash
    alt invalid credentials
        API-->>UI: 401 + generic error (no user-enumeration)
    else valid + verified
        API->>API: Create signed httpOnly session cookie
        API-->>UI: 200 + redirect to /admin
    end
    end

    rect rgb(240,240,240)
    Note over A,ES: Forgot / Reset Password
    A->>UI: Submit email on /admin/forgot-password
    UI->>API: POST /api/auth/forgot-password
    API->>DB: Insert AUTH_TOKEN (type=RESET, expires 1h)
    API->>ES: sendPasswordResetEmail(admin)
    API-->>UI: Generic "if that email exists..." response
    A->>UI: Clicks reset link, submits new password
    UI->>API: POST /api/auth/reset-password/:token
    API->>DB: Validate token, update password_hash, consume token
    API->>DB: Invalidate all existing sessions for this admin
    API->>ES: sendPasswordChangedNotice(admin)
    API-->>UI: "Password updated" → redirect to login
    end
```

## 8. Sequence Diagram — Contact Form Submission

```mermaid
sequenceDiagram
    actor V as Visitor
    participant UI as Contact Form
    participant API as /api/leads
    participant LS as Lead Service
    participant DB as PostgreSQL
    participant ES as Email Service

    V->>UI: Fill + submit form (name, email, phone, service, message)
    UI->>API: POST /api/leads
    API->>API: Validate (Zod) + honeypot + rate-limit check
    alt spam detected / invalid
        API-->>UI: 400 with field errors (or silent 200 if honeypot tripped)
    else valid
        API->>LS: createLead(payload)
        LS->>DB: Insert LEAD row
        LS->>ES: sendLeadConfirmation(visitor)
        LS->>ES: sendLeadNotification(admin)
        API-->>UI: 200 "We'll be in touch"
    end
```

## 9. User Flow — End-to-End Visitor Journey

```mermaid
flowchart TD
    Start([Visitor lands on site — organic/AEO/GEO/GBP]) --> Home[Home page]
    Home --> Explore{Explores further?}
    Explore -->|Yes| Service[Service or Location page]
    Explore -->|No, ready now| CTA1
    Service --> ReadFAQ[Reads FAQ / proof section]
    ReadFAQ --> Decide{Ready to act?}
    Decide -->|Book a call| CTA1[Book a Call CTA]
    Decide -->|Has a question first| Contact[Contact form]
    Decide -->|Not ready| Blog[Reads a blog post] --> Decide

    CTA1 --> Picker[Select date/time]
    Picker --> Details[Enter name/email/phone/note]
    Details --> Confirm[Submit booking]
    Confirm --> ConfEmail[Confirmation + admin notify emails sent]
    ConfEmail --> Reminders[24h + 1h reminder emails]
    Reminders --> CallHappens{Call happens?}
    CallHappens -->|Yes| Done([Lead progresses in admin dashboard])
    CallHappens -->|Visitor cancels| CancelLink[Uses cancel link in email]
    CancelLink --> Released[Slot released, cancellation emails sent]

    Contact --> LeadSaved[Lead saved + emails sent]
    LeadSaved --> AdminFollow[Admin follows up manually] --> CTA1
```

## 10. User Flow — Admin

```mermaid
flowchart TD
    A([Admin visits /admin]) --> B{Has session?}
    B -->|No| C[/admin/login]
    B -->|Yes| Dash[Admin Dashboard]
    C --> D{Verified account?}
    D -->|No| E[Blocked — prompt to verify email]
    D -->|Yes, correct creds| Dash
    C --> F[Forgot password?] --> G[Reset flow] --> C
    Dash --> H[View Bookings]
    Dash --> I[View Leads]
    Dash --> J[Manage Availability]
    H --> K[Manually cancel a booking] --> L[Cancellation emails sent]
```

## 11. API Surface (Route Handlers)

| Method & Route | Auth | Purpose |
|---|---|---|
| `GET /api/availability` | Public | Returns bookable slots for a date range |
| `POST /api/bookings` | Public (rate-limited) | Creates a booking, sends confirmation + admin notify |
| `GET /api/bookings/cancel/:token` | Token-gated | Validates cancellation token, renders confirm screen |
| `POST /api/bookings/cancel/:token` | Token-gated | Executes cancellation |
| `POST /api/leads` | Public (rate-limited + honeypot) | Creates a contact-form lead |
| `POST /api/auth/login` | Public (rate-limited) | Authenticates admin, sets session cookie |
| `POST /api/auth/logout` | Session | Clears session |
| `GET /api/auth/verify/:token` | Token-gated | Verifies admin email |
| `POST /api/auth/forgot-password` | Public (rate-limited) | Issues reset token + email |
| `POST /api/auth/reset-password/:token` | Token-gated | Sets new password, invalidates sessions |
| `GET/POST /api/admin/bookings` | Session (admin) | List/manage bookings |
| `GET/POST /api/admin/leads` | Session (admin) | List/manage leads |
| `GET/POST /api/admin/availability` | Session (admin) | Configure working hours/blackout dates |
| `POST /api/cron/reminders` | Cron secret header | Triggered by Vercel Cron; sends due 24h/1h reminder emails |
| `POST /api/cron/token-cleanup` | Cron secret header | Purges expired AUTH_TOKEN/BOOKING_TOKEN rows |

## 12. Folder Structure (Next.js App Router)

```
h4ai-website/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                     # Home
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── social-media-management/page.tsx
│   │   │   ├── website-development/page.tsx
│   │   │   ├── ai-integration-development/page.tsx
│   │   │   ├── ai-voice-agents/page.tsx
│   │   │   └── agentic-ai-systems/page.tsx
│   │   ├── locations/[city]/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/page.tsx
│   │   └── blog/[slug]/page.tsx
│   ├── (booking)/
│   │   ├── book-a-call/page.tsx
│   │   └── cancel-booking/[token]/page.tsx
│   ├── (admin)/
│   │   ├── admin/login/page.tsx
│   │   ├── admin/verify/[token]/page.tsx
│   │   ├── admin/forgot-password/page.tsx
│   │   ├── admin/reset-password/[token]/page.tsx
│   │   └── admin/(protected)/
│   │       ├── layout.tsx               # session guard
│   │       ├── page.tsx                 # dashboard home
│   │       ├── bookings/page.tsx
│   │       ├── leads/page.tsx
│   │       └── availability/page.tsx
│   ├── api/
│   │   ├── availability/route.ts
│   │   ├── bookings/route.ts
│   │   ├── bookings/cancel/[token]/route.ts
│   │   ├── leads/route.ts
│   │   ├── auth/login/route.ts
│   │   ├── auth/logout/route.ts
│   │   ├── auth/verify/[token]/route.ts
│   │   ├── auth/forgot-password/route.ts
│   │   ├── auth/reset-password/[token]/route.ts
│   │   ├── admin/bookings/route.ts
│   │   ├── admin/leads/route.ts
│   │   ├── admin/availability/route.ts
│   │   └── cron/
│   │       ├── reminders/route.ts
│   │       └── token-cleanup/route.ts
│   ├── not-found.tsx                    # branded 404
│   ├── error.tsx                        # error boundary
│   └── layout.tsx                       # root layout, fonts, providers
├── components/
│   ├── ui/                              # shadcn/ui themed components
│   ├── marketing/                       # hero, section cards, proof stats
│   ├── booking/                         # slot picker, booking form
│   └── admin/                           # dashboard tables, forms
├── lib/
│   ├── prisma.ts
│   ├── auth/ (session, hashing, tokens)
│   ├── email/ (Resend client, templates, send wrapper)
│   ├── booking/ (slot generation, conflict checks)
│   └── validation/ (Zod schemas)
├── content/                             # MDX blog posts + location page content
├── prisma/
│   └── schema.prisma
├── public/
│   └── assets/ (logo, og-images)
└── middleware.ts                        # auth guard + rate limiting
```

## 13. Deployment Architecture

```mermaid
graph LR
    Dev[Local Dev] -->|git push| GitHub
    GitHub -->|CI: typecheck, lint, test| Vercel[Vercel Build]
    Vercel -->|Deploy| Prod[Production - Edge + Serverless]
    Prod --> DB[(Managed Postgres - Neon/Supabase)]
    Prod --> Email[Resend API]
    Prod --> Sentry[Sentry Error Monitoring]
    Prod --> Analytics[GA4 / Plausible]
    Cron[Vercel Cron] --> Prod
    User((Visitor/Admin)) --> Prod
```

- **Environments:** `local` → `preview` (per-PR Vercel preview deploys) → `production`.
- **Secrets:** DB connection string, Resend API key, session secret, cron secret — stored in Vercel environment variables, never committed.
- **Migrations:** Prisma migrations run as part of the build/deploy pipeline against the target environment's database.
