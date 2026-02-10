import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      projectType,
      skillLevel,
      budgetRange,
      timelineUrgency,
      focusAreas,
      description,
    } = body;

    if (!name || !projectType || !skillLevel || !Array.isArray(focusAreas)) {
      return NextResponse.json(
        { error: "Missing required fields: name, projectType, skillLevel, focusAreas" },
        { status: 400 }
      );
    }

    const plan = await prisma.projectPlan.create({
      data: {
        name: String(name),
        projectType: String(projectType),
        skillLevel: String(skillLevel),
        budgetRange: String(budgetRange ?? ""),
        timelineUrgency: String(timelineUrgency ?? ""),
        focusAreas: JSON.stringify(focusAreas),
        description: description ? String(description) : null,
      },
    });

    return NextResponse.json(plan);
  } catch (e) {
    console.error("project-plans POST", e);
    return NextResponse.json(
      { error: "Failed to create project plan" },
      { status: 500 }
    );
  }
}
