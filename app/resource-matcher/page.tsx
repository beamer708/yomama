"use client";

import { useState, FormEvent } from "react";
import Icon from "@/components/Icon";
import {
  SERVER_TYPES,
  SERVER_GOALS,
  getRecommendedResources,
  type ServerType,
  type ServerGoal,
  type RecommendedResource,
} from "@/lib/resource-matcher";

function ResourceCard({ resource }: { resource: RecommendedResource }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 hover:border-primary/30 hover:bg-card-hover transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
            {resource.title}
          </h3>
          {resource.isNew && (
            <span className="mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-white">
              New
            </span>
          )}
          <p className="text-sm text-foreground/70 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>
        </div>
        {resource.url && resource.url !== "#" && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            <Icon name="up-right-from-square" className="text-sm" />
            Open
          </a>
        )}
      </div>
      <span className="inline-block mt-3 text-xs text-foreground/50">
        {resource.type}
      </span>
    </div>
  );
}

export default function ResourceMatcherPage() {
  const [serverType, setServerType] = useState<ServerType | "">("");
  const [serverGoal, setServerGoal] = useState<ServerGoal | "">("");
  const [results, setResults] = useState<RecommendedResource[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!serverType || !serverGoal) return;
    const recommended = getRecommendedResources(
      serverType as ServerType,
      serverGoal as ServerGoal
    );
    setResults(recommended);
    setHasSubmitted(true);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Coming Soon Banner */}
        <div className="mb-10 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
          <p className="text-sm font-medium text-primary flex items-center gap-2">
            <Icon name="sparkles" className="text-base" />
            This feature is coming soon. Early access preview only.
          </p>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
            Resource Matcher
          </h1>
          <p className="text-lg text-foreground/70">
            Tell us about your server and goals. We&apos;ll recommend the best resources from the vault.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-16">
          <div>
            <label
              htmlFor="server-type"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Server Type
            </label>
            <select
              id="server-type"
              value={serverType}
              onChange={(e) => setServerType(e.target.value as ServerType | "")}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select your server type</option>
              {SERVER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="server-goal"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Main Goal
            </label>
            <select
              id="server-goal"
              value={serverGoal}
              onChange={(e) => setServerGoal(e.target.value as ServerGoal | "")}
              required
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select your main goal</option>
              {SERVER_GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:text-primary-hover transition-colors"
          >
            <Icon name="search" className="text-base" />
            Get Recommendations
          </button>
        </form>

        {/* Results Section */}
        {hasSubmitted && (
          <section
            id="results-section"
            className="border-t border-border pt-12"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Recommended Resources
            </h2>
            <p className="text-foreground/70 mb-6">
              Based on <strong>{serverType}</strong> and goal: <strong>{serverGoal}</strong>
            </p>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card/50 p-8 text-center">
                <p className="text-foreground/70">
                  No recommendations found. Try a different combination.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
