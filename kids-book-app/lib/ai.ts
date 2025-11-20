// Placeholder AI bridge; swap this with Stable Diffusion or Banana integrations later.
import { BOOK_TEMPLATE_MAP } from "@/data/book-templates";
import type { BookTemplateScene } from "@/types/book";

export type IllustrationRequest = {
  templateId: string;
  childName: string;
  stylePreset?: "storybook" | "watercolor" | "neon";
  customNotes?: string;
};

export type IllustrationResponse = Array<{
  sceneId: string;
  imageUrl: string;
  promptUsed: string;
}>;

export async function generateIllustrationsPlaceholder(
  request: IllustrationRequest
): Promise<IllustrationResponse> {
  const template = BOOK_TEMPLATE_MAP[request.templateId];
  const scenes = template?.scenes ?? [];

  // Simulate network/processing latency so the UI can show skeleton states.
  await new Promise((resolve) => setTimeout(resolve, 500));

  return scenes.map((scene: BookTemplateScene) => ({
    sceneId: scene.id,
    imageUrl: `https://placehold.co/600x400?text=${encodeURIComponent(scene.title)}`,
    promptUsed: `${scene.illustrationPrompt} :: child=${request.childName} :: style=${
      request.stylePreset ?? "storybook"
    }`,
  }));
}
