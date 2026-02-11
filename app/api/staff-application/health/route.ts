import { NextResponse } from "next/server";
import { requireEnv } from "@/lib/env";

/**
 * Health check endpoint for staff application system.
 * Verifies webhook configuration without exposing the URL or token.
 * Only returns configured: true/false; never the webhook URL or secret.
 */
export async function GET() {
  let webhookUrl: string;
  try {
    webhookUrl = requireEnv("DISCORD_WEBHOOK_URL");
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "Webhook not configured. Add DISCORD_WEBHOOK_URL to .env.local in the project root and restart the server.",
        configured: false,
      },
      { status: 500 }
    );
  }

  const isValidFormat = webhookUrl.startsWith("https://discord.com/api/webhooks/");
  if (!isValidFormat) {
    return NextResponse.json(
      {
        status: "error",
        message: "Invalid webhook URL format",
        configured: false,
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      status: "ok",
      message: "Webhook is configured",
      configured: true,
    },
    { status: 200 }
  );
}
