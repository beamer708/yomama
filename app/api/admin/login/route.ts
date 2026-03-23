import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { password } = body as { password?: string };

  if (!password) {
    return NextResponse.json({ success: false, error: "No password provided." }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ success: false, error: "Admin password not configured." }, { status: 503 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ success: false, error: "Incorrect password." }, { status: 401 });
  }

  return NextResponse.json({ success: true, token: adminPassword });
}
