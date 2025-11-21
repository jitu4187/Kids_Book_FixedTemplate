import { mkdirSync, writeFileSync } from "fs";
import path from "path";

import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GenerateIllustrationPayload = {
  prompt?: string;
  pageNumber?: number;
  storyId?: string;
};

function sanitizeStoryId(id: string) {
  return id.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase() || "story";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GenerateIllustrationPayload;
    const prompt = payload.prompt?.trim();
    const pageNumber = payload.pageNumber;
    const storyId = payload.storyId?.trim() || "story";

    if (!prompt) {
      return NextResponse.json({ error: true, message: "prompt is required." }, { status: 400 });
    }

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return NextResponse.json({ error: true, message: "pageNumber must be a positive integer." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: true, message: "OpenAI API key not configured." }, { status: 500 });
    }

    const client = new OpenAI({ apiKey });

    const styledPrompt = `${prompt}\nStyle: soft watercolor, children's illustration.`;

    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt: styledPrompt,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const imageData = response.data?.[0]?.b64_json;
    if (!imageData) {
      return NextResponse.json({ error: true, message: "OpenAI did not return image data." }, { status: 502 });
    }

    const buffer = Buffer.from(imageData, "base64");
    const normalizedStoryId = sanitizeStoryId(storyId);
    const relativeDir = path.posix.join("generated", normalizedStoryId);
    const absoluteDir = path.join(process.cwd(), "public", relativeDir);

    mkdirSync(absoluteDir, { recursive: true });
    const filename = `${pageNumber}.png`;
    const absoluteFilePath = path.join(absoluteDir, filename);
    writeFileSync(absoluteFilePath, buffer);

    const imageUrl = `/${relativeDir}/${filename}`.replace(/\\/g, "/");

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("[generate-illustration]", error);
    const message = error instanceof Error ? error.message : "Failed to generate illustration.";
    return NextResponse.json({ error: true, message }, { status: 500 });
  }
}
