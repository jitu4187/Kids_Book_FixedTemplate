// Registry of available book templates exposed to the UI and API routes.
import type { BookTemplate } from "@/types/book";
import { alphabetTemplate } from "@/templates/a-z-alphabet";
import { whenIGrowUpTemplate } from "@/templates/when-i-grow-up";

export const BOOK_TEMPLATES: BookTemplate[] = [whenIGrowUpTemplate, alphabetTemplate];

export const BOOK_TEMPLATE_MAP = Object.fromEntries(
  BOOK_TEMPLATES.map((template) => [template.id, template])
) as Record<BookTemplate["id"], BookTemplate>;
