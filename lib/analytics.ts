import { createHash } from "crypto";

const BOT_UA_RE =
  /bot|crawl|spider|slurp|lighthouse|headless|monitor|pingdom|preview|facebookexternalhit|whatsapp|discordbot|telegrambot/i;

export function normalizePath(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed.startsWith("/")) return null;
  const pathOnly = trimmed.split("?")[0];
  if (!pathOnly || pathOnly.length > 300) return null;
  return pathOnly;
}

export function extractReferrerHost(input: string | null | undefined): string | null {
  if (!input) return null;
  try {
    const hostname = new URL(input).hostname.toLowerCase();
    return hostname || null;
  } catch {
    return null;
  }
}

export function getDeviceType(userAgent: string): "mobile" | "tablet" | "desktop" | "unknown" {
  if (!userAgent) return "unknown";
  const ua = userAgent.toLowerCase();
  if (/(ipad|tablet)/.test(ua)) return "tablet";
  if (/(mobi|iphone|android)/.test(ua)) return "mobile";
  return "desktop";
}

export function isBotTraffic(userAgent: string): boolean {
  if (!userAgent) return false;
  return BOT_UA_RE.test(userAgent);
}

export function hashIpAddress(ip: string, salt: string): string | null {
  if (!ip || ip === "unknown") return null;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getCountryHeader(headers: Headers): string | null {
  const country =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    headers.get("x-country-code");

  if (!country) return null;
  const cleaned = country.trim().toUpperCase();
  if (cleaned.length < 2 || cleaned.length > 4) return null;
  return cleaned;
}
