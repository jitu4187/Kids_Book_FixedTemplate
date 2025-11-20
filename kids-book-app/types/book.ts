// Shared TypeScript contracts for template metadata, personalization data, and draft books.
export type BookTemplateScene = {
  id: string;
  title: string;
  /**
   * Short blurb that the AI image generator can use as a prompt.
   */
  illustrationPrompt: string;
  /**
   * Example copywriters can use when personalizing the page.
   */
  sampleText: string;
};

export type BookTemplate = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  ageRange: string;
  pageCount: number;
  coverIllustrationHint: string;
  previewImage: string;
  scenes: BookTemplateScene[];
};

export type ChildProfile = {
  firstName: string;
  age?: number;
  favoriteThings: string[];
  dreamJob?: string;
  guardianEmail: string;
  specialNotes?: string;
};

export type BookProjectDraft = {
  templateId: string;
  child: ChildProfile;
  dedication?: string;
};

export type TemplatePlaceholderPage = {
  id: string;
  /**
   * Text content that can contain tokens such as {{kid_name}} or {{kid_image}}.
   */
  text: string;
  /**
   * Image slot placeholder string (typically {{kid_image}}).
   */
  image: string;
};

export type GeneratedImageAsset = {
  id: string;
  sceneId: string;
  url: string;
  prompt?: string;
};

export type AssembledBookPage = {
  id: string;
  text: string;
  imageUrl: string;
  prompt?: string;
};

export type AssembledBook = {
  kidName: string;
  templateId: string;
  pages: AssembledBookPage[];
};
