import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOptionalEnv } from "@/lib/env";
import { resources as staticResources } from "@/lib/resources";

export async function GET() {
  const openAIConfigured = Boolean(getOptionalEnv("OPENAI_API_KEY"));

  let databaseReady = false;
  let databaseError: string | null = null;
  let databaseCount = 0;

  try {
    databaseCount = await prisma.resource.count();
    databaseReady = databaseCount > 0;
  } catch (error) {
    databaseError = error instanceof Error ? error.message : "Unknown database error";
  }

  return NextResponse.json(
    {
      status: "ok",
      assistantApiReady: true,
      openAIConfigured,
      resourceSource: databaseReady ? "database" : "static-fallback",
      databaseReady,
      databaseCount,
      staticResourceCount: staticResources.length,
      databaseError,
      note:
        "If openAIConfigured is false, assistant still works using keyword fallback. If databaseReady is false, static resources are used.",
    },
    { status: 200 }
  );
}

