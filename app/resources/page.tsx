"use client";

import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import ERLCLogo from "@/components/ERLCLogo";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import { getFocusAreasForCategory, type FocusArea } from "@/lib/resource-list-mapping";
import { resources } from "@/lib/resources";

const newResources = resources.filter((resource) => resource.isNew);

type PresetGoal = {
  id: string;
  title: string;
  subtitle: string;
  icon: Parameters<typeof Icon>[0]["name"];
  focusAreas: FocusArea[];
};

const PRESET_GOALS: PresetGoal[] = [
  {
    id: "logo-design",
    title: "I want to design a logo",
    subtitle: "Identity, mark, and visual direction",
    icon: "palette",
    focusAreas: ["Graphic Design", "Branding"],
  },
  {
    id: "emoji-design",
    title: "I want to design emojis",
    subtitle: "Clean iconography for Discord use",
    icon: "sparkles",
    focusAreas: ["Graphic Design", "Branding"],
  },
  {
    id: "roleplay-logo",
    title: "I want to design a roleplay logo",
    subtitle: "Roleplay-oriented identity assets",
    icon: "compass",
    focusAreas: ["Graphic Design", "Branding"],
  },
  {
    id: "icon-logo",
    title: "I want to design an icon logo",
    subtitle: "Simple icon-focused brand marks",
    icon: "apps",
    focusAreas: ["Graphic Design", "Branding"],
  },
  {
    id: "server-visuals",
    title: "I want to improve my Discord server visuals",
    subtitle: "Channels, roles, and layout clarity",
    icon: "wrench",
    focusAreas: ["Server Setup", "Branding"],
  },
  {
    id: "server-growth",
    title: "I want to grow my server",
    subtitle: "Promotion and growth systems",
    icon: "arrow-trend-up",
    focusAreas: ["Marketing & Growth"],
  },
  {
    id: "staff-organization",
    title: "I want to organize my staff team",
    subtitle: "Staff structure and workflows",
    icon: "users",
    focusAreas: ["Staff & Management", "Documentation / SOPs"],
  },
  {
    id: "better-branding",
    title: "I want better branding for my server",
    subtitle: "Consistency and stronger identity",
    icon: "layers",
    focusAreas: ["Branding", "Graphic Design"],
  },
  {
    id: "roleplay-structure",
    title: "I want to improve roleplay structure",
    subtitle: "Systems and docs for roleplay quality",
    icon: "document",
    focusAreas: ["Staff & Management", "Documentation / SOPs"],
  },
];

export default function ResourcesPage() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [browseTab, setBrowseTab] = useState<"all" | "new">("all");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const activePreset = useMemo(
    () => PRESET_GOALS.find((goal) => goal.id === selectedGoal) ?? null,
    [selectedGoal]
  );

  const goalFilteredResources = useMemo(() => {
    if (!activePreset) return resources;
    const focusSet = new Set<FocusArea>(activePreset.focusAreas);
    return resources.filter((resource) =>
      getFocusAreasForCategory(resource.category).some((area) => focusSet.has(area))
    );
  }, [activePreset]);

  const youtubeResources = useMemo(
    () => goalFilteredResources.filter((resource) => resource.section === "youtube"),
    [goalFilteredResources]
  );
  const websiteResources = useMemo(
    () => goalFilteredResources.filter((resource) => resource.section === "website"),
    [goalFilteredResources]
  );
  const goalFilteredNewResources = useMemo(
    () => newResources.filter((resource) => goalFilteredResources.some((r) => r.id === resource.id)),
    [goalFilteredResources]
  );
  const newYoutubeResources = useMemo(
    () => goalFilteredNewResources.filter((resource) => resource.section === "youtube"),
    [goalFilteredNewResources]
  );
  const newWebsiteResources = useMemo(
    () => goalFilteredNewResources.filter((resource) => resource.section === "website"),
    [goalFilteredNewResources]
  );

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal((prev) => (prev === goalId ? null : goalId));
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-7 text-center sm:p-9">
          <div className="flex justify-center mb-4">
            <ERLCLogo size={40} />
          </div>
          <h1 className="section-heading">Resources</h1>
          <p className="section-subheading mx-auto">
            A structured vault of ERLC resources organized by practical goals.
          </p>
        </div>

        <div className="space-y-6 animate-in-fade">
          <div>
            <h2 className="text-xl font-semibold text-foreground">What do you want to work on?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a goal and we’ll show you the right resources.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRESET_GOALS.map((goal) => {
              const isActive = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`group rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
                      : "border-border bg-card/85 hover:border-primary/40 hover:bg-card-hover"
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon name={goal.icon} className="text-lg" />
                  </span>
                  <p className="text-sm font-semibold text-foreground">{goal.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{goal.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={resultsRef} className="mt-16 border-t border-border/70 pt-12 transition-all duration-300">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">Browse all resources</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {activePreset
                ? `Showing resources for: ${activePreset.title}`
                : "Videos are shown with previews and organized separately from website tools."}
            </p>
            <div className="mt-4 inline-flex rounded-xl border border-border bg-card/40 p-1">
              <button
                type="button"
                onClick={() => setBrowseTab("all")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  browseTab === "all"
                    ? "bg-primary text-white"
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
                    ? "bg-primary text-white"
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
                    <YouTubeResourceCard key={resource.id} resource={resource} />
                  )) : <p className="text-sm text-muted-foreground">No YouTube resources match this goal yet.</p>}
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
                    <WebsiteResourceCard key={resource.id} resource={resource} />
                  )) : <p className="text-sm text-muted-foreground">No website resources match this goal yet.</p>}
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
                    <YouTubeResourceCard key={resource.id} resource={resource} />
                  )) : <p className="text-sm text-muted-foreground">No new YouTube resources match this goal yet.</p>}
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
                    <WebsiteResourceCard key={resource.id} resource={resource} />
                  )) : <p className="text-sm text-muted-foreground">No new website resources match this goal yet.</p>}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
