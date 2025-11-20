// PDF helpers built on top of @react-pdf/renderer for quick previews during development.
import { renderToStream } from "@react-pdf/renderer";
import type { Readable } from "stream";

import type { BookTemplate, ChildProfile } from "@/types/book";
import { AlphabetDocument } from "@/templates/a-z-alphabet";
import { WhenIGrowUpDocument } from "@/templates/when-i-grow-up";

type BookTemplateId = BookTemplate["id"];

const PDF_REGISTRY: Record<BookTemplateId, (props: { child: Partial<ChildProfile> }) => JSX.Element> = {
  "when-i-grow-up": WhenIGrowUpDocument,
  "alphabet-adventure": AlphabetDocument,
};

export async function renderBookPreviewPdf({
  templateId,
  child,
}: {
  templateId: BookTemplateId;
  child: Partial<ChildProfile>;
}): Promise<Readable> {
  const PdfComponent = PDF_REGISTRY[templateId] ?? WhenIGrowUpDocument;
  return renderToStream(<PdfComponent child={child} />);
}
