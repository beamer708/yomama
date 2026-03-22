"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { resources } from "@/lib/resources";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import DiscordCommunityCard from "@/components/DiscordCommunityCard";

// Pre-computed sections
const youtubeResources = resources.filter((r) => r.section === "youtube");
const websiteResources = resources.filter((r) => r.section === "website");
const discordResources = resources.filter((r) => r.section === "discord");

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4" aria-hidden="false">
      <span className="section-rule-label">{label}</span>
      <div className="h-px flex-1 bg-border/60" />
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="py-6 text-sm text-muted-foreground">{message}</p>
  );
}

function matchesQuery(query: string, ...fields: (string | undefined)[]): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some((f) => f && f.toLowerCase().includes(q));
}

export default function ResourcesPage() {
  const [query, setQuery] = useState("");

  const filteredYoutube = useMemo(
    () =>
      youtubeResources.filter((r) =>
        matchesQuery(query, r.title, r.description, r.category, r.channelName)
      ),
    [query]
  );

  const filteredWebsite = useMemo(
    () =>
      websiteResources.filter((r) =>
        matchesQuery(query, r.title, r.description, r.category, r.creator)
      ),
    [query]
  );

  const filteredDiscord = useMemo(
    () =>
      discordResources.filter((r) =>
        matchesQuery(query, r.title, r.description, r.category, r.creator)
      ),
    [query]
  );

  const totalFiltered = filteredYoutube.length + filteredWebsite.length + filteredDiscord.length;
  const isFiltering = query.trim().length > 0;

  return (
    <div className="py-16 sm:py-20">
      <div className="page-container max-w-[1200px]">

        {/* Page header */}
        <div className="mb-14 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Resource Vault
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A structured collection of ERLC resources, tools, and community references organized by type.
          </p>
        </div>

        {/* Search / filter bar */}
        <div className="mb-14 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden
              strokeWidth={1.8}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all resources..."
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-border focus:outline-none focus:ring-2 focus:ring-accent/25 transition-colors"
              aria-label="Search all resources"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
              </button>
            )}
          </div>
          {isFiltering && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {totalFiltered} result{totalFiltered !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* No results message */}
        {isFiltering && totalFiltered === 0 && (
          <div className="py-12 text-center">
            <p className="text-base text-muted-foreground">
              No resources matched{" "}
              <span className="text-foreground">&ldquo;{query}&rdquo;</span>.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-3 text-sm text-accent hover:text-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 rounded"
            >
              Clear search
            </button>
          </div>
        )}

        {/* SECTION 1: Video Resources */}
        {(!isFiltering || filteredYoutube.length > 0) && (
          <section aria-labelledby="section-video" className="mb-20">
            <SectionHeader label="Video Resources" />
            <div
              id="section-video"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredYoutube.length > 0 ? (
                filteredYoutube.map((resource) => (
                  <YouTubeResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <EmptyState message="No video resources match your search." />
              )}
            </div>
          </section>
        )}

        {/* SECTION 2: Websites & Tools */}
        {(!isFiltering || filteredWebsite.length > 0) && (
          <section aria-labelledby="section-websites" className="mb-20">
            <SectionHeader label="Websites & Tools" />
            <div
              id="section-websites"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredWebsite.length > 0 ? (
                filteredWebsite.map((resource) => (
                  <WebsiteResourceCard key={resource.id} resource={resource} />
                ))
              ) : (
                <EmptyState message="No website resources match your search." />
              )}
            </div>
          </section>
        )}

        {/* SECTION 3: Discord Communities */}
        {(!isFiltering || filteredDiscord.length > 0) && (
          <section aria-labelledby="section-discord" className="mb-12">
            <SectionHeader label="Discord Communities" />
            <div
              id="section-discord"
              className="rounded-lg border border-border bg-card px-6"
            >
              {filteredDiscord.length > 0 ? (
                filteredDiscord.map((resource) => (
                  <DiscordCommunityCard key={resource.id} resource={resource} />
                ))
              ) : (
                <div className="py-6">
                  <EmptyState message="No Discord communities match your search." />
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
