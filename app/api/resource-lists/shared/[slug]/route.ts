import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const list = await prisma.savedList.findFirst({
      where: { slug, sharedAt: { not: null } },
      include: {
        projectPlan: true,
        items: {
          where: { removed: false },
          include: { resource: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
    if (!list) {
      return NextResponse.json({ error: "Shared list not found" }, { status: 404 });
    }
    const focusAreas = JSON.parse(list.projectPlan.focusAreas) as string[];
    return NextResponse.json({
      ...list,
      projectPlan: { ...list.projectPlan, focusAreas },
    });
  } catch (e) {
    console.error("resource-lists shared GET", e);
    return NextResponse.json(
      { error: "Failed to fetch shared list" },
      { status: 500 }
    );
  }
}
