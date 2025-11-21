// Placeholder REST endpoints showing how to persist personalization drafts via Prisma.
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import type { BookProjectDraft } from "@/types/book";

export async function GET() {
  const drafts = await prisma.story.findMany({
    orderBy: { updatedAt: "desc" },
    take: 10,
    include: {
      child: true,
    },
  });

  return NextResponse.json({ data: drafts });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<BookProjectDraft>;
  const templateId = payload.templateId ?? "when-i-grow-up";

  const child = await prisma.childProfile.create({
    data: {
      firstName: payload.child?.firstName ?? "Story Star",
      guardianEmail: payload.child?.guardianEmail ?? "placeholder@wonderbook.app",
      age: payload.child?.age,
      dreamJob: payload.child?.dreamJob,
      favoriteThings: JSON.stringify(payload.child?.favoriteThings ?? []),
      specialNotes: payload.child?.specialNotes,
    },
  });

  const draft = await prisma.story.create({
    data: {
      title: `Personalized ${templateId}`,
      templateId,
      childId: child.id,
      personalizationNotes: payload.dedication,
      status: "DRAFT",
    },
  });

  return NextResponse.json({ data: draft }, { status: 201 });
}
