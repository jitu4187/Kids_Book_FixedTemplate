"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AssembledBookPage } from "@/types/book";

type PagePreviewListProps = {
  pages: AssembledBookPage[];
  onGenerateIllustration?: (page: AssembledBookPage) => void;
  generatingMap?: Record<string, boolean>;
  generationErrors?: Record<string, string | null>;
};

export function PagePreviewList({
  pages,
  onGenerateIllustration,
  generatingMap = {},
  generationErrors = {},
}: PagePreviewListProps) {
  if (!pages.length) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/40 p-8 text-center text-sm text-muted-foreground">
        Preview will appear here after you assemble a book.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {pages.map((page) => {
        const previewImage = page.illustration ?? page.imageUrl;
        const isLoading = generatingMap[page.id];
        const errorMessage = generationErrors[page.id];

        return (
          <article key={page.id} className="flex flex-col gap-3 rounded-2xl border bg-card/60 p-4 shadow-sm">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border bg-muted">
                {previewImage ? (
                  // Using <img> per product requirements so we opt out of Next.js <Image> optimization here.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewImage} alt={page.text} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Illustration pending
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <p className="font-semibold uppercase tracking-wide text-primary">{page.id}</p>
                <span>Page {page.pageNumber}</span>
              </div>
              <p className="text-sm text-muted-foreground">{page.prompt}</p>
              <p className="text-base font-medium">{page.text}</p>
              {onGenerateIllustration && (
                <div className="space-y-1">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => onGenerateIllustration(page)}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      "Generate Illustration"
                    )}
                  </Button>
                  {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
                  {page.illustration && (
                    <p className="break-all text-xs text-muted-foreground">Saved: {page.illustration}</p>
                  )}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
