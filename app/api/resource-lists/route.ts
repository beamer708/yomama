import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateResourceList } from "@/lib/resource-list-engine";

function slug(): string {
  return Math.random().toString(36).slice(2, 10);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectPlanId } = body;
    if (!projectPlanId) {
      return NextResponse.json(
        { error: "projectPlanId is required" },
        { status: 400 }
      );
    }

    const plan = await prisma.projectPlan.findUnique({
      where: { id: projectPlanId },
    });
    if (!plan) {
      return NextResponse.json(
        { error: "Project plan not found" },
        { status: 404 }
      );
    }

    const focusAreas = JSON.parse(plan.focusAreas) as string[];
    const grouped = await generateResourceList({
      name: plan.name,
      projectType: plan.projectType,
      skillLevel: plan.skillLevel,
      budgetRange: plan.budgetRange,
      timelineUrgency: plan.timelineUrgency,
      focusAreas,
      description: plan.description ?? undefined,
    });

    let uniqueSlug = slug();
    while (await prisma.savedList.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = slug();
    }

    const savedList = await prisma.savedList.create({
      data: {
        projectPlanId: plan.id,
        slug: uniqueSlug,
        items: {
          create: [
            ...grouped.required.map((r, i) => ({
              resourceId: r.resourceId,
              priority: "required" as const,
              sortOrder: i,
            })),
            ...grouped.recommended.map((r, i) => ({
              resourceId: r.resourceId,
              priority: "recommended" as const,
              sortOrder: grouped.required.length + i,
            })),
            ...grouped.optional.map((r, i) => ({
              resourceId: r.resourceId,
              priority: "optional" as const,
              sortOrder: grouped.required.length + grouped.recommended.length + i,
            })),
          ],
        },
      },
      include: {
        projectPlan: true,
        items: { include: { resource: true }, orderBy: { sortOrder: "asc" } },
      },
    });

    return NextResponse.json(savedList);
  } catch (e) {
    console.error("resource-lists POST", e);
    return NextResponse.json(
      { error: "Failed to save resource list" },
      { status: 500 }
    );
  }
}
