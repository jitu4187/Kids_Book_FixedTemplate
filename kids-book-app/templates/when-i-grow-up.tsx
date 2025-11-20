// Book template metadata + placeholder PDF document for the "When I Grow Up" story.
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { BookTemplate, ChildProfile } from "@/types/book";

export const whenIGrowUpTemplate: BookTemplate = {
  id: "when-i-grow-up",
  slug: "when-i-grow-up",
  title: "When I Grow Up",
  tagline: "Imagine different futures for every curious kiddo.",
  summary:
    "A career-exploration adventure that lets children see themselves as astronauts, artists, chefs, and more.",
  tags: ["aspiration", "STEM", "imagination"],
  ageRange: "4-8",
  pageCount: 12,
  coverIllustrationHint: "Playful pastel city skyline with multiple careers represented.",
  previewImage: "/templates/when-i-grow-up.png",
  scenes: [
    {
      id: "opening",
      title: "Dream Big",
      illustrationPrompt:
        "Child standing on a hill made of crayons overlooking floating dream bubbles of future careers.",
      sampleText: "When I grow up, I can become absolutely anything I imagine.",
    },
    {
      id: "career-1",
      title: "Explorer",
      illustrationPrompt: "Space explorer waving from a rocket shaped like the child's favorite toy.",
      sampleText: "As an explorer, I look up at the stars and ask brave questions that help us learn.",
    },
    {
      id: "career-2",
      title: "Helper",
      illustrationPrompt: "Friendly community helper planting trees with neighbors and pets.",
      sampleText: "Helpers make the world kinder by caring for people, animals, and places.",
    },
  ],
};

const styles = StyleSheet.create({
  page: { padding: 32 },
  heading: { fontSize: 20, marginBottom: 16 },
  body: { fontSize: 12, lineHeight: 1.3 },
});

export function WhenIGrowUpDocument({
  child,
}: {
  child: Pick<ChildProfile, "firstName" | "dreamJob">;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>When {child.firstName} Grows Up</Text>
          <Text style={styles.body}>
            This PDF is a placeholder. In production we will stream the full layout with custom scenes
            and Stable Diffusion illustrations for {child.firstName}&apos;s adventures.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
