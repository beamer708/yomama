import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";

/**
 * DISCORD WEBHOOK SETUP INSTRUCTIONS
 * 
 * To set up the Discord webhook for staff applications:
 * 
 * 1. Open the Unity Vault Discord server (Server ID: 1251469666787000343)
 * 2. Go to Server Settings (right-click server name → Server Settings)
 * 3. Navigate to: Integrations → Webhooks
 * 4. Click "New Webhook" or "Create Webhook"
 * 5. Configure the webhook:
 *    - Name: "Unity Vault Applications" (or similar)
 *    - Channel: Select the staff review channel (Channel ID: 1466217442954186931)
 *    - Copy the webhook URL
 * 6. Add the webhook URL to your environment variables:
 *    - Create a .env.local file in the project root
 *    - Add: DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
 * 7. Never commit the .env.local file to git
 * 8. Restart your development server after adding the environment variable
 * 
 * The webhook URL will look like:
 * https://discord.com/api/webhooks/1234567890123456789/abcdefghijklmnopqrstuvwxyz1234567890
 */

interface StaffApplicationData {
  discordUsername: string;
  discordId: string;
  applicationFor: string[];
  pastExperience: string;
}

/**
 * Validate and sanitize form input
 */
function validateApplication(data: StaffApplicationData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Discord Username validation
  if (!data.discordUsername || typeof data.discordUsername !== "string") {
    errors.push("Discord Username is required");
  } else {
    const trimmed = data.discordUsername.trim();
    if (trimmed.length === 0) {
      errors.push("Discord Username cannot be empty");
    } else if (trimmed.length > 100) {
      errors.push("Discord Username is too long");
    }
  }

  // Discord ID validation
  if (!data.discordId || typeof data.discordId !== "string") {
    errors.push("Discord ID is required");
  } else {
    const trimmed = data.discordId.trim();
    if (trimmed.length === 0) {
      errors.push("Discord ID cannot be empty");
    } else if (!/^\d{17,19}$/.test(trimmed)) {
      // Discord IDs are 17-19 digit numbers
      errors.push("Discord ID must be a valid 17-19 digit number");
    }
  }

  // Application type validation (Community Team and/or Beta Tester)
  if (!Array.isArray(data.applicationFor) || data.applicationFor.length === 0) {
    errors.push("Please select at least one role: Community Team or Beta Tester");
  } else {
    const allowed = new Set(["Community Team", "Beta Tester"]);
    const valid = data.applicationFor.every(
      (entry) => typeof entry === "string" && allowed.has(entry)
    );
    if (!valid) {
      errors.push("Invalid application role selection");
    }
  }

  // Past Experience validation
  if (!data.pastExperience || typeof data.pastExperience !== "string") {
    errors.push("Past Experience is required");
  } else {
    const trimmed = data.pastExperience.trim();
    if (trimmed.length === 0) {
      errors.push("Past Experience cannot be empty");
    } else if (trimmed.length < 10) {
      errors.push("Past Experience must be at least 10 characters");
    } else if (trimmed.length > 2000) {
      errors.push("Past Experience is too long (maximum 2000 characters)");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize text to prevent injection attacks
 */
function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .substring(0, 2000); // Enforce max length
}

/**
 * Truncate text to Discord's field value limit (1024 characters)
 */
function truncateForDiscord(text: string, maxLength: number = 1024): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

const DISCORD_MESSAGE_FLAG_COMPONENTS_V2 = 1 << 15;

/**
 * Send application to Discord via webhook
 * Returns an object with success status and error details
 */
async function sendToDiscord(data: StaffApplicationData): Promise<{
  success: boolean;
  error?: string;
  discordError?: string;
}> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  // Validate webhook URL exists (only ever read server-side; never sent to client)
  if (!webhookUrl || webhookUrl.trim() === "") {
    const error = "DISCORD_WEBHOOK_URL is not set. Ensure .env.local exists in the project root (same folder as package.json), contains DISCORD_WEBHOOK_URL=your_url, and restart the dev server (npm run dev). .env.local is gitignored so the URL stays private.";
    console.error(`[Staff Application API] ${error}`);
    return {
      success: false,
      error: "Staff applications are not configured yet. Please try again later.",
      discordError: "Missing environment variable",
    };
  }

  // Validate webhook URL format
  if (!webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
    const error = "Invalid Discord webhook URL format. URL must start with https://discord.com/api/webhooks/";
    console.error(`[Staff Application API] ${error}`);
    return {
      success: false,
      error: "Server configuration error: Invalid webhook URL format.",
      discordError: "Invalid URL format",
    };
  }

  // Sanitize and truncate inputs for Discord
  const discordUsername = truncateForDiscord(sanitizeText(data.discordUsername), 1024);
  const discordId = sanitizeText(data.discordId);
  const applicationFor = truncateForDiscord(data.applicationFor.join(", "), 1024);
  const pastExperience = truncateForDiscord(sanitizeText(data.pastExperience), 1024);
  const submittedUnix = Math.floor(Date.now() / 1000);
  const submittedFull = `<t:${submittedUnix}:F>`;
  const submittedRelative = `<t:${submittedUnix}:R>`;
  const canMentionApplicant = /^\d{17,19}$/.test(discordId);
  const applicantMention = canMentionApplicant ? `<@${discordId}>` : "Applicant";
  const applicantProfile = canMentionApplicant
    ? `https://discord.com/users/${discordId}`
    : "https://discord.com/app";

  // Ensure no field is empty (Discord requirement)
  const usernameValue = discordUsername || "Not provided";
  const idValue = discordId || "Not provided";
  const applicationForValue = applicationFor || "Not provided";
  const experienceValue = pastExperience || "Not provided";

  const buildPayload = (mentionIssue?: string) => ({
    flags: DISCORD_MESSAGE_FLAG_COMPONENTS_V2,
    ...(canMentionApplicant
      ? {
          allowed_mentions: {
            users: [discordId],
            parse: [],
          },
        }
      : {}),
    components: [
      {
        type: 17,
        accent_color: 0x5865f2,
        components: [
          {
            type: 10,
            content:
              `## New Staff Application\n` +
              `Applicant: ${applicantMention}\n` +
              `Submitted: ${submittedFull} (${submittedRelative})\n` +
              (mentionIssue
                ? `Mention status: ${mentionIssue}\n`
                : "Mention status: Mention sent (if user is in the server).\n"),
          },
          {
            type: 14,
          },
          {
            type: 10,
            content:
              `**Applying For**\n${applicationForValue}\n\n` +
              `**Discord Username**\n${usernameValue}\n\n` +
              `**Discord ID**\n${idValue}\n\n` +
              `**Past Experience**\n${experienceValue}`,
          },
        ],
      },
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5,
            label: "Open Discord Profile",
            url: applicantProfile,
          },
        ],
      },
    ],
  });

  // Log request for debugging (without sensitive data)
  console.log(`[Staff Application API] Sending application to Discord webhook (ID: ${webhookUrl.split("/")[5]})`);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildPayload()),
    });

    const responseText = await response.text();
    let responseData: any = null;
    
    try {
      responseData = JSON.parse(responseText);
    } catch {
      // Response is not JSON, use text
    }

    if (!response.ok) {
      // Handle specific Discord error codes
      let errorMessage = "Failed to send application to Discord.";
      let discordError = `HTTP ${response.status}: ${response.statusText}`;
      const responseDetail = JSON.stringify(responseData || responseText).toLowerCase();
      const mentionRelatedError =
        response.status === 400 &&
        (responseDetail.includes("allowed_mentions") || responseDetail.includes("mention"));

      // If Discord rejects mention formatting, retry without mention allowance but still submit.
      if (mentionRelatedError) {
        const retry = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildPayload("Could not mention this user, but application was still submitted.")),
        });

        if (retry.ok) {
          console.warn("[Staff Application API] Mention failed; sent application without mention.");
          return { success: true };
        }
      }

      if (response.status === 401) {
        errorMessage = "Discord webhook authentication failed. The webhook URL may be invalid or expired.";
        discordError = "Unauthorized - Invalid or expired webhook token";
      } else if (response.status === 404) {
        errorMessage = "Discord webhook not found. The webhook may have been deleted.";
        discordError = "Not Found - Webhook does not exist";
      } else if (response.status === 429) {
        errorMessage = "Discord rate limit exceeded. Please try again in a few moments.";
        discordError = "Rate Limited - Too many requests to Discord";
      } else if (response.status === 400) {
        errorMessage = "Invalid request format sent to Discord.";
        discordError = `Bad Request: ${responseData?.message || responseText}`;
      }

      console.error(`[Staff Application API] Discord webhook error:`, {
        status: response.status,
        statusText: response.statusText,
        error: discordError,
        response: responseData || responseText,
      });

      return {
        success: false,
        error: errorMessage,
        discordError,
      };
    }

    console.log(`[Staff Application API] Successfully sent application to Discord`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Staff Application API] Error sending to Discord:`, {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return {
      success: false,
      error: "Network error while sending to Discord. Please check your connection and try again.",
      discordError: errorMessage,
    };
  }
}

const STAFF_APPLICATION_OPEN =
  process.env.STAFF_APPLICATION_OPEN === "true" ||
  process.env.STAFF_APPLICATION_OPEN === "1" ||
  process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
  process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  if (!STAFF_APPLICATION_OPEN) {
    return NextResponse.json(
      {
        success: false,
        error: "The staff application is currently unavailable for maintenance. Please check back later.",
      },
      { status: 503 }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    console.log(`[Staff Application API] Received request from IP: ${clientIP}`);

    // Check rate limit: max 3 submissions per 15 minutes per IP
    const rateLimit = checkRateLimit(clientIP, 3, 15 * 60 * 1000);

    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime);
      console.log(`[Staff Application API] Rate limit exceeded for IP: ${clientIP}, resets at: ${resetDate.toISOString()}`);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          resetTime: resetDate.toISOString(),
        },
        { status: 429 }
      );
    }

    console.log(`[Staff Application API] Rate limit check passed. Remaining: ${rateLimit.remaining}`);

    // Parse request body
    let body: StaffApplicationData;
    try {
      body = await request.json();
      console.log(`[Staff Application API] Parsed request body:`, {
        discordUsername: body.discordUsername?.substring(0, 20) + "...",
        discordId: body.discordId,
        applicationFor: body.applicationFor,
        pastExperienceLength: body.pastExperience?.length || 0,
      });
    } catch (error) {
      console.error(`[Staff Application API] Failed to parse request body:`, error);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request format. Please check your submission.",
        },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateApplication(body);
    if (!validation.valid) {
      console.log(`[Staff Application API] Validation failed:`, validation.errors);
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    console.log(`[Staff Application API] Validation passed, sending to Discord...`);

    // Send to Discord
    const discordResult = await sendToDiscord(body);

    if (!discordResult.success) {
      console.error(`[Staff Application API] Discord submission failed:`, discordResult);
      // Never send webhook URL or token to client; only generic error
      return NextResponse.json(
        {
          success: false,
          error: discordResult.error || "Failed to submit application. Please try again later.",
          ...(process.env.NODE_ENV === "development" && discordResult.discordError
            ? { discordError: discordResult.discordError }
            : {}),
        },
        { status: 500 }
      );
    }

    const duration = Date.now() - startTime;
    console.log(`[Staff Application API] Successfully processed application in ${duration}ms`);

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`[Staff Application API] Unexpected error after ${duration}ms:`, {
      error: errorMessage,
      stack: errorStack,
    });

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
