import { NextResponse } from "next/server";

export async function POST() {
  const botUrl = process.env.BOT_API_URL;
  const secret = process.env.API_SECRET;

  if (botUrl && secret) {
    // Fire and forget — do not await or block response
    fetch(`${botUrl}/api/admin/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-secret": secret,
      },
    }).catch(() => undefined);
  }

  return NextResponse.json({ ok: true });
}
