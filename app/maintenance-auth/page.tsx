"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MaintenanceAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/maintenance-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Invalid password");
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <h1 className="text-xl font-semibold tracking-tight text-white mb-6 text-center">
          Staff access
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="password" className="block text-sm text-[#a3a3a3]">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-lg border border-[#262626] bg-[#141414] px-4 py-2.5 text-white placeholder:text-[#525252] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
            placeholder="Enter password"
            required
            disabled={loading}
          />
          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50 transition-colors"
          >
            {loading ? "Checking…" : "Continue"}
          </button>
        </form>
        <p className="text-xs text-[#737373] text-center mt-6">
          <a href="/maintenance" className="text-[#525252] hover:text-[#a3a3a3] transition-colors">
            ← Back to maintenance notice
          </a>
        </p>
      </div>
    </div>
  );
}
