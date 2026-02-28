"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

type ResourceType = "YouTube Video" | "Website Tool" | "Guide / Document" | "Other";

export default function ResourceSuggestionPage() {
  const [discordUsername, setDiscordUsername] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceType, setResourceType] = useState<ResourceType>("YouTube Video");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    discordUsername.trim().length > 0 &&
    discordId.trim().length > 0 &&
    resourceTitle.trim().length > 0 &&
    resourceUrl.trim().length > 0 &&
    reason.trim().length >= 10 &&
    !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/resource-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordUsername: discordUsername.trim(),
          discordId: discordId.trim(),
          resourceTitle: resourceTitle.trim(),
          resourceUrl: resourceUrl.trim(),
          resourceType,
          reason: reason.trim(),
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
          setError(data.error || "We could not submit your suggestion. Try again.");
        }
        return;
      }

      setSuccess(
        data.message ||
          "Suggestion submitted. It was sent to Discord for discussion and approval."
      );
      setDiscordUsername("");
      setDiscordId("");
      setResourceTitle("");
      setResourceUrl("");
      setResourceType("YouTube Video");
      setReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="sparkles" className="text-2xl" />
          </div>
          <h1 className="section-heading">Suggest a Resource</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Share a useful resource for Unity Vault. Your suggestion is sent to our Discord review
            channel for discussion and approval.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Icon name="discord" className="text-xs" />
              Discord review process
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Icon name="clock" className="text-xs" />
              Quick submission
            </span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card/85 p-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Important:</span> Join the Discord server
            to follow the result of your suggestion. Approval updates are posted there.
          </p>
          <a
            href="https://discord.gg/3qpVpCBwj"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            <Icon name="discord" className="text-base" />
            Join Discord
            <Icon name="up-right-from-square" className="text-xs" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-border bg-card/85 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
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
          </div>

          <div>
            <label htmlFor="resource-title" className="mb-2 block text-sm font-medium text-foreground">
              Resource Title
            </label>
            <input
              id="resource-title"
              type="text"
              value={resourceTitle}
              onChange={(e) => setResourceTitle(e.target.value)}
              placeholder="e.g. ERLC Branding Tutorial"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={150}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="resource-url" className="mb-2 block text-sm font-medium text-foreground">
                Resource URL
              </label>
              <input
                id="resource-url"
                type="url"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label htmlFor="resource-type" className="mb-2 block text-sm font-medium text-foreground">
                Resource Type
              </label>
              <select
                id="resource-type"
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as ResourceType)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option>YouTube Video</option>
                <option>Website Tool</option>
                <option>Guide / Document</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="reason" className="mb-2 block text-sm font-medium text-foreground">
              Why should we add this?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Share why this is useful for ERLC communities."
              rows={5}
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
              {submitting ? "Submitting..." : "Submit suggestion"}
              <Icon name="check" className="text-base" />
            </button>
            <Link href="/resources" className="btn-ghost">
              Back to Resources
              <Icon name="arrow-right" className="text-base" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

