// Basic seed file so Prisma has a couple of rows to work with immediately.
import { PrismaClient } from "@prisma/client";

import { BOOK_TEMPLATES } from "@/data/book-templates";

const prisma = new PrismaClient();

async function main() {
  const child = await prisma.childProfile.upsert({
    where: { guardianEmail: "demo@wonderbook.app" },
    update: {},
    create: {
      firstName: "Avery",
      guardianEmail: "demo@wonderbook.app",
      age: 5,
      favoriteThings: JSON.stringify(["robots", "rainbows"]),
    },
  });

  await prisma.story.upsert({
    where: { id: "demo-book-project" },
    update: {},
    create: {
      id: "demo-book-project",
      title: BOOK_TEMPLATES[0]?.title ?? "When I Grow Up",
      templateId: BOOK_TEMPLATES[0]?.id ?? "when-i-grow-up",
      childId: child.id,
      status: "DRAFT",
      personalizationNotes: "Seeded record for local testing.",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
