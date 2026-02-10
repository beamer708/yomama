import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const list = await prisma.savedList.findUnique({
      where: { id },
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
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }
    const focusAreas = JSON.parse(list.projectPlan.focusAreas) as string[];
    return NextResponse.json({
      ...list,
      projectPlan: { ...list.projectPlan, focusAreas },
    });
  } catch (e) {
    console.error("resource-lists GET", e);
    return NextResponse.json(
      { error: "Failed to fetch list" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { itemId, removed, isFavorite, sortOrder } = body;

    if (itemId) {
      await prisma.listItem.updateMany({
        where: { id: itemId, savedListId: id },
        data: {
          ...(typeof removed === "boolean" && { removed }),
          ...(typeof isFavorite === "boolean" && { isFavorite }),
          ...(typeof sortOrder === "number" && { sortOrder }),
        },
      });
    }

    const list = await prisma.savedList.findUnique({
      where: { id },
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
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }
    return NextResponse.json(list);
  } catch (e) {
    console.error("resource-lists PATCH", e);
    return NextResponse.json(
      { error: "Failed to update list" },
      { status: 500 }
    );
  }
}
