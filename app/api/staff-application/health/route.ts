import { NextResponse } from "next/server";

/**
 * Health check endpoint for staff application system
 * Verifies webhook configuration without exposing sensitive data
 */
export async function GET() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        status: "error",
        message: "DISCORD_WEBHOOK_URL environment variable is not set",
        configured: false,
      },
      { status: 500 }
    );
  }

  // Validate URL format
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

  // Extract webhook ID (first part after /webhooks/)
  const webhookId = webhookUrl.split("/")[5] || "unknown";

  return NextResponse.json(
    {
      status: "ok",
      message: "Webhook is configured",
      configured: true,
      webhookId: webhookId,
      // Don't expose the full URL or token
    },
    { status: 200 }
  );
}
