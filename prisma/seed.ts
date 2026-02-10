import { PrismaClient } from "@prisma/client";
import { resources } from "../lib/resources";
import { getFocusAreasForCategory } from "../lib/resource-list-mapping";

const prisma = new PrismaClient();

function inferDifficulty(category: string, type: string): string {
  if (type === "video" && category.includes("Fundamentals")) return "beginner";
  if (type === "tool" || type === "website") return "intermediate";
  return "intermediate";
}

async function main() {
  for (const r of resources) {
    const focusAreas = getFocusAreasForCategory(r.category);
    await prisma.resource.upsert({
      where: { id: r.id },
      create: {
        id: r.id,
        title: r.title,
        description: r.description,
        type: r.type,
        url: r.url,
        category: r.category,
        creator: r.creator,
        creatorUrl: r.creatorUrl ?? null,
        section: r.section,
        difficultyLevel: inferDifficulty(r.category, r.type),
        priorityDefault: "recommended",
        focusAreaTags: JSON.stringify(focusAreas),
      },
      update: {
        title: r.title,
        description: r.description,
        type: r.type,
        url: r.url,
        category: r.category,
        creator: r.creator,
        creatorUrl: r.creatorUrl ?? null,
        section: r.section,
        focusAreaTags: JSON.stringify(focusAreas),
      },
    });
  }

  await prisma.scoringConfig.upsert({
    where: { key: "weights" },
    create: {
      key: "weights",
      value: JSON.stringify({
        focus: 10,
        skill: 3,
        priority: 2,
      }),
    },
    update: {},
  });

  console.log("Seed complete: resources and scoring config.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
