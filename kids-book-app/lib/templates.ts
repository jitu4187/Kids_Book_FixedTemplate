import type { AssembledBookPage, GeneratedImageAsset, TemplatePlaceholderPage } from "@/types/book";
import { alphabetAdventurePlaceholders } from "@/templates/a_to_z/pages";
import { whenIGrowUpPlaceholders } from "@/templates/when_i_grow_up/pages";

const PLACEHOLDER_MAP: Record<string, TemplatePlaceholderPage[]> = {
  "when-i-grow-up": whenIGrowUpPlaceholders,
  "alphabet-adventure": alphabetAdventurePlaceholders,
};

export function getTemplatePlaceholders(templateId: string) {
  return PLACEHOLDER_MAP[templateId] ?? PLACEHOLDER_MAP["when-i-grow-up"];
}

function replaceTokens(text: string, kidName: string, imageUrl: string) {
  return text.replaceAll("{{kid_name}}", kidName).replaceAll("{{kid_image}}", imageUrl);
}

export function compileAssembledPages({
  templateId,
  kidName,
  assets,
}: {
  templateId: string;
  kidName: string;
  assets: GeneratedImageAsset[];
}): AssembledBookPage[] {
  const placeholders = getTemplatePlaceholders(templateId);
  return placeholders.map((page, index) => {
    const assetMatch =
      assets.find((asset) => asset.sceneId === page.id) ?? assets[index] ?? assets.at(-1);

    const imageUrl = assetMatch?.url ?? "";

    return {
      id: page.id,
      text: replaceTokens(page.text, kidName, imageUrl || kidName),
      imageUrl,
      prompt: assetMatch?.prompt,
    };
  });
}
