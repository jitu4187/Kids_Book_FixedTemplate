// Book template metadata + placeholder PDF document for the "A-Z Alphabet" exploration.
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { BookTemplate, ChildProfile } from "@/types/book";

export const alphabetTemplate: BookTemplate = {
  id: "alphabet-adventure",
  slug: "a-z-alphabet",
  title: "A-Z Alphabet Adventure",
  tagline: "From A to Zed, each letter becomes a mini story starring your child.",
  summary:
    "Vibrant scenes guide early readers through phonics and vocabulary using their favorite things for each letter.",
  tags: ["literacy", "alphabet", "phonics"],
  ageRange: "3-6",
  pageCount: 28,
  coverIllustrationHint: "Alphabet blocks floating around a character surrounded by jungle animals.",
  previewImage: "/templates/a-z-alphabet.png",
  scenes: [
    {
      id: "intro",
      title: "Alphabet Party",
      illustrationPrompt: "Colorful parade of letters wearing costumes inspired by the child's hobbies.",
      sampleText: "Welcome to the Alphabet Party where every letter knows {child} by name!",
    },
    {
      id: "middle",
      title: "Letter Lab",
      illustrationPrompt: "Laboratory of letters mixing paints, instruments, and snacks.",
      sampleText: "We mix melodies and munchies until we discover a brand-new favorite sound.",
    },
    {
      id: "ending",
      title: "Z is for Zest",
      illustrationPrompt: "Letter Z surfing on citrus slices with fireworks of sprinkles behind it.",
      sampleText: "From A to Z, your sparkle fills every story with zest.",
    },
  ],
};

const styles = StyleSheet.create({
  page: { padding: 32 },
  heading: { fontSize: 20, marginBottom: 16 },
  body: { fontSize: 12, lineHeight: 1.3 },
});

export function AlphabetDocument({
  child,
}: {
  child: Pick<ChildProfile, "firstName" | "favoriteThings">;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>An Alphabet for {child.firstName}</Text>
          <Text style={styles.body}>
            Placeholder PDF output. Each real page will swap in the child&apos;s favorites:
            {child.favoriteThings.slice(0, 3).join(", ")} and more.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
