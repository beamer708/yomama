import { prisma } from "@/lib/db";

export interface DailyStat {
  date: string;
  views: number;
  uniqueVisitors: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ host: string; visits: number }>;
  byDevice: Array<{ device: string; views: number }>;
  byCountry: Array<{ country: string; views: number }>;
  daily: DailyStat[];
}

function toDayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function getAnalyticsSummary(days: number = 30): Promise<AnalyticsSummary> {
  const start = new Date();
  start.setUTCDate(start.getUTCDate() - days + 1);
  start.setUTCHours(0, 0, 0, 0);

  const events = await prisma.analyticsEvent.findMany({
    where: {
      createdAt: { gte: start },
      isBot: false,
    },
    select: {
      createdAt: true,
      path: true,
      referrerHost: true,
      deviceType: true,
      country: true,
      ipHash: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const pageCounts = new Map<string, number>();
  const referrerCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();
  const globalUniqueVisitors = new Set<string>();
  const dailyMap = new Map<string, { views: number; uniqueVisitors: Set<string> }>();

  for (const event of events) {
    pageCounts.set(event.path, (pageCounts.get(event.path) ?? 0) + 1);
    if (event.referrerHost) {
      referrerCounts.set(event.referrerHost, (referrerCounts.get(event.referrerHost) ?? 0) + 1);
    }
    deviceCounts.set(event.deviceType, (deviceCounts.get(event.deviceType) ?? 0) + 1);
    if (event.country) {
      countryCounts.set(event.country, (countryCounts.get(event.country) ?? 0) + 1);
    }

    if (event.ipHash) {
      globalUniqueVisitors.add(event.ipHash);
    }

    const dayKey = toDayKey(event.createdAt);
    const current = dailyMap.get(dayKey) ?? { views: 0, uniqueVisitors: new Set<string>() };
    current.views += 1;
    if (event.ipHash) {
      current.uniqueVisitors.add(event.ipHash);
    }
    dailyMap.set(dayKey, current);
  }

  const daily: DailyStat[] = [];
  for (let i = 0; i < days; i += 1) {
    const day = new Date(start);
    day.setUTCDate(start.getUTCDate() + i);
    const key = toDayKey(day);
    const value = dailyMap.get(key);
    daily.push({
      date: key,
      views: value?.views ?? 0,
      uniqueVisitors: value?.uniqueVisitors.size ?? 0,
    });
  }

  return {
    totalViews: events.length,
    uniqueVisitors: globalUniqueVisitors.size,
    topPages: [...pageCounts.entries()]
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
    topReferrers: [...referrerCounts.entries()]
      .map(([host, visits]) => ({ host, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10),
    byDevice: [...deviceCounts.entries()]
      .map(([device, views]) => ({ device, views }))
      .sort((a, b) => b.views - a.views),
    byCountry: [...countryCounts.entries()]
      .map(([country, views]) => ({ country, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
    daily,
  };
}
