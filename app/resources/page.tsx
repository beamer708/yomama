"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import { resources } from "@/lib/resources";
import uLogo from "@/Media/ULogo.svg";

const newResources = resources.filter((resource) => resource.isNew);
const CUSTOM_LIST_STORAGE_KEY = "unityvault.customListIds.v1";

export default function ResourcesPage() {
  const [browseTab, setBrowseTab] = useState<"all" | "new">("all");
  const [listMode, setListMode] = useState(false);
  const [customListIds, setCustomListIds] = useState<Set<string>>(new Set());
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CUSTOM_LIST_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const validIds = parsed.filter(
        (id): id is string => typeof id === "string" && resources.some((resource) => resource.id === id)
      );
      if (validIds.length > 0) {
        setCustomListIds(new Set(validIds));
        setListMode(true);
      }
    } catch {
      // Ignore invalid local data and continue with empty selection
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CUSTOM_LIST_STORAGE_KEY, JSON.stringify(Array.from(customListIds)));
    } catch {
      // Ignore storage write failures
    }
  }, [customListIds]);

  const youtubeResources = useMemo(
    () => resources.filter((resource) => resource.section === "youtube"),
    []
  );
  const websiteResources = useMemo(
    () => resources.filter((resource) => resource.section === "website"),
    []
  );
  const goalFilteredNewResources = useMemo(
    () => newResources,
    []
  );
  const newYoutubeResources = useMemo(
    () => goalFilteredNewResources.filter((resource) => resource.section === "youtube"),
    [goalFilteredNewResources]
  );
  const newWebsiteResources = useMemo(
    () => goalFilteredNewResources.filter((resource) => resource.section === "website"),
    [goalFilteredNewResources]
  );
  const customListResources = useMemo(
    () => resources.filter((resource) => customListIds.has(resource.id)),
    [customListIds]
  );

  const toggleResourceInList = (resourceId: string) => {
    setCustomListIds((prev) => {
      const next = new Set(prev);
      if (next.has(resourceId)) next.delete(resourceId);
      else next.add(resourceId);
      return next;
    });
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-7 text-center sm:p-9">
          <div className="flex justify-center mb-4">
            <Image src={uLogo} alt="" width={40} height={40} />
          </div>
          <h1 className="section-heading">Resources</h1>
          <p className="section-subheading mx-auto">
            A structured vault of ERLC resources organized by practical goals.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setListMode((on) => !on)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
              listMode
                ? "border-primary/40 bg-primary/15 text-primary"
                : "border-border bg-card/60 text-muted-foreground hover:bg-card-hover hover:text-foreground"
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${listMode ? "bg-primary" : "bg-muted-foreground/60"}`} />
            List Mode: {listMode ? "ON" : "OFF"}
          </button>
          <span className="text-xs text-muted-foreground">
            Turn on to show “Add to list” on every resource card.
          </span>
        </div>

        {listMode && (
          <div className="mt-8 rounded-2xl border border-border bg-card/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                My custom list ({customListResources.length})
              </h3>
              {customListResources.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setCustomListIds(new Set())}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear list
                </button>
              ) : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {customListResources.length > 0 ? customListResources.map((resource) => (
                <span key={resource.id} className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">
                  {resource.title}
                  <button
                    type="button"
                    onClick={() => toggleResourceInList(resource.id)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Remove ${resource.title} from custom list`}
                  >
                    <Icon name="cross" className="text-xs" />
                  </button>
                </span>
              )) : (
                <p className="text-xs text-muted-foreground">
                  Your list is empty. Use “Add to list” on any resource.
                </p>
              )}
            </div>
            <div className="mt-4">
              <Link
                href="/resource-list-creator"
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  customListResources.length > 0
                    ? "bg-primary text-background hover:bg-primary-hover"
                    : "cursor-not-allowed bg-white/10 text-muted-foreground pointer-events-none"
                }`}
              >
                Review list and create code
                <Icon name="arrow-right" className="text-sm" />
              </Link>
            </div>
          </div>
        )}

        <div ref={resultsRef} className="mt-16 border-t border-border/70 pt-12 transition-all duration-300">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Browse all resources</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Videos are shown with previews and organized separately from website tools.
            </p>
            <div className="mt-4 inline-flex rounded-xl border border-border bg-card/40 p-1">
              <button
                type="button"
                onClick={() => setBrowseTab("all")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  browseTab === "all"
                    ? "bg-primary text-background"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                All resources
              </button>
              <button
                type="button"
                onClick={() => setBrowseTab("new")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  browseTab === "new"
                    ? "bg-primary text-background"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
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
                  {youtubeResources.length > 0 ? youtubeResources.map((resource) => (
                    <YouTubeResourceCard
                      key={resource.id}
                      resource={resource}
                      showListActions={listMode}
                      isInList={customListIds.has(resource.id)}
                      onToggleList={toggleResourceInList}
                    />
                  )) : <p className="text-sm text-muted-foreground">No YouTube resources available yet.</p>}
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
                  {websiteResources.length > 0 ? websiteResources.map((resource) => (
                    <WebsiteResourceCard
                      key={resource.id}
                      resource={resource}
                      showListActions={listMode}
                      isInList={customListIds.has(resource.id)}
                      onToggleList={toggleResourceInList}
                    />
                  )) : <p className="text-sm text-muted-foreground">No website resources available yet.</p>}
                </div>
              </section>
            </>
          ) : (
            <>
              <section aria-labelledby="new-youtube-resources-heading" className="mb-12">
                <div className="mb-5 flex items-center gap-2">
                  <Icon name="youtube" className="text-xl text-primary" />
                  <h3 id="new-youtube-resources-heading" className="text-xl font-semibold text-foreground">
                    NEW YouTube videos
                  </h3>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {newYoutubeResources.length}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {newYoutubeResources.length > 0 ? newYoutubeResources.map((resource) => (
                    <YouTubeResourceCard
                      key={resource.id}
                      resource={resource}
                      showListActions={listMode}
                      isInList={customListIds.has(resource.id)}
                      onToggleList={toggleResourceInList}
                    />
                  )) : <p className="text-sm text-muted-foreground">No new YouTube resources available yet.</p>}
                </div>
              </section>

              <section aria-labelledby="new-website-resources-heading">
                <div className="mb-5 flex items-center gap-2">
                  <Icon name="globe" className="text-xl text-primary" />
                  <h3 id="new-website-resources-heading" className="text-xl font-semibold text-foreground">
                    NEW website resources
                  </h3>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {newWebsiteResources.length}
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {newWebsiteResources.length > 0 ? newWebsiteResources.map((resource) => (
                    <WebsiteResourceCard
                      key={resource.id}
                      resource={resource}
                      showListActions={listMode}
                      isInList={customListIds.has(resource.id)}
                      onToggleList={toggleResourceInList}
                    />
                  )) : <p className="text-sm text-muted-foreground">No new website resources available yet.</p>}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
