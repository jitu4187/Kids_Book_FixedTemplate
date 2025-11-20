// Streams a placeholder PDF generated via @react-pdf/renderer.
import { NextResponse } from "next/server";
import { Readable } from "stream";

import { renderBookPreviewPdf } from "@/lib/pdf";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    templateId?: string;
    child?: { firstName?: string; dreamJob?: string; favoriteThings?: string[] };
  };

  const nodeStream = await renderBookPreviewPdf({
    templateId: (payload.templateId as never) ?? "when-i-grow-up",
    child: payload.child ?? { firstName: "Story Star" },
  });

  const webStream = Readable.toWeb(nodeStream);

  return new NextResponse(webStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=preview.pdf",
    },
  });
}
