import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: [{ category: "asc" }, { title: "asc" }],
    });
    return NextResponse.json(resources);
  } catch (e) {
    console.error("resources GET", e);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
