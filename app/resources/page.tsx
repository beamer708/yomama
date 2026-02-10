"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon, { IconName, BrandIconName } from "@/components/Icon";
import ResourceCard from "@/components/ResourceCard";
import {
  resources,
  searchResources,
  type Resource,
} from "@/lib/resources";
import {
  NAV,
  RESOURCE_GROUP_TO_CATEGORIES,
  RESOURCE_GROUP_LABELS,
} from "@/lib/site-structure";

const categoryIcons: Record<string, IconName | BrandIconName> = {
  "Graphic Design": "palette",
  "Discord Server Visuals": "discord",
  "Community Building": "users",
  "Advertising and Growth": "arrow-trend-up",
  "Roleplay Structure": "users-alt",
  "Automation and Systems": "chatbot",
  "Graphic Design Tools": "wrench",
  "Fonts and Typography": "text",
  "Color Palette Tools": "palette",
  "Icons and Emojis": "layers",
  "Animated Icons": "sparkles",
  "Design Inspiration": "sparkles",
  "Discord Utilities": "discord",
};

function getResourcesForGroup(groupKey: string): Resource[] {
  const categories = RESOURCE_GROUP_TO_CATEGORIES[groupKey];
  if (!categories) return resources;
  return resources.filter((r) => categories.includes(r.category));
}

function ResourcesContent() {
  const searchParams = useSearchParams();
  const groupParam = searchParams.get("group") || "";
  const legacyCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const selectedGroup = groupParam && ["server", "design", "tools"].includes(groupParam) ? groupParam : "all";
  const groupKeys = ["server", "design", "tools"] as const;

  const resourcesInGroup = useMemo(() => {
    if (selectedGroup === "all") return resources;
    return getResourcesForGroup(selectedGroup);
  }, [selectedGroup]);

  const categoriesInGroup = useMemo(() => {
    const set = new Set(resourcesInGroup.map((r) => r.category));
    return Array.from(set).sort();
  }, [resourcesInGroup]);

  const filteredResources = useMemo(() => {
    let list = resourcesInGroup;
    if (legacyCategory) {
      list = list.filter((r) => r.category === legacyCategory);
    }
    if (searchQuery.trim()) {
      list = searchResources(searchQuery.trim()).filter((r) =>
        resourcesInGroup.some((x) => x.id === r.id)
      );
    }
    return list;
  }, [resourcesInGroup, legacyCategory, searchQuery]);

  const byCategory = useMemo(() => {
    const map = new Map<string, Resource[]>();
    filteredResources.forEach((r) => {
      const list = map.get(r.category) ?? [];
      list.push(r);
      map.set(r.category, list);
    });
    return map;
  }, [filteredResources]);

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        <div className="mb-10">
          <h1 className="section-heading">Resources</h1>
          <p className="section-subheading mt-3 max-w-2xl">
            Curated videos and tools for ERLC communities. Server setup, graphic design and branding, and utilities—organized so you can find what you need. All credit to original creators.
          </p>
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 max-w-2xl">
            <p className="text-sm text-foreground/90">
              <strong className="font-semibold">Note:</strong> Unity Vault curates and organizes; we don’t create tutorials. All credit belongs to the original creators.
            </p>
          </div>
        </div>

        {/* Group tabs */}
        <div className="mb-8">
          <p className="text-sm font-medium text-foreground/70 mb-3">Browse by group</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/resources"
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 ${
                selectedGroup === "all"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
              }`}
            >
              All
            </Link>
            {groupKeys.map((key) => (
              <Link
                key={key}
                href={`/resources?group=${key}`}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 inline-flex items-center gap-2 ${
                  selectedGroup === key
                    ? "bg-primary text-white shadow-lg"
                    : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
                }`}
              >
                <Icon
                  name={
                    key === "server"
                      ? "wrench"
                      : key === "design"
                      ? "palette"
                      : "layers"
                  }
                  className="text-base"
                />
                {RESOURCE_GROUP_LABELS[key]}
              </Link>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-foreground/50"
            />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
        </div>

        {(selectedGroup !== "all" || legacyCategory || searchQuery) && (
          <p className="mb-6 text-sm text-foreground/60">
            {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
            {selectedGroup !== "all" && ` in ${RESOURCE_GROUP_LABELS[selectedGroup]}`}
            {legacyCategory && ` in ${legacyCategory}`}
            {searchQuery && ` matching “${searchQuery}”`}
          </p>
        )}

        {filteredResources.length === 0 ? (
          <div className="gradient-border rounded-2xl p-12 text-center">
            <Icon name="search" className="mx-auto text-4xl text-foreground/40 mb-4" />
            <p className="text-lg font-medium text-foreground/80">No resources found</p>
            <p className="mt-1 text-sm text-foreground/60">
              Try a different group or search term
            </p>
          </div>
        ) : !searchQuery && !legacyCategory ? (
          <div className="space-y-14">
            {categoriesInGroup.map((category) => {
              const list = byCategory.get(category) ?? [];
              if (list.length === 0) return null;
              const iconName = categoryIcons[category] || "book";
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon name={iconName} className="text-xl text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {category}
                      </h2>
                    </div>
                    <span className="text-sm text-foreground/60">
                      {list.length} resource{list.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 sm:py-16">
          <div className="page-container">
            <div className="h-10 w-64 bg-card rounded-xl animate-pulse mb-6" />
            <div className="h-4 w-full max-w-xl bg-card rounded animate-pulse mb-10" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-52 bg-card rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ResourcesContent />
    </Suspense>
  );
}
