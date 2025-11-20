import type { TemplatePlaceholderPage } from "@/types/book";

export const alphabetAdventurePlaceholders: TemplatePlaceholderPage[] = [
  {
    id: "intro",
    text: "Welcome to the Alphabet Party, {{kid_name}}!",
    image: "{{kid_image}}",
  },
  {
    id: "letter-a",
    text: "A is for the amazing art {{kid_name}} creates with swooping colors.",
    image: "{{kid_image}}",
  },
  {
    id: "letter-m",
    text: "M is for the music {{kid_name}} loves, with notes that shimmer like stardust.",
    image: "{{kid_image}}",
  },
  {
    id: "letter-z",
    text: "Z is for the zest {{kid_name}} brings to every story and song.",
    image: "{{kid_image}}",
  },
  {
    id: "farewell",
    text: "From A to Z, {{kid_name}} makes every letter feel like a best friend.",
    image: "{{kid_image}}",
  },
];
