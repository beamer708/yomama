import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";
import { requireEnv } from "@/lib/env";

interface ResourceSuggestionData {
  discordUsername: string;
  discordId: string;
  resourceTitle: string;
  resourceUrl: string;
  resourceType: "YouTube Video" | "Website Tool" | "Guide / Document" | "Other";
  reason: string;
}

function validateSuggestion(data: ResourceSuggestionData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.discordUsername || typeof data.discordUsername !== "string" || data.discordUsername.trim().length === 0) {
    errors.push("Discord Username is required");
  } else if (data.discordUsername.trim().length > 100) {
    errors.push("Discord Username is too long");
  }

  if (!data.discordId || typeof data.discordId !== "string") {
    errors.push("Discord ID is required");
  } else if (!/^\d{17,19}$/.test(data.discordId.trim())) {
    errors.push("Discord ID must be a valid 17-19 digit number");
  }

  if (!data.resourceTitle || typeof data.resourceTitle !== "string" || data.resourceTitle.trim().length < 2) {
    errors.push("Resource title is required");
  } else if (data.resourceTitle.trim().length > 150) {
    errors.push("Resource title is too long");
  }

  if (!data.resourceUrl || typeof data.resourceUrl !== "string") {
    errors.push("Resource URL is required");
  } else {
    try {
      const url = new URL(data.resourceUrl.trim());
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.push("Resource URL must start with http:// or https://");
      }
    } catch {
      errors.push("Resource URL is invalid");
    }
  }

  const allowedTypes = new Set(["YouTube Video", "Website Tool", "Guide / Document", "Other"]);
  if (!allowedTypes.has(data.resourceType)) {
    errors.push("Please select a valid resource type");
  }

  if (!data.reason || typeof data.reason !== "string" || data.reason.trim().length < 10) {
    errors.push("Please provide at least 10 characters describing why this resource should be added");
  } else if (data.reason.trim().length > 2000) {
    errors.push("Reason is too long (maximum 2000 characters)");
  }

  return { valid: errors.length === 0, errors };
}

function sanitizeText(text: string, maxLength: number = 2000): string {
  return text.trim().replace(/[<>]/g, "").slice(0, maxLength);
}

async function sendSuggestionToDiscord(data: ResourceSuggestionData): Promise<{
  success: boolean;
  error?: string;
  discordError?: string;
}> {
  let webhookUrl: string;
  try {
    webhookUrl = requireEnv("RESOURCE_SUGGESTION_WEBHOOK_URL");
  } catch (error) {
    console.error("[Resource Suggestion API] Missing env", error);
    return {
      success: false,
      error: "Resource suggestions are not configured yet. Please try again later.",
      discordError: "Missing environment variable: RESOURCE_SUGGESTION_WEBHOOK_URL",
    };
  }

  if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    return {
      success: false,
      error: "Server configuration error: Invalid webhook URL format.",
      discordError: "Invalid webhook URL format",
    };
  }

  const username = sanitizeText(data.discordUsername, 100);
  const discordId = sanitizeText(data.discordId, 30);
  const resourceTitle = sanitizeText(data.resourceTitle, 150);
  const resourceUrl = sanitizeText(data.resourceUrl, 1000);
  const resourceType = sanitizeText(data.resourceType, 50);
  const reason = sanitizeText(data.reason, 2000);
  const submittedAt = Math.floor(Date.now() / 1000);

  const payload = {
    content: `New resource suggestion from <@${discordId}>`,
    allowed_mentions: {
      users: [discordId],
      parse: [],
    },
    embeds: [
      {
        title: "New Resource Suggestion",
        color: 0x3b82f6,
        description:
          `Submitted: <t:${submittedAt}:F> (<t:${submittedAt}:R>)\n` +
          "Review this in the channel for discussion and approval.",
        fields: [
          { name: "Discord Username", value: username, inline: false },
          { name: "Discord ID", value: discordId, inline: false },
          { name: "Resource Title", value: resourceTitle, inline: false },
          { name: "Resource URL", value: resourceUrl, inline: false },
          { name: "Resource Type", value: resourceType, inline: true },
          { name: "Why it should be added", value: reason, inline: false },
        ],
        footer: {
          text: "Unity Vault • Resource Suggestions",
        },
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      return {
        success: false,
        error: "Failed to submit suggestion to Discord.",
        discordError: `HTTP ${res.status}: ${text || res.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Network error while sending suggestion to Discord.",
      discordError: error instanceof Error ? error.message : "Unknown network error",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rate = checkRateLimit(clientIP, 4, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          resetTime: new Date(rate.resetTime).toISOString(),
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ResourceSuggestionData;
    const validation = validateSuggestion(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const discordResult = await sendSuggestionToDiscord(body);
    if (!discordResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: discordResult.error || "Failed to submit suggestion.",
          ...(process.env.NODE_ENV === "development" && discordResult.discordError
            ? { discordError: discordResult.discordError }
            : {}),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Suggestion submitted. It was sent to our Discord channel for discussion and approval. Join the Discord server to follow the result.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Resource Suggestion API] Unexpected error", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

