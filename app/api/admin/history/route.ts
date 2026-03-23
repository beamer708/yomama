import { NextResponse } from "next/server";

export const maxDuration = 10;

const EMPTY_HISTORY = {
  recentApplications: [],
  recentSuggestions: [],
};

function unauthorized() {
  return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
}

export async function POST(request: Request) {
  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_PASSWORD) return unauthorized();

  const botUrl = process.env.BOT_API_URL;
  const secret = process.env.API_SECRET;

  if (!botUrl || !secret) {
    return NextResponse.json(EMPTY_HISTORY);
  }

  try {
    const res = await fetch(`${botUrl}/api/admin/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": secret,
      },
    });

    if (!res.ok) return NextResponse.json(EMPTY_HISTORY);

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(EMPTY_HISTORY);
  }
}
