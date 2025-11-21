import { NextResponse } from "next/server";

import { renderBookPreviewPdf } from "@/lib/pdf";
import { prisma } from "@/lib/prisma";
import { saveBufferToBucket } from "@/lib/storage";

type GeneratePdfRequest = {
  templateId: string;
  child: {
    firstName: string;
    dreamJob?: string;
    favoriteThings?: string[];
  };
  storyId?: string;
};

async function streamToBuffer(stream: AsyncIterable<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk));
  }
  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GeneratePdfRequest;
    const templateId = payload.templateId || "when-i-grow-up";
    const child = payload.child;

    if (!child?.firstName) {
      return NextResponse.json({ error: "child.firstName is required." }, { status: 400 });
    }

    const pdfStream = await renderBookPreviewPdf({
      templateId: templateId as never,
      child,
    });

    const pdfBuffer = await streamToBuffer(pdfStream);

      const { publicUrl } = await saveBufferToBucket("pdfs", pdfBuffer, {
        extension: ".pdf",
        filenamePrefix: `${child.firstName.toLowerCase()}-${templateId}`,
      });

      if (payload.storyId) {
        await prisma.story.update({
          where: { id: payload.storyId },
          data: { status: "PDF_READY" },
        });

        await prisma.generatedAsset.create({
          data: {
            type: "PDF",
            sceneId: "book",
            url: publicUrl,
            storyId: payload.storyId,
          },
        });
      }

    return NextResponse.json({
      data: {
        pdfUrl: publicUrl,
      },
    });
  } catch (error) {
    console.error("[generate-pdf]", error);
    return NextResponse.json({ error: "Failed to render PDF." }, { status: 500 });
  }
}
