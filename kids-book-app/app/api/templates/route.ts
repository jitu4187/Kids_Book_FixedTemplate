// Exposes the template registry to the frontend (and future partner apps).
import { NextResponse } from "next/server";

import { BOOK_TEMPLATES } from "@/data/book-templates";

export async function GET() {
  return NextResponse.json({ data: BOOK_TEMPLATES });
}
