import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOptionalEnv } from "@/lib/env";
import { checkRateLimit, getClientIP } from "@/lib/rateLimit";
import {
  extractReferrerHost,
  getCountryHeader,
  getDeviceType,
  hashIpAddress,
  isBotTraffic,
  normalizePath,
} from "@/lib/analytics";

const MAX_BODY_BYTES = 2048;

export async function POST(request: NextRequest) {
  try {
    const contentLengthHeader = request.headers.get("content-length");
    const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;
    if (contentLength > MAX_BODY_BYTES) {
      return new NextResponse(null, { status: 204 });
    }

    const dnt = request.headers.get("dnt");
    if (dnt === "1") {
      return new NextResponse(null, { status: 204 });
    }

    const ip = getClientIP(request);
    const rateLimit = checkRateLimit(`analytics:${ip}`, 600, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return new NextResponse(null, { status: 202 });
    }

    const rawBody = await request.text();
    if (!rawBody || rawBody.length > MAX_BODY_BYTES) {
      return new NextResponse(null, { status: 204 });
    }

    const parsed = JSON.parse(rawBody) as { path?: string; referrer?: string | null };
    const path = normalizePath(parsed.path ?? "");
    if (!path) {
      return new NextResponse(null, { status: 204 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const isBot = isBotTraffic(userAgent);
    const referrerFromPayload = extractReferrerHost(parsed.referrer);
    const referrerFromHeader = extractReferrerHost(request.headers.get("referer"));
    const referrerHost = referrerFromPayload ?? referrerFromHeader;

    const salt = getOptionalEnv("ANALYTICS_SALT") ?? "unity-vault-analytics-salt";
    const ipHash = hashIpAddress(ip, salt);

    await prisma.analyticsEvent.create({
      data: {
        path,
        referrerHost,
        country: getCountryHeader(request.headers),
        deviceType: getDeviceType(userAgent),
        ipHash,
        isBot,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    // Keep analytics ingestion failure silent for visitors.
    return new NextResponse(null, { status: 204 });
  }
}
