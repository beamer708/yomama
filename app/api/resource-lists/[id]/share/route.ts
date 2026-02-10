import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const list = await prisma.savedList.update({
      where: { id },
      data: { sharedAt: new Date() },
      include: {
        projectPlan: true,
        items: {
          where: { removed: false },
          include: { resource: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
    return NextResponse.json({
      slug: list.slug,
      sharedAt: list.sharedAt,
      shareUrl: `/resource-list-creator/shared/${list.slug}`,
    });
  } catch (e) {
    console.error("resource-lists share POST", e);
    return NextResponse.json(
      { error: "Failed to share list" },
      { status: 500 }
    );
  }
}
