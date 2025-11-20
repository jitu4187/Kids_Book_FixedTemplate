import type { TemplatePlaceholderPage } from "@/types/book";

export const whenIGrowUpPlaceholders: TemplatePlaceholderPage[] = [
  {
    id: "cover",
    text: "When {{kid_name}} Dreams Big",
    image: "{{kid_image}}",
  },
  {
    id: "opening",
    text: "{{kid_name}} stands on a crayon hill, ready to leap into any future they imagine.",
    image: "{{kid_image}}",
  },
  {
    id: "explorer",
    text: "Explorer {{kid_name}} rides a rocket made of their favorite toys to map the stars.",
    image: "{{kid_image}}",
  },
  {
    id: "helper",
    text: "{{kid_name}} helps neighbors plant kindness seeds that bloom across the city.",
    image: "{{kid_image}}",
  },
  {
    id: "closing",
    text: "No matter the path, {{kid_name}} carries curiosity, courage, and care everywhere.",
    image: "{{kid_image}}",
  },
];
