import { randomUUID } from "crypto";

import { NextResponse } from "next/server";

import { BOOK_TEMPLATE_MAP } from "@/data/book-templates";
import { saveBufferToBucket } from "@/lib/storage";
import type { GeneratedImageAsset } from "@/types/book";

type GenerateImagesRequest = {
  kidName: string;
  templateId: string;
  photoUrls: string[];
};

const MIN_IMAGES = 5;
const MAX_IMAGES = 10;

function createSvgScene({
  kidName,
  sceneTitle,
  poseLabel,
}: {
  kidName: string;
  sceneTitle: string;
  poseLabel: string;
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="#fef3c7" />
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="32" fill="#0f172a">
      ${kidName}
    </text>
    <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="#475569">
      ${poseLabel} · ${sceneTitle}
    </text>
  </svg>`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GenerateImagesRequest;
    const kidName = payload.kidName?.trim();
    const templateId = payload.templateId || "when-i-grow-up";

    if (!kidName) {
      return NextResponse.json({ error: "kidName is required." }, { status: 400 });
    }

    const template = BOOK_TEMPLATE_MAP[templateId];
    const baseScenes = template?.scenes ?? [];
    const targetCount = Math.min(Math.max(baseScenes.length, MIN_IMAGES), MAX_IMAGES);

    const generated: GeneratedImageAsset[] = [];

    for (let index = 0; index < targetCount; index += 1) {
      const scene = baseScenes[index % baseScenes.length];
      const sceneId = scene?.id ?? `scene-${index + 1}`;
      const sceneTitle = scene?.title ?? `Pose ${index + 1}`;
      const poseLabel = ["Hero", "Explorer", "Dreamer", "Helper", "Maker", "Scientist", "Artist", "Pilot"][index % 8];
      const svgContents = createSvgScene({ kidName, sceneTitle, poseLabel });
      const { publicUrl } = await saveBufferToBucket("generated", Buffer.from(svgContents), {
        extension: ".svg",
        filenamePrefix: `pose-${sceneId}`,
      });

      generated.push({
        id: randomUUID(),
        sceneId,
        url: publicUrl,
        prompt: `Cartoon ${kidName} as ${sceneTitle}. Pose: ${poseLabel}. Inspired by ${payload.photoUrls?.join(", ") ?? "reference photos"}.`,
      });
    }

    return NextResponse.json({
      data: {
        images: generated,
        template: template?.title ?? "Unknown template",
      },
    });
  } catch (error) {
    console.error("[generate-images]", error);
    return NextResponse.json({ error: "Failed to generate images." }, { status: 500 });
  }
}
