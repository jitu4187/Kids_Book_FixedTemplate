// Visual placeholder for the eventual 3D/flipbook preview.
import type { BookTemplate } from "@/types/book";

type BookPreviewProps = {
  template: BookTemplate;
};

export function BookPreview({ template }: BookPreviewProps) {
  return (
    <section className="space-y-4 rounded-2xl border bg-card p-6" aria-label="Book preview placeholder">
      <div>
        <p className="text-sm font-semibold text-primary">Preview</p>
        <h2 className="text-2xl font-bold">{template.title}</h2>
        <p className="text-sm text-muted-foreground">{template.tagline}</p>
      </div>
      <div className="rounded-xl border border-dashed bg-muted/40 p-6 text-sm text-muted-foreground">
        Drop the interactive canvas here. For now, we just list scene titles:
        <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground">
          {template.scenes.map((scene) => (
            <li key={scene.id}>{scene.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
