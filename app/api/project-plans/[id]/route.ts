import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const plan = await prisma.projectPlan.findUnique({
      where: { id },
      include: { savedList: true },
    });
    if (!plan) {
      return NextResponse.json({ error: "Project plan not found" }, { status: 404 });
    }
    const focusAreas = JSON.parse(plan.focusAreas) as string[];
    return NextResponse.json({ ...plan, focusAreas });
  } catch (e) {
    console.error("project-plans GET", e);
    return NextResponse.json(
      { error: "Failed to fetch project plan" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const plan = await prisma.projectPlan.update({
      where: { id },
      data: {
        ...(name != null && { name: String(name) }),
        ...(projectType != null && { projectType: String(projectType) }),
        ...(skillLevel != null && { skillLevel: String(skillLevel) }),
        ...(budgetRange != null && { budgetRange: String(budgetRange) }),
        ...(timelineUrgency != null && { timelineUrgency: String(timelineUrgency) }),
        ...(focusAreas != null && { focusAreas: JSON.stringify(focusAreas) }),
        ...(description !== undefined && { description: description ? String(description) : null }),
      },
    });
    return NextResponse.json(plan);
  } catch (e) {
    console.error("project-plans PUT", e);
    return NextResponse.json(
      { error: "Failed to update project plan" },
      { status: 500 }
    );
  }
}
