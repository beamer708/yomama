"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BotStats {
  tickets: { open: number; closed: number; total: number };
  applications: { pending: number; accepted: number; denied: number; total: number };
  suggestions: { open: number; approved: number; declined: number; total: number; upvotes: number; downvotes: number };
  server: { memberCount: number };
  visits?: { total: number };
}

interface ApplicationEntry {
  username: string;
  roleApplying: string;
  status: string;
  timestamp: string;
}

interface SuggestionEntry {
  username: string;
  title: string;
  category: string;
  status: string;
  upvotes: number;
  downvotes: number;
  timestamp: string;
}

interface HistoryData {
  recentApplications: ApplicationEntry[];
  recentSuggestions: SuggestionEntry[];
}

interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
  topReferrers: { host: string; visits: number }[];
  byDevice: { device: string; views: number }[];
  byCountry: { country: string; views: number }[];
  daily: { date: string; views: number; uniqueVisitors: number }[];
}

const EMPTY_STATS: BotStats = {
  tickets: { open: 0, closed: 0, total: 0 },
  applications: { pending: 0, accepted: 0, denied: 0, total: 0 },
  suggestions: { open: 0, approved: 0, declined: 0, total: 0, upvotes: 0, downvotes: 0 },
  server: { memberCount: 0 },
  visits: { total: 0 },
};

const EMPTY_HISTORY: HistoryData = { recentApplications: [], recentSuggestions: [] };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

function statusColor(status: string) {
  const s = status?.toLowerCase() ?? "";
  if (s === "accepted" || s === "approved") return "text-green-400/80";
  if (s === "denied" || s === "declined") return "text-red-400/80";
  return "text-foreground/50";
}

function formatDate(ts: string) {
  if (!ts || ts === "Unknown") return "—";
  const d = new Date(ts);
  return isNaN(d.getTime()) ? ts : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ─── Count-up hook ───────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean, duration = 800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    if (target === 0) { setCount(0); return; }
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return count;
}

// ─── Stat card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  const displayed = useCountUp(value, !loading);
  return (
    <div className="rounded-xl border border-border bg-card/85 p-5 animate-on-scroll">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      {loading ? (
        <div className="mt-2 h-8 w-16 animate-pulse rounded bg-card-hover" />
      ) : (
        <p className="mt-2 text-3xl font-semibold text-foreground tabular-nums">{fmt(displayed)}</p>
      )}
    </div>
  );
}

function InlineStatItem({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  const displayed = useCountUp(value, !loading);
  return (
    <div className="flex flex-col items-center gap-1">
      {loading ? (
        <div className="h-7 w-12 animate-pulse rounded bg-card-hover" />
      ) : (
        <p className="text-2xl font-semibold text-foreground tabular-nums">{fmt(displayed)}</p>
      )}
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        onSuccess(data.token);
      } else {
        setError(data.error ?? "Incorrect password.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="w-full max-w-sm px-4">
        <div className="rounded-3xl border border-border bg-card/85 p-8">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your password to continue.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="btn-primary w-full justify-center disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [authState, setAuthState] = useState<"checking" | "login" | "dashboard">("checking");
  const [token, setToken] = useState("");

  const [statsLoading, setStatsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const [statsError, setStatsError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const [stats, setStats] = useState<BotStats>(EMPTY_STATS);
  const [history, setHistory] = useState<HistoryData>(EMPTY_HISTORY);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  // ── Auth check on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) {
      setToken(stored);
      setAuthState("dashboard");
    } else {
      setAuthState("login");
    }
  }, []);

  // ── Data fetching
  const fetchAll = useCallback(async (t: string) => {
    setStatsLoading(true);
    setHistoryLoading(true);
    setAnalyticsLoading(true);
    setStatsError(null);
    setHistoryError(null);
    setAnalyticsError(null);

    const headers = { "Content-Type": "application/json", "x-admin-token": t };

    const [statsResult, historyResult, analyticsResult] = await Promise.allSettled([
      fetch("/api/admin/stats", { method: "POST", headers }),
      fetch("/api/admin/history", { method: "POST", headers }),
      fetch("/api/admin/analytics", { headers: { "x-admin-token": t } }),
    ]);

    if (statsResult.status === "fulfilled" && statsResult.value.ok) {
      try { setStats(await statsResult.value.json()); } catch { setStatsError("Failed to parse stats."); }
    } else {
      setStatsError("Could not load stats.");
    }
    setStatsLoading(false);

    if (historyResult.status === "fulfilled" && historyResult.value.ok) {
      try { setHistory(await historyResult.value.json()); } catch { setHistoryError("Failed to parse history."); }
    } else {
      setHistoryError("Could not load history.");
    }
    setHistoryLoading(false);

    if (analyticsResult.status === "fulfilled" && analyticsResult.value.ok) {
      try { setAnalytics(await analyticsResult.value.json()); } catch { setAnalyticsError("Failed to parse analytics."); }
    } else {
      setAnalyticsError("Could not load analytics.");
    }
    setAnalyticsLoading(false);
  }, []);

  useEffect(() => {
    if (authState === "dashboard" && token) {
      void fetchAll(token);
    }
  }, [authState, token, fetchAll]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAll(token);
    setRefreshing(false);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("admin_token");
    setToken("");
    setAuthState("login");
  };

  const handleLogin = (t: string) => {
    sessionStorage.setItem("admin_token", t);
    setToken(t);
    setAuthState("dashboard");
  };

  // ── Render states
  if (authState === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-xl border-2 border-primary/30 border-t-primary" />
      </div>
    );
  }

  if (authState === "login") {
    return <LoginForm onSuccess={handleLogin} />;
  }

  // ── Dashboard
  return (
    <div className="py-10 sm:py-14">
      <div className="page-container max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-border/70 bg-card/80 p-6 sm:p-8">
          <div>
            <h1 className="section-heading">Admin Dashboard</h1>
            <p className="section-subheading mt-1">Unity Vault operations overview.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing || statsLoading}
              className="btn-secondary disabled:pointer-events-none disabled:opacity-50"
            >
              {refreshing ? "Refreshing…" : "Refresh Data"}
            </button>
            <button onClick={handleSignOut} className="btn-ghost">
              Sign Out
            </button>
          </div>
        </div>

        {/* ── SECTION 1: Stats Overview ────────────────────────────── */}
        <section className="mb-6">
          {statsError && (
            <p className="mb-3 text-sm text-red-400/80">{statsError}</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Total Tickets" value={stats.tickets.total} loading={statsLoading} />
            <StatCard label="Open Tickets" value={stats.tickets.open} loading={statsLoading} />
            <StatCard label="Total Applications" value={stats.applications.total} loading={statsLoading} />
            <StatCard label="Pending Applications" value={stats.applications.pending} loading={statsLoading} />
            <StatCard label="Total Suggestions" value={stats.suggestions.total} loading={statsLoading} />
            <StatCard label="Server Members" value={stats.server.memberCount} loading={statsLoading} />
          </div>
        </section>

        {/* ── SECTION 2: Suggestion Engagement ─────────────────────── */}
        <section className="mb-6">
          <div className="rounded-xl border border-border bg-card/85 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Suggestion Engagement
            </h2>
            <div className="flex flex-wrap justify-around gap-6">
              <InlineStatItem label="Total Upvotes" value={stats.suggestions.upvotes} loading={statsLoading} />
              <InlineStatItem label="Total Downvotes" value={stats.suggestions.downvotes} loading={statsLoading} />
              <InlineStatItem label="Approved" value={stats.suggestions.approved} loading={statsLoading} />
              <InlineStatItem label="Website Visits" value={stats.visits?.total ?? 0} loading={statsLoading} />
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Recent Applications ───────────────────────── */}
        <section className="mb-6">
          <div className="rounded-xl border border-border bg-card/85 p-5">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Applications</h2>
            {historyError && <p className="text-sm text-red-400/80">{historyError}</p>}
            {historyLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-lg bg-card-hover" />
                ))}
              </div>
            ) : history.recentApplications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No applications yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-3 py-2 font-medium">Username</th>
                      <th className="px-3 py-2 font-medium">Role</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.recentApplications.map((app, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="px-3 py-2 text-foreground">{app.username}</td>
                        <td className="px-3 py-2 text-muted-foreground">{app.roleApplying}</td>
                        <td className={`px-3 py-2 capitalize ${statusColor(app.status)}`}>
                          {app.status || "pending"}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">{formatDate(app.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 4: Recent Suggestions ────────────────────────── */}
        <section className="mb-6">
          <div className="rounded-xl border border-border bg-card/85 p-5">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Suggestions</h2>
            {historyError && <p className="text-sm text-red-400/80">{historyError}</p>}
            {historyLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-lg bg-card-hover" />
                ))}
              </div>
            ) : history.recentSuggestions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No suggestions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-3 py-2 font-medium">Username</th>
                      <th className="px-3 py-2 font-medium">Title</th>
                      <th className="px-3 py-2 font-medium">Category</th>
                      <th className="px-3 py-2 font-medium">Votes</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.recentSuggestions.map((sug, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="px-3 py-2 text-foreground">{sug.username}</td>
                        <td className="px-3 py-2 text-muted-foreground max-w-[180px] truncate">{sug.title}</td>
                        <td className="px-3 py-2 text-muted-foreground">{sug.category}</td>
                        <td className="px-3 py-2 text-muted-foreground tabular-nums">
                          <span className="text-green-400/70">+{sug.upvotes ?? 0}</span>
                          {" / "}
                          <span className="text-red-400/70">-{sug.downvotes ?? 0}</span>
                        </td>
                        <td className={`px-3 py-2 capitalize ${statusColor(sug.status)}`}>
                          {sug.status || "open"}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">{formatDate(sug.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ── Website Analytics (existing Prisma data) ─────────────── */}
        <section className="mb-6">
          <div className="rounded-xl border border-border bg-card/85 p-5">
            <h2 className="mb-1 text-lg font-semibold text-foreground">Website Analytics</h2>
            <p className="mb-4 text-xs text-muted-foreground">Last 30 days · cookie-less, first-party tracking</p>
            {analyticsError && <p className="text-sm text-red-400/80">{analyticsError}</p>}
            {analyticsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-lg bg-card-hover" />
                ))}
              </div>
            ) : analytics ? (
              <>
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Total page views</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">{fmt(analytics.totalViews)}</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Unique visitors</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">{fmt(analytics.uniqueVisitors)}</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg views / day</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">{fmt(Math.round(analytics.totalViews / 30))}</p>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-foreground">Top pages</h3>
                    <ul className="space-y-1.5 text-sm">
                      {analytics.topPages.length === 0 ? (
                        <li className="text-muted-foreground">No data yet.</li>
                      ) : analytics.topPages.map((p) => (
                        <li key={p.path} className="flex items-center justify-between gap-4 rounded-lg bg-card-hover/60 px-3 py-1.5">
                          <span className="truncate text-foreground">{p.path}</span>
                          <span className="text-muted-foreground">{fmt(p.views)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-foreground">By device</h3>
                    <ul className="space-y-1.5 text-sm">
                      {analytics.byDevice.length === 0 ? (
                        <li className="text-muted-foreground">No data yet.</li>
                      ) : analytics.byDevice.map((d) => (
                        <li key={d.device} className="flex items-center justify-between gap-4 rounded-lg bg-card-hover/60 px-3 py-1.5">
                          <span className="capitalize text-foreground">{d.device}</span>
                          <span className="text-muted-foreground">{fmt(d.views)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No analytics data.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
