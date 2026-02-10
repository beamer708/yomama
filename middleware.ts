import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "uv_maint";
const SALT = "uv-maint";

async function getAuthToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + SALT);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const raw = process.env.NEXT_PUBLIC_MAINTENANCE_MODE ?? process.env.MAINTENANCE_MODE ?? "";
  const isMaintenance = raw.trim().toLowerCase() === "true" || raw.trim() === "1";
  if (!isMaintenance) {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  if (path === "/maintenance" || path === "/maintenance-auth" || path.startsWith("/api/maintenance-auth")) {
    return NextResponse.next();
  }

  const password = process.env.MAINTENANCE_PASSWORD ?? "";
  const expectedToken = await getAuthToken(password);
  const cookieToken = request.cookies.get(COOKIE_NAME)?.value;

  if (cookieToken === expectedToken) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  url.searchParams.set("from", path);
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|UnityLogo.svg).*)"],
};
