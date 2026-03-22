import { NextResponse } from "next/server";

export const maxDuration = 10;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { username, discordId, age, timezone, reason, experience, roleApplying } = body as Record<string, string>;

  if (!username || !discordId || !age || !timezone || !reason || !roleApplying) {
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  const botUrl = process.env.BOT_API_URL;
  const secret = process.env.API_SECRET;

  if (!botUrl || !secret) {
    return NextResponse.json(
      { success: false, error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${botUrl}/api/application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": secret,
      },
      body: JSON.stringify({
        username,
        discordId,
        age,
        timezone,
        reason,
        experience: experience ?? "",
        roleApplying,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to reach bot." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reach bot." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
