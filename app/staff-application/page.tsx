"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Icon from "@/components/Icon";

const staffApplicationOpen =
  process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
  process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

const IMPACT_POINTS = [
  {
    icon: "arrow-trend-up" as const,
    title: "Grow partnerships",
    detail: "Find quality servers for regular and paid partnership opportunities.",
  },
  {
    icon: "message-sms" as const,
    title: "Support the community",
    detail: "Answer support tickets and help members quickly and clearly.",
  },
  {
    icon: "settings" as const,
    title: "Keep standards high",
    detail: "Help moderate the server and enforce TOS consistently.",
  },
];

type FieldErrors = Partial<Record<"username" | "discordId" | "age" | "timezone" | "reason" | "roleApplying", string>>;

export default function StaffApplicationPage() {
  const [username, setUsername] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [age, setAge] = useState("");
  const [timezone, setTimezone] = useState("");
  const [reason, setReason] = useState("");
  const [experience, setExperience] = useState("");
  const [roleApplying, setRoleApplying] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!username.trim()) errors.username = "Username is required.";
    if (!discordId.trim()) errors.discordId = "Discord ID is required.";
    if (!age.trim()) errors.age = "Age is required.";
    if (!timezone.trim()) errors.timezone = "Timezone is required.";
    if (!reason.trim()) errors.reason = "Please tell us why you want to join.";
    if (!roleApplying) errors.roleApplying = "Please select a role.";
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          discordId: discordId.trim(),
          age: age.trim(),
          timezone: timezone.trim(),
          reason: reason.trim(),
          experience: experience.trim(),
          roleApplying,
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again or contact support.");
        return;
      }

      setSuccess("Your application has been submitted. Check your Discord DMs for confirmation.");
      setUsername("");
      setDiscordId("");
      setAge("");
      setTimezone("");
      setReason("");
      setExperience("");
      setRoleApplying("");
    } catch {
      setError("Something went wrong. Please try again or contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!staffApplicationOpen) {
    return (
      <div className="py-16 sm:py-20">
        <div className="page-container max-w-2xl">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500">
              <Icon name="settings" className="text-3xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Staff Application Closed
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Applications are currently closed. Join Discord for updates on when Community Team and Beta Tester applications reopen.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/support" className="btn-ghost">
                <Icon name="arrow-right" className="text-base" />
                Back to Support
              </Link>
              <a
                href="https://discord.gg/HjcqH2djjC"
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
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="users-alt" className="text-2xl" />
          </div>
          <h1 className="section-heading">Community Team &amp; Beta Tester Application</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Your work helps keep Unity Vault organized, responsive, and growing. Apply for one role or both in under 2 minutes.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Icon name="clock" className="text-xs" />
              Quick process
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Icon name="users" className="text-xs" />
              Community impact
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Icon name="check" className="text-xs" />
              Clear expectations
            </span>
          </div>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {IMPACT_POINTS.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card/85 p-4">
              <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon name={item.icon} className="text-base" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">{item.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/80 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="users" className="text-base" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Community Team</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Partnerships, giveaways/ads sourcing, support tickets, moderation, and TOS enforcement.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/80 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="computer" className="text-base" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Beta Tester</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Test upcoming features, report bugs clearly, and help improve user experience before release.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-3xl border border-border bg-card/85 p-6 sm:p-8">
          <div className="rounded-2xl border border-border/70 bg-card/75 p-4">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Simple process:</span> fill in your details, select a role, share your experience, submit.
            </p>
          </div>

          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
              Full Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username or username#1234"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={100}
            />
            {fieldErrors.username && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="discord-id" className="mb-2 block text-sm font-medium text-foreground">
              Discord User ID
            </label>
            <input
              id="discord-id"
              type="text"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
              placeholder="17-19 digit Discord ID"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {fieldErrors.discordId && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.discordId}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="age" className="mb-2 block text-sm font-medium text-foreground">
                Age
              </label>
              <input
                id="age"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 17"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                maxLength={10}
              />
              {fieldErrors.age && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.age}</p>
              )}
            </div>
            <div>
              <label htmlFor="timezone" className="mb-2 block text-sm font-medium text-foreground">
                Timezone
              </label>
              <input
                id="timezone"
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                placeholder="e.g. EST, GMT+1"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                maxLength={50}
              />
              {fieldErrors.timezone && (
                <p className="mt-1 text-xs text-red-400">{fieldErrors.timezone}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="mb-2 block text-sm font-medium text-foreground">
              Why do you want to join the team?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us what motivates you to apply and what you'd bring to the team."
              rows={5}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
              maxLength={2000}
            />
            {fieldErrors.reason && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.reason}</p>
            )}
          </div>

          <div>
            <label htmlFor="experience" className="mb-2 block text-sm font-medium text-foreground">
              Previous Experience{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Tell us about moderation, support, partnerships, testing, or community experience."
              rows={5}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
              maxLength={2000}
            />
          </div>

          <div>
            <label htmlFor="role-applying" className="mb-2 block text-sm font-medium text-foreground">
              Role Applying For
            </label>
            <select
              id="role-applying"
              value={roleApplying}
              onChange={(e) => setRoleApplying(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a role...</option>
              <option value="Community Team">Community Team</option>
              <option value="Beta Tester">Beta Tester</option>
            </select>
            {fieldErrors.roleApplying && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.roleApplying}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitting ? "Submitting..." : "Submit application"}
              <Icon name="check" className="text-base" />
            </button>
            <a
              href="https://discord.gg/HjcqH2djjC"
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
