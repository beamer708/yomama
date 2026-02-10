import { NextResponse } from "next/server";
import { generateResourceList } from "@/lib/resource-list-engine";

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

    if (
      !name ||
      !projectType ||
      !skillLevel ||
      !Array.isArray(focusAreas)
    ) {
      return NextResponse.json(
        { error: "Missing required fields: name, projectType, skillLevel, focusAreas" },
        { status: 400 }
      );
    }

    const result = await generateResourceList({
      name: String(name),
      projectType: String(projectType),
      skillLevel: String(skillLevel),
      budgetRange: String(budgetRange ?? ""),
      timelineUrgency: String(timelineUrgency ?? ""),
      focusAreas: focusAreas.map(String),
      description: description ? String(description) : undefined,
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("resource-list/generate", e);
    return NextResponse.json(
      { error: "Failed to generate resource list" },
      { status: 500 }
    );
  }
}
