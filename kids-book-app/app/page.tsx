import { BookPreview } from "@/components/book/book-preview";
import { ChildProfileForm } from "@/components/forms/child-profile-form";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { Button } from "@/components/ui/button";
import { BOOK_TEMPLATES } from "@/data/book-templates";

const HERO_STATS = [
  { label: "Templates ready", value: "2" },
  { label: "API routes scaffolded", value: "3" },
  { label: "PDF powered by", value: "@react-pdf/renderer" },
  { label: "AI handoff", value: "Stable Diffusion / Banana" },
];

export default function Home() {
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
            This scaffold stitches together Next.js 14 App Router, Tailwind + Shadcn UI, Prisma + SQLite,
            API routes, PDF previews, and AI placeholders so you can focus on storytelling.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button>Start prototyping</Button>
            <Button variant="outline">Review architecture</Button>
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
        <div id="workflow" className="space-y-4 rounded-2xl border bg-card p-6">
          <p className="text-sm font-semibold text-primary">Workflow checklist</p>
          <h2 className="text-2xl font-bold">Full-stack handoffs</h2>
          <ol className="space-y-4 text-sm text-muted-foreground">
            <li>1. Capture child profile + preferences (see form scaffold).</li>
            <li>2. Draft copy + plan scenes using `BOOK_TEMPLATES` metadata.</li>
            <li>3. Call `/api/ai/generate-images` to request Stable Diffusion renders.</li>
            <li>4. Save progress to Prisma via `/api/books`.</li>
            <li>5. Export shareable preview PDFs from `/api/pdf`.</li>
          </ol>
        </div>
      </section>

      <TemplateGallery templates={BOOK_TEMPLATES} />
    </div>
  );
}
