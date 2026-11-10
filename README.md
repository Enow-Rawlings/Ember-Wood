# Emberwood — Firewood & Timber E-Commerce Platform

A polished, conversion-focused firewood and timber e-commerce platform with a standalone admin dashboard.

> Built on a proven engineering foundation adapted from a prior production platform.
> Every data model, API pattern and security layer has been purpose-built for the Emberwood firewood and timber business.

---

## Monorepo Structure

```
emberwood/
  apps/
    storefront/     # React 18 + Vite — public customer-facing storefront (Vercel)
    admin/          # React 18 + Vite — standalone admin dashboard (Vercel, separate deployment)
    api/            # Node.js + Express REST API (Render)
  packages/
    shared-types/   # Shared TypeScript types, enums and Zod schemas
    ui/             # Shared design-system components
  database/
    migrations/     # SQL migrations 001–019 (run via Supabase CLI or psql)
    seed/           # Development-only seed data
  docs/             # Architecture, API, deployment and operations docs
```

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)
- A dedicated **Emberwood** Supabase project (never share with another platform)
- Cloudinary account (use `emberwood/` folder prefix)
- Resend account

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local — see the file for all required variables

# 3. Run database migrations against your Emberwood Supabase project
# Migrations 001–019 must be run in order

# 4. Start development servers
pnpm dev:api          # API on :4000
pnpm dev:storefront   # Storefront on :5173
pnpm dev:admin        # Admin on :5174
```

## Apps

| App | Port | Deploy to |
|-----|------|-----------|
| Storefront | 5173 | Vercel (production domain) |
| Admin | 5174 | Vercel (separate subdomain, access-controlled) |
| API | 4000 | Render |

## Key Commands

```bash
pnpm build          # Build all apps
pnpm lint           # Lint all packages
pnpm typecheck      # TypeScript check all packages
```

## Brand Identity

| Token | Value | Use |
|-------|-------|-----|
| Forest Green | `#18352F` | Header, footer, primary surfaces |
| Ember Orange | `#C46B3C` | CTAs, highlights, accent |
| Cream | `#F7F3EA` | Page backgrounds |
| Pale Sage | `#E7EEE8` | Secondary panels |
| Charcoal | `#252B28` | Body text |

Typography: **Playfair Display** (headings) + **Inter** (body)

## Product Model — Firewood Attributes

Products support all standard e-commerce fields plus:

| Field | Description |
|-------|-------------|
| `wood_species` | Actual species, e.g. Oak, Ash, Mixed hardwood |
| `wood_type` | `hardwood` / `softwood` / `mixed` |
| `wood_condition` | Kiln-dried, Seasoned, Air-dried, etc. |
| `log_length_cm` | Approximate log length in centimetres |
| `pack_format` | Net bag, Bulk bag, Crate, Pallet, etc. |
| `weight_kg` | Pack weight |
| `volume_description` | Human-readable quantity with explicit units |
| `moisture_content` | Only populated when genuinely tested and documented |
| `intended_use` | Open fireplace, Wood-burning stove, Fire pit, etc. |
| `sale_price` | Active sale price (must be less than `price`) |

**Important:** `moisture_content` must only be populated when measured and documented. Include measurement date/batch reference.

## Delivery System

Delivery zones are configured in the admin dashboard under **Settings → Delivery**.

Each zone supports:
- Country codes (ISO 3166-1 alpha-2)
- Postcode prefix restrictions (leave empty = whole country)
- Base delivery charge
- Free-delivery threshold
- Minimum order amount
- Lead time and estimated delivery text
- Collection availability

**Delivery is always confirmed per order.** The system supports serviceability checking but final availability, charges and lead times are confirmed to the customer on each order request — never automatically at checkout.

## Order Workflow

| Status | Meaning |
|--------|---------|
| `pending_review` | Request received |
| `awaiting_customer_confirmation` | Business supplied final details, awaiting acceptance |
| `awaiting_payment` | Accepted, payment instructions issued |
| `payment_verification_pending` | Customer reports payment, staff must verify |
| `paid` | Payment verified |
| `processing` | Being prepared |
| `dispatched` | Dispatched, tracking if available |
| `delivered` | Delivered or collected |
| `cancelled` | Cancelled with reason |
| `refunded` | Refunded with audit trail |

**Never mark an order as paid without verified payment confirmation.**

## Admin Roles

| Role | Access |
|------|--------|
| `owner` | Full access including settings, users and integrations |
| `catalogue_manager` | Products, categories, media, SEO drafts |
| `order_manager` | Orders and fulfilment updates |
| `support_agent` | Enquiries and customer-visible order communication |
| `seo_editor` | SEO records and metadata |

Roles are enforced server-side at the API layer — not only in the frontend.

## Environment Variables

See `.env.example` for the full list. Key groups:

- **Supabase** — `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `SUPABASE_JWT_SECRET`
- **Cloudinary** — `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (server only)
- **Resend** — `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_SUPPORT`
- **Groq AI** — `GROQ_API_KEY` (server only)
- **CORS** — `FRONTEND_ORIGIN`, `ADMIN_ORIGIN`, `ALLOWED_ORIGINS`

> `SUPABASE_SERVICE_ROLE_KEY`, `CLOUDINARY_API_SECRET` and `GROQ_API_KEY` must **never** be exposed to the browser or committed to source control.

## Database Migrations

Run migrations in order against your Emberwood Supabase project:

```
001 — Extensions (uuid, citext, pg_trgm)
002 — Admin users and roles
003 — Customer profiles and addresses
004 — Categories
005 — Products (base model + compliance columns removed)
006 — Inventory movement log
007 — Orders and order workflow
008 — SEO records and redirects
009 — Live chat (conversations and messages)
010 — Audit log
011 — Store settings
012 — Updated-at triggers
013 — Row-level security
014 — Content blocks (Emberwood defaults seeded)
015 — Blog posts
016 — RLS service role write access
017 — RLS SEO and blog
018 — Product wood attributes (species, type, condition, length, etc.)
019 — Delivery zones and updated order statuses
```

## Important Notices

- **Payment processing is deferred.** The platform supports order requests only. No card data is collected until a verified payment workflow is implemented.
- **Delivery confirmation is manual.** Every order delivery is confirmed individually — the system never automatically guarantees delivery availability at checkout.
- **Wood attribute accuracy.** Never populate `moisture_content`, certifications, or sustainability fields without documented evidence.
- **Demo data** in `database/seed/` is for development only.
- **Secrets** must never be committed. Use `.env.local` locally and platform environment variables in production.
- **Emberwood must use its own Supabase project.** Never connect Emberwood production data to any other platform's database.

## Implementation Status

| Phase | Status |
|-------|--------|
| 1 — Audit of source platform | ✅ Complete |
| 2 — Brand/design system | ✅ Complete |
| 3 — Storefront pages & delivery system | ✅ Complete |
| 4 — Catalogue (variants, extended filters) | 🔲 Next |
| 5 — Order workflow & notifications | 🔲 Pending |
| 6 — Full admin dashboard | 🔲 Pending |
| 7 — SEO/content | 🔲 Pending |
| 8 — QA/hardening | 🔲 Pending |
| 9 — Launch readiness | 🔲 Pending |
