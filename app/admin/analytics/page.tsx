import type { Metadata } from "next";
import { getAnalyticsSummary } from "@/lib/admin-analytics";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminAnalyticsPage() {
  const summary = await getAnalyticsSummary(30);

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-6xl">
        <div className="mb-8">
          <h1 className="section-heading">Analytics Dashboard</h1>
          <p className="section-subheading">
            Last 30 days. Cookie-less, first-party page view tracking.
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-foreground/70">Total page views</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{formatNumber(summary.totalViews)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-foreground/70">Unique visitors</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{formatNumber(summary.uniqueVisitors)}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-foreground/70">Avg views / day</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {formatNumber(Math.round(summary.totalViews / 30))}
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">Top pages</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {summary.topPages.length === 0 ? (
                <li className="text-foreground/70">No data yet.</li>
              ) : (
                summary.topPages.map((item) => (
                  <li key={item.path} className="flex items-center justify-between gap-4 rounded-lg bg-card-hover px-3 py-2">
                    <span className="truncate text-foreground">{item.path}</span>
                    <span className="text-foreground/80">{formatNumber(item.views)}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">Top referrers</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {summary.topReferrers.length === 0 ? (
                <li className="text-foreground/70">No referrer data yet.</li>
              ) : (
                summary.topReferrers.map((item) => (
                  <li key={item.host} className="flex items-center justify-between gap-4 rounded-lg bg-card-hover px-3 py-2">
                    <span className="truncate text-foreground">{item.host}</span>
                    <span className="text-foreground/80">{formatNumber(item.visits)}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">By device</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {summary.byDevice.length === 0 ? (
                <li className="text-foreground/70">No device data yet.</li>
              ) : (
                summary.byDevice.map((item) => (
                  <li key={item.device} className="flex items-center justify-between gap-4 rounded-lg bg-card-hover px-3 py-2">
                    <span className="capitalize text-foreground">{item.device}</span>
                    <span className="text-foreground/80">{formatNumber(item.views)}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">By country</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {summary.byCountry.length === 0 ? (
                <li className="text-foreground/70">No country data yet.</li>
              ) : (
                summary.byCountry.map((item) => (
                  <li key={item.country} className="flex items-center justify-between gap-4 rounded-lg bg-card-hover px-3 py-2">
                    <span className="uppercase text-foreground">{item.country}</span>
                    <span className="text-foreground/80">{formatNumber(item.views)}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold text-foreground">Daily trend (last 30 days)</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-foreground/70">
                  <th className="px-3 py-2 font-medium">Date</th>
                  <th className="px-3 py-2 font-medium">Views</th>
                  <th className="px-3 py-2 font-medium">Unique visitors</th>
                </tr>
              </thead>
              <tbody>
                {summary.daily.map((day) => (
                  <tr key={day.date} className="border-t border-border/70">
                    <td className="px-3 py-2 text-foreground">{day.date}</td>
                    <td className="px-3 py-2 text-foreground/80">{formatNumber(day.views)}</td>
                    <td className="px-3 py-2 text-foreground/80">{formatNumber(day.uniqueVisitors)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
