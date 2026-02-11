"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import ERLCLogo from "@/components/ERLCLogo";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import { AssistantResults, type AssistantGrouped } from "@/components/resource-assistant/AssistantResults";
import { RESOURCE_FOCUS_OPTIONS } from "@/lib/resource-focus-options";
import type { FocusArea } from "@/lib/resource-list-mapping";
import { resources } from "@/lib/resources";

const youtubeResources = resources.filter((resource) => resource.section === "youtube");
const websiteResources = resources.filter((resource) => resource.section === "website");
const newResources = resources.filter((resource) => resource.isNew);

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<FocusArea>>(new Set());
  const [browseTab, setBrowseTab] = useState<"all" | "new">("all");
  const [result, setResult] = useState<{
    grouped: AssistantGrouped;
    reasons: Record<string, string>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleOption = (id: FocusArea) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const canSubmit = query.trim().length > 0 || selected.size > 0;

  const submit = async () => {
    if (!canSubmit) return;
    const selectedText =
      selected.size > 0
        ? `Selected focus areas: ${Array.from(selected).join(", ")}`
        : "";
    const assistantInput = [query.trim(), selectedText].filter(Boolean).join("\n");

    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/resource-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: assistantInput || undefined,
        }),
      });
      const text = await res.text();
      let data: {
        error?: string;
        recommended?: AssistantGrouped["recommended"];
        helpful?: AssistantGrouped["helpfulTools"];
        optional?: AssistantGrouped["optional"];
      };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(res.ok ? "Invalid response. Try again." : "Something went wrong. Try again.");
        return;
      }
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      if (!data.recommended || !data.helpful || !data.optional) {
        setError("No suggestions returned. Try selecting options or entering a description.");
        return;
      }
      setResult({
        grouped: {
          recommended: data.recommended,
          helpfulTools: data.helpful,
          optional: data.optional,
        },
        reasons: {},
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't load suggestions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setResult(null);
    setQuery("");
    setSelected(new Set());
    setError(null);
  };

  const handleRefine = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <ERLCLogo size={40} />
          </div>
          <h1 className="section-heading">Resources</h1>
          <p className="section-subheading mx-auto">
            Find and get suggestions for ERLC server resources. Type what you're working on or pick from the options below.
          </p>
        </div>

        {!result ? (
          <div className="space-y-8 animate-in-fade">
            <div className="gradient-border rounded-2xl p-6 sm:p-8">
              <label htmlFor="resources-query" className="block text-sm font-medium text-foreground mb-3">
                What are you working on?
              </label>
              <textarea
                id="resources-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Setting up a new ERLC server and need branding help"
                rows={2}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                disabled={loading}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                Or select one or more areas
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {RESOURCE_FOCUS_OPTIONS.map((option) => {
                  const isSelected = selected.has(option.id);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleOption(option.id)}
                      disabled={loading}
                      className={`flex flex-col items-center rounded-xl border p-4 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 ${
                        isSelected
                          ? "border-primary bg-primary/15 text-primary shadow-lg shadow-primary/10"
                          : "border-border bg-card/60 hover:border-primary/40 hover:bg-card-hover text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl mb-3 transition-colors overflow-hidden ${
                          isSelected ? "bg-primary/25 text-primary" : "bg-white/5 text-foreground/80"
                        }`}
                      >
                        {option.id === "Server Setup" ? (
                          <ERLCLogo size={48} className="object-contain" />
                        ) : (
                          <Icon name={option.icon} className="text-2xl" />
                        )}
                      </span>
                      <span className="font-semibold text-sm">{option.title}</span>
                      <span className="mt-0.5 text-xs opacity-80">{option.subtitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit || loading}
                className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Finding resources…
                  </>
                ) : (
                  <>
                    Get suggestions
                    <Icon name="arrow-right" className="text-base" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in-fade">
            <AssistantResults
              grouped={result.grouped}
              reasons={result.reasons}
              onRefine={handleRefine}
              onRestart={handleRestart}
            />
          </div>
        )}

        <div className="mt-16 border-t border-border/70 pt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Browse all resources</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Videos are shown with previews and organized separately from website tools.
            </p>
            <div className="mt-4 inline-flex rounded-xl border border-border bg-card/40 p-1">
              <button
                type="button"
                onClick={() => setBrowseTab("all")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  browseTab === "all"
                    ? "bg-primary text-white"
                    : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                All resources
              </button>
              <button
                type="button"
                onClick={() => setBrowseTab("new")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  browseTab === "new"
                    ? "bg-primary text-white"
                    : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                NEW
              </button>
            </div>
          </div>

          {browseTab === "all" ? (
            <>
              <section aria-labelledby="youtube-resources-heading" className="mb-12">
                <div className="mb-5 flex items-center gap-2">
                  <Icon name="youtube" className="text-xl text-primary" />
                  <h3 id="youtube-resources-heading" className="text-xl font-semibold text-foreground">
                    YouTube videos
                  </h3>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {youtubeResources.length}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {youtubeResources.map((resource) => (
                    <YouTubeResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>

              <section aria-labelledby="website-resources-heading">
                <div className="mb-5 flex items-center gap-2">
                  <Icon name="globe" className="text-xl text-primary" />
                  <h3 id="website-resources-heading" className="text-xl font-semibold text-foreground">
                    Website resources
                  </h3>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {websiteResources.length}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {websiteResources.map((resource) => (
                    <WebsiteResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <section aria-labelledby="new-resources-heading">
              <div className="mb-5 flex items-center gap-2">
                <Icon name="sparkles" className="text-xl text-primary" />
                <h3 id="new-resources-heading" className="text-xl font-semibold text-foreground">
                  NEW resources
                </h3>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {newResources.length}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {newResources.map((resource) =>
                  resource.section === "youtube" ? (
                    <YouTubeResourceCard key={resource.id} resource={resource} />
                  ) : (
                    <WebsiteResourceCard key={resource.id} resource={resource} />
                  )
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
