"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import Icon from "@/components/Icon";

const staffApplicationOpen =
  process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
  process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

export default function StaffApplicationPage() {
  const [discordUsername, setDiscordUsername] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [communityTeam, setCommunityTeam] = useState(false);
  const [betaTester, setBetaTester] = useState(false);
  const [pastExperience, setPastExperience] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedRoles = useMemo(() => {
    const roles: string[] = [];
    if (communityTeam) roles.push("Community Team");
    if (betaTester) roles.push("Beta Tester");
    return roles;
  }, [communityTeam, betaTester]);

  const canSubmit =
    discordUsername.trim().length > 0 &&
    discordId.trim().length > 0 &&
    selectedRoles.length > 0 &&
    pastExperience.trim().length >= 10 &&
    !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/staff-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordUsername: discordUsername.trim(),
          discordId: discordId.trim(),
          applicationFor: selectedRoles,
          pastExperience: pastExperience.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        error?: string;
        errors?: string[];
      };

      if (!res.ok || !data.success) {
        if (Array.isArray(data.errors) && data.errors.length > 0) {
          setError(data.errors.join(" "));
        } else {
          setError(data.error || "We could not submit your application. Try again.");
        }
        return;
      }

      setSuccess(data.message || "Application submitted successfully.");
      setDiscordUsername("");
      setDiscordId("");
      setCommunityTeam(false);
      setBetaTester(false);
      setPastExperience("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!staffApplicationOpen) {
    return (
      <div className="py-16 sm:py-20">
        <div className="page-container max-w-2xl">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 sm:p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500">
              <Icon name="settings" className="text-3xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Staff Application Closed
            </h1>
            <p className="mt-4 text-foreground/80 max-w-md mx-auto">
              Applications are currently closed. Join Discord for updates on when Community Team and Beta Tester applications reopen.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/support" className="btn-ghost">
                <Icon name="arrow-right" className="text-base" />
                Back to Support
              </Link>
              <a
                href="https://discord.gg/3qpVpCBwj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Icon name="discord" className="text-lg" />
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-10">
          <h1 className="section-heading">Community Team &amp; Beta Tester Application</h1>
          <p className="section-subheading mt-3">
            Apply for Community Team, Beta Tester, or both. Use the form below.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">What the Community Team does</h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li>- Find strong servers for regular and paid partnership opportunities.</li>
            <li>- Help source giveaway/ad opportunities funded by b3amer.</li>
            <li>- Answer support tickets in the Discord server.</li>
            <li>- Help manage the Discord and enforce TOS.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <div>
            <label htmlFor="discord-username" className="mb-2 block text-sm font-medium text-foreground">
              Discord Username
            </label>
            <input
              id="discord-username"
              type="text"
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              placeholder="username or username#1234"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={100}
              required
            />
          </div>

          <div>
            <label htmlFor="discord-id" className="mb-2 block text-sm font-medium text-foreground">
              Discord ID
            </label>
            <input
              id="discord-id"
              type="text"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              placeholder="17-19 digit Discord ID"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-foreground">Apply for</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/90">
                <input
                  type="checkbox"
                  checked={communityTeam}
                  onChange={(e) => setCommunityTeam(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary/30"
                />
                Community Team
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/90">
                <input
                  type="checkbox"
                  checked={betaTester}
                  onChange={(e) => setBetaTester(e.target.checked)}
                  className="h-4 w-4 rounded border-border bg-card text-primary focus:ring-primary/30"
                />
                Beta Tester
              </label>
            </div>
            <p className="mt-2 text-xs text-foreground/60">
              You can choose one or both roles.
            </p>
          </fieldset>

          <div>
            <label htmlFor="past-experience" className="mb-2 block text-sm font-medium text-foreground">
              Past Experience
            </label>
            <textarea
              id="past-experience"
              value={pastExperience}
              onChange={(e) => setPastExperience(e.target.value)}
              placeholder="Tell us about moderation, support, partnerships, testing, or community experience."
              rows={6}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
              minLength={10}
              maxLength={2000}
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? "Submitting..." : "Submit application"}
              <Icon name="check" className="text-base" />
            </button>
            <a
              href="https://discord.gg/3qpVpCBwj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Icon name="discord" className="text-base" />
              Join Discord
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
