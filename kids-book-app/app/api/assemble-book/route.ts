import { NextResponse } from "next/server";

import { BOOK_TEMPLATE_MAP } from "@/data/book-templates";
import { prisma } from "@/lib/prisma";
import { compileAssembledPages } from "@/lib/templates";
import type { AssembledBook, GeneratedImageAsset } from "@/types/book";

type AssembleRequest = {
  kidName: string;
  guardianEmail: string;
  templateId: string;
  favoriteThings?: string[];
  uploadedPhotoUrls: string[];
  generatedImages: GeneratedImageAsset[];
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as AssembleRequest;
    const kidName = payload.kidName?.trim();
    const guardianEmail = payload.guardianEmail?.trim().toLowerCase();
    const templateId = payload.templateId || "when-i-grow-up";

    if (!kidName) {
      return NextResponse.json({ error: "kidName is required." }, { status: 400 });
    }

    if (!guardianEmail) {
      return NextResponse.json({ error: "guardianEmail is required." }, { status: 400 });
    }

    if (!Array.isArray(payload.generatedImages) || payload.generatedImages.length === 0) {
      return NextResponse.json({ error: "generatedImages are required." }, { status: 400 });
    }

    const assembledPages = compileAssembledPages({
      templateId,
      kidName,
      assets: payload.generatedImages,
    });

    const assembly: AssembledBook = {
      kidName,
      templateId,
      pages: assembledPages,
    };

    const child = await prisma.childProfile.upsert({
      where: { guardianEmail },
      update: {
        firstName: kidName,
        favoriteThings: JSON.stringify(payload.favoriteThings ?? []),
      },
      create: {
        firstName: kidName,
        guardianEmail,
        favoriteThings: JSON.stringify(payload.favoriteThings ?? []),
      },
    });

    const book = await prisma.bookProject.create({
      data: {
        title: `${kidName}'s ${BOOK_TEMPLATE_MAP[templateId]?.title ?? "Story"}`,
        templateId,
        status: "ASSEMBLED",
        personalizationNotes: JSON.stringify({
          uploadedPhotoUrls: payload.uploadedPhotoUrls ?? [],
        }),
        scenes: JSON.stringify(assembly.pages),
        childId: child.id,
        assets: {
          create: payload.generatedImages.map((image) => ({
            type: "IMAGE",
            sceneId: image.sceneId,
            url: image.url,
            prompt: image.prompt,
          })),
        },
      },
      include: {
        child: true,
      },
    });

    return NextResponse.json({
      data: {
        assembly,
        bookId: book.id,
      },
    });
  } catch (error) {
    console.error("[assemble-book]", error);
    return NextResponse.json({ error: "Failed to assemble book." }, { status: 500 });
  }
}
