import { NextResponse } from "next/server";
import { createHash } from "crypto";

const COOKIE_NAME = "uv_maint";
const SALT = "uv-maint";

function getAuthToken(password: string): string {
  return createHash("sha256").update(password + SALT).digest("hex");
}

export async function POST(request: Request) {
  const password = process.env.MAINTENANCE_PASSWORD ?? "";
  if (!password) {
    return NextResponse.json({ error: "Maintenance auth not configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const submitted = body.password ?? "";
  if (submitted !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = getAuthToken(password);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
