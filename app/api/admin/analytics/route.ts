import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/admin-analytics";

export async function GET() {
  try {
    const summary = await getAnalyticsSummary(30);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("admin analytics GET", error);
    return NextResponse.json({ error: "Failed to fetch analytics summary" }, { status: 500 });
  }
}
