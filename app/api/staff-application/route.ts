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
 * Send application to Discord via webhook
 */
async function sendToDiscord(data: StaffApplicationData): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL environment variable is not set");
    return false;
  }

  // Sanitize inputs
  const discordUsername = sanitizeText(data.discordUsername);
  const discordId = sanitizeText(data.discordId);
  const pastExperience = sanitizeText(data.pastExperience);

  // Create Discord embed
  const embed = {
    title: "New Unity Vault Staff Application",
    color: 0x5865f2, // Discord blurple color
    fields: [
      {
        name: "Discord Username",
        value: discordUsername || "Not provided",
        inline: false,
      },
      {
        name: "Discord ID",
        value: discordId || "Not provided",
        inline: false,
      },
      {
        name: "Past Experience",
        value: pastExperience || "Not provided",
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: "Unity Vault • Staff Applications",
    },
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error(`Discord webhook error: ${response.status} ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending to Discord:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit: max 3 submissions per 15 minutes per IP
    const rateLimit = checkRateLimit(clientIP, 3, 15 * 60 * 1000);

    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          resetTime: resetDate.toISOString(),
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body: StaffApplicationData;
    try {
      body = await request.json();
    } catch (error) {
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
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Send to Discord
    const sent = await sendToDiscord(body);

    if (!sent) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit application. Please try again later.",
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in staff application API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
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
