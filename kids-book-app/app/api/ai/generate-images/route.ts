// Placeholder image generation endpoint. Replace with Stable Diffusion / Banana integration later.
import { NextResponse } from "next/server";

import {
  generateIllustrationsPlaceholder,
  type IllustrationRequest,
} from "@/lib/ai";

export async function POST(request: Request) {
  const payload = (await request.json()) as IllustrationRequest;
  const images = await generateIllustrationsPlaceholder(payload);

  return NextResponse.json({
    data: images,
    meta: { provider: "placeholder" },
  });
}
