import { NextResponse } from "next/server";
import { getSuggestionsForQuery } from "@/lib/resource-assistant";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const focusAreas =
      Array.isArray(body?.focusAreas) &&
      body.focusAreas.every((a: unknown) => typeof a === "string")
        ? (body.focusAreas as string[])
        : undefined;

    if (!query && (!focusAreas || focusAreas.length === 0)) {
      return NextResponse.json(
        { error: "Enter what you're working on or select at least one option." },
        { status: 400 }
      );
    }

    const { grouped, reasons, usedAI } = await getSuggestionsForQuery(
      query || "Resource suggestions",
      focusAreas
    );

    return NextResponse.json({
      grouped: {
        recommended: grouped.required,
        helpfulTools: grouped.recommended,
        optional: grouped.optional,
      },
      reasons,
      usedAI,
    });
  } catch (e) {
    console.error("resource-assistant suggest", e);
    return NextResponse.json(
      { error: "We couldn't load suggestions right now. Try again or rephrase your goal." },
      { status: 500 }
    );
  }
}
