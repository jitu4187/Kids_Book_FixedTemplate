## Kids Personalized Book Scaffold

WonderBook is a reference implementation for an AI-assisted kids book builder. It wires together the tech you asked for—Next.js 14 App Router, TailwindCSS + Shadcn UI, Prisma + SQLite, placeholder AI + PDF utilities, and starter book templates—without filling in the final business logic yet.

### Tech Stack

- Next.js 14 (App Router + API routes) with TypeScript
- TailwindCSS 3 + Shadcn UI primitives (button, card, inputs, etc.)
- Prisma ORM + SQLite dev database (`prisma/dev.db`)
- AI placeholder helper that can later call Stable Diffusion / Banana
- `@react-pdf/renderer` for server-side PDF previews
- Two book templates (When I Grow Up, A-Z Alphabet) with metadata + PDF skeletons

### Getting Started

```bash
# Install dependencies
npm install

# Sync the SQLite schema (creates prisma/dev.db)
npm run db:push

# Optionally seed demo rows
npm run db:seed

# Run the dev server
npm run dev
```

Environment variables live in `.env` (see `.env.example`). The only required value today is `DATABASE_URL`.

### Folder Map

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Landing page with hero, workflow outline, profile form, template gallery |
| `app/api/*` | Placeholder API routes for templates, book drafts, AI image requests, and PDF streaming |
| `components/` | Shadcn-style UI primitives plus domain components (forms, preview, layout) |
| `data/book-templates.ts` | Registry of available template metadata |
| `templates/*.tsx` | Template-level metadata + PDF document skeletons for `@react-pdf/renderer` |
| `lib/` | Utilities for classNames, Prisma client, AI placeholder, PDF helpers |
| `prisma/schema.prisma` | SQLite schema for child profiles, book projects, generated assets |
| `prisma/seed.ts` | Inserts a demo child + book draft for local testing |
| `types/book.ts` | Shared TypeScript contracts for templates and personalization data |

Every file contains inline comments describing its role so future contributors can navigate quickly.

### API Surface (Scaffolded)

| Route | Description |
| --- | --- |
| `GET /api/templates` | Returns the template registry (When I Grow Up, A-Z Alphabet) |
| `GET /api/books` | Lists the 10 most recent Prisma book drafts (child relation included) |
| `POST /api/books` | Creates a draft child + book record with placeholder values |
| `POST /api/ai/generate-images` | Calls the Stable Diffusion/Banana placeholder generator |
| `POST /api/pdf` | Streams a PDF preview generated with `@react-pdf/renderer` |

### Next Steps

- Swap the AI placeholder (`lib/ai.ts`) for your Stable Diffusion / Banana implementation.
- Flesh out the PDF documents with full layouts, fonts, and pagination.
- Add proper validation, auth, rate limiting, and background jobs as needed.
- Migrate Prisma to Postgres when you’re ready for production workloads.

Until then, this repository stays intentionally light—focused on giving you a clean scaffold, predictable folder structure, and clear extension points. Have fun building!
