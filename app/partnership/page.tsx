"use client";

import { FormEvent, useState } from "react";
import Icon from "@/components/Icon";

type ServerType = "Roleplay Server" | "Design Server" | "Resource Server" | "Community Server" | "Other";

type FieldErrors = Partial<Record<"serverName" | "inviteLink" | "serverType" | "reason" | "offering", string>>;

function isValidInviteLink(value: string): boolean {
  return value.startsWith("discord.gg/") || value.startsWith("https://discord.gg/");
}

export default function PartnershipPage() {
  const [serverName, setServerName] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [serverType, setServerType] = useState<ServerType | "">("");
  const [reason, setReason] = useState("");
  const [offering, setOffering] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!serverName.trim()) errors.serverName = "Server name is required.";
    if (!inviteLink.trim()) {
      errors.inviteLink = "Server invite link is required.";
    } else if (!isValidInviteLink(inviteLink.trim())) {
      errors.inviteLink = "Link must start with discord.gg/ or https://discord.gg/";
    }
    if (!serverType) errors.serverType = "Please select a server type.";
    if (!reason.trim()) errors.reason = "Please tell us why you want to partner.";
    if (!offering.trim()) errors.offering = "Please describe what you offer the ERLC community.";
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
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "/api";
      const res = await fetch(`${apiBase}/partnership`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serverName: serverName.trim(),
          inviteLink: inviteLink.trim(),
          serverType,
          reason: reason.trim(),
          offering: offering.trim(),
        }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please try again or contact support.");
        return;
      }

      setSuccess(
        "Your partnership application has been submitted. The Unity Vault team will review it shortly."
      );
      setServerName("");
      setInviteLink("");
      setServerType("");
      setReason("");
      setOffering("");
    } catch {
      setError("Something went wrong. Please try again or contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        {/* Section 1 — Header */}
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="users" className="text-2xl" />
          </div>
          <h1 className="section-heading">Partner With Unity Vault</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Apply to be featured on Unity Vault as a trusted resource or community for the ERLC
            community. All applications are reviewed by the Unity Vault team.
          </p>
        </div>

        {/* Section 2 — Partnership Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mb-10 space-y-6 rounded-3xl border border-border bg-card/85 p-6 sm:p-8"
        >
          <div>
            <label htmlFor="server-name" className="mb-2 block text-sm font-medium text-foreground">
              Server Name
            </label>
            <input
              id="server-name"
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Your server name"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={100}
            />
            {fieldErrors.serverName && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.serverName}</p>
            )}
          </div>

          <div>
            <label htmlFor="invite-link" className="mb-2 block text-sm font-medium text-foreground">
              Server Invite Link
            </label>
            <input
              id="invite-link"
              type="text"
              value={inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
              placeholder="discord.gg/yourserver"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={200}
            />
            {fieldErrors.inviteLink && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.inviteLink}</p>
            )}
          </div>

          <div>
            <label htmlFor="server-type" className="mb-2 block text-sm font-medium text-foreground">
              Server Type
            </label>
            <select
              id="server-type"
              value={serverType}
              onChange={(e) => setServerType(e.target.value as ServerType | "")}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select a server type...</option>
              <option value="Roleplay Server">Roleplay Server</option>
              <option value="Design Server">Design Server</option>
              <option value="Resource Server">Resource Server</option>
              <option value="Community Server">Community Server</option>
              <option value="Other">Other</option>
            </select>
            {fieldErrors.serverType && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.serverType}</p>
            )}
          </div>

          <div>
            <label htmlFor="reason" className="mb-2 block text-sm font-medium text-foreground">
              Why do you want to partner?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us why your server would be a good fit."
              rows={5}
              className="w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={2000}
            />
            {fieldErrors.reason && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.reason}</p>
            )}
          </div>

          <div>
            <label htmlFor="offering" className="mb-2 block text-sm font-medium text-foreground">
              What do you offer the ERLC community?
            </label>
            <textarea
              id="offering"
              value={offering}
              onChange={(e) => setOffering(e.target.value)}
              placeholder="Describe what makes your server valuable."
              rows={5}
              className="w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              maxLength={2000}
            />
            {fieldErrors.offering && (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.offering}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:pointer-events-none disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Application"}
            <Icon name="check" className="text-base" />
          </button>
        </form>

        {/* Section 3 — What We Look For */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-foreground">What We Look For</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/85 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon name="sparkles" className="text-xl" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Servers that maintain a high standard of organization and presentation.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/85 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon name="check" className="text-xl" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Relevance</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Content that genuinely serves the ERLC community.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/85 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon name="clock" className="text-xl" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Consistency</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Active servers with consistent leadership and structure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
