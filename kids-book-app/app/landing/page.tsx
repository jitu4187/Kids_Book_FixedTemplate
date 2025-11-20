import Link from "next/link";

import { BookPreview } from "@/components/book/book-preview";
import { ChildProfileForm } from "@/components/forms/child-profile-form";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { Button } from "@/components/ui/button";
import { BOOK_TEMPLATES } from "@/data/book-templates";

const HERO_STATS = [
  { label: "Templates ready", value: "2" },
  { label: "API routes live", value: "4" },
  { label: "PDF powered by", value: "@react-pdf/renderer" },
  { label: "AI handoff", value: "Stable Diffusion / Nano-Banana" },
];

export default function LandingPage() {
  const heroTemplate = BOOK_TEMPLATES[0];

  return (
    <div className="space-y-16 pb-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_minmax(0,0.8fr)]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Kids personalized book studio
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Launch your AI-assisted book builder faster.
          </h1>
          <p className="text-lg text-muted-foreground">
            This MVP stitches together Next.js App Router, Tailwind + Shadcn UI, Prisma + SQLite, file uploads,
            image placeholders, and PDF exports so you can focus on storytelling.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#templates">Browse templates</Link>
            </Button>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card/30 p-4">
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ChildProfileForm />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <BookPreview template={heroTemplate} />
        <div className="space-y-4 rounded-2xl border bg-card p-6">
          <p className="text-sm font-semibold text-primary">Why two templates?</p>
          <h2 className="text-2xl font-bold">Rails for copy + AI alignment</h2>
          <p className="text-muted-foreground">
            The MVP ships with A-Z Alphabet Adventure and When I Grow Up so designers, writers, and engineers can
            collaborate on prompts, layout, and PDFs before expanding to dozens of stories.
          </p>
        </div>
      </section>

      <section id="flow" className="grid gap-8 border-y bg-muted/30 py-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-primary">1. Upload photos</p>
          <p className="text-sm text-muted-foreground">
            POST <code>/api/upload-photo</code> accepts 1-3 reference shots and stores them in <code>/uploads</code>.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">2. Generate illustrations</p>
          <p className="text-sm text-muted-foreground">
            POST <code>/api/generate-images</code> stubs Stable Diffusion output and saves SVGs to <code>/generated</code>.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">3. Assemble + export</p>
          <p className="text-sm text-muted-foreground">
            POST <code>/api/assemble-book</code> + <code>/api/generate-pdf</code> combine templates, Prisma, and PDF output.
          </p>
        </div>
      </section>

      <TemplateGallery templates={BOOK_TEMPLATES} />
    </div>
  );
}
