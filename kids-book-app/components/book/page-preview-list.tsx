import Image from "next/image";

import type { AssembledBookPage } from "@/types/book";

type PagePreviewListProps = {
  pages: AssembledBookPage[];
};

export function PagePreviewList({ pages }: PagePreviewListProps) {
  if (!pages.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/40 p-8 text-center text-sm text-muted-foreground">
        Preview will appear here after you assemble a book.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {pages.map((page) => (
        <article key={page.id} className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-4 shadow-sm">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted">
            {page.imageUrl ? (
              <Image
                src={page.imageUrl}
                alt={page.text}
                width={640}
                height={480}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Illustration pending
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{page.id}</p>
            <p className="text-sm text-muted-foreground">{page.prompt}</p>
            <p className="mt-2 text-base font-medium">{page.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
