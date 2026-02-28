import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { resources } from "@/lib/resources";
import { getFocusAreasForCategory } from "@/lib/resource-list-mapping";

function createSlug(): string {
  return randomBytes(6).toString("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const resourceIds = Array.isArray(body.resourceIds)
      ? Array.from(
          new Set(
            body.resourceIds.filter((id: unknown): id is string => typeof id === "string" && id.trim().length > 0)
          )
        )
      : [];

    if (resourceIds.length === 0) {
      return NextResponse.json({ error: "resourceIds is required" }, { status: 400 });
    }

    const selectedResources = resources.filter((resource) => resourceIds.includes(resource.id));
    if (selectedResources.length === 0) {
      return NextResponse.json({ error: "No valid resources selected" }, { status: 400 });
    }

    for (const resource of selectedResources) {
      const focusAreas = getFocusAreasForCategory(resource.category);
      await prisma.resource.upsert({
        where: { id: resource.id },
        update: {
          title: resource.title,
          description: resource.description,
          type: resource.type,
          url: resource.url,
          category: resource.category,
          creator: resource.creator,
          creatorUrl: resource.creatorUrl ?? null,
          section: resource.section,
          difficultyLevel: "intermediate",
          priorityDefault: "recommended",
          focusAreaTags: JSON.stringify(focusAreas),
        },
        create: {
          id: resource.id,
          title: resource.title,
          description: resource.description,
          type: resource.type,
          url: resource.url,
          category: resource.category,
          creator: resource.creator,
          creatorUrl: resource.creatorUrl ?? null,
          section: resource.section,
          difficultyLevel: "intermediate",
          priorityDefault: "recommended",
          focusAreaTags: JSON.stringify(focusAreas),
        },
      });
    }

    let uniqueSlug = createSlug();
    let attempts = 0;
    while (await prisma.savedList.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = createSlug();
      attempts += 1;
      if (attempts > 10) {
        throw new Error("Unable to generate a unique share code");
      }
    }

    const planName =
      typeof body.name === "string" && body.name.trim().length > 0
        ? body.name.trim()
        : "Custom Resource List";

    const projectPlan = await prisma.projectPlan.create({
      data: {
        name: planName,
        projectType: "Manual Selection",
        skillLevel: "mixed",
        budgetRange: "No budget",
        timelineUrgency: "No rush",
        focusAreas: "[]",
        description: "Created from manually selected resources.",
      },
    });

    const savedList = await prisma.savedList.create({
      data: {
        projectPlanId: projectPlan.id,
        slug: uniqueSlug,
        sharedAt: new Date(),
        items: {
          create: selectedResources.map((resource, index) => ({
            resourceId: resource.id,
            priority: "recommended" as const,
            sortOrder: index,
          })),
        },
      },
      include: {
        items: {
          where: { removed: false },
          include: { resource: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return NextResponse.json({
      id: savedList.id,
      slug: savedList.slug,
      shareUrl: `/resource-list-creator/shared/${savedList.slug}`,
      itemCount: savedList.items.length,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    console.error("resource-lists manual POST", error);
    return NextResponse.json(
      { error: "Failed to create custom resource list", detail },
      { status: 500 }
    );
  }
}
