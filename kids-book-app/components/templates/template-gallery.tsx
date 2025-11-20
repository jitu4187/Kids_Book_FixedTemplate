// Grid that showcases all available templates using the Card component.
import { TemplateCard } from "@/components/templates/template-card";
import type { BookTemplate } from "@/types/book";

type TemplateGalleryProps = {
  templates: BookTemplate[];
};

export function TemplateGallery({ templates }: TemplateGalleryProps) {
  return (
    <section id="templates" className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-primary">Template Library</p>
        <h2 className="text-3xl font-bold tracking-tight">Two starter adventures</h2>
        <p className="text-muted-foreground">
          Swap in your own art direction later. For now, these act as rails for both AI and PDF output.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}
