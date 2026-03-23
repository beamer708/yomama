import { NextResponse } from "next/server";

export const maxDuration = 10;

const EMPTY_STATS = {
  tickets: { open: 0, closed: 0, total: 0 },
  applications: { pending: 0, accepted: 0, denied: 0, total: 0 },
  suggestions: { open: 0, approved: 0, declined: 0, total: 0, upvotes: 0, downvotes: 0 },
  server: { memberCount: 0 },
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
    return NextResponse.json(EMPTY_STATS);
  }

  try {
    const res = await fetch(`${botUrl}/api/admin/stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": secret,
      },
    });

    if (!res.ok) return NextResponse.json(EMPTY_STATS);

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(EMPTY_STATS);
  }
}
