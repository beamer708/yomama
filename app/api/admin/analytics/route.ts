import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/admin-analytics";

export async function GET(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const summary = await getAnalyticsSummary(30);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("admin analytics GET", error);
    return NextResponse.json({ error: "Failed to fetch analytics summary" }, { status: 500 });
  }
}
