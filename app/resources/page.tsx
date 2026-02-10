"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Icon, { IconName, BrandIconName } from "@/components/Icon";
import ResourceCard from "@/components/ResourceCard";
import { resources, resourceCategories, getResourcesByCategory, searchResources } from "@/lib/resources";

const categoryIcons: Record<string, IconName | BrandIconName> = {
  "Server Branding": "palette",
  "Graphic Design Fundamentals": "layers",
  "Discord Setup and Visuals": "discord",
  "Discord Server Visuals": "discord",
  "Roleplay Structure": "users-alt",
  "Advertising and Growth": "arrow-trend-up",
  "Staff Systems": "settings",
  "Community Management": "users",
  "Automation and Bots": "chatbot",
  "Graphic Design and Branding": "palette",
  "Community Building": "users",
  "Automation and Systems": "chatbot",
  "Graphic Design Tools": "wrench",
  "Fonts and Typography": "text",
  "Color Palette Tools": "palette",
  "Icons and Emojis": "layers",
  "Animated Icons": "sparkles",
  "Design Inspiration": "sparkles",
  "Discord Utilities": "discord",
};

function ResourcesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    let filtered = selectedCategory
      ? getResourcesByCategory(selectedCategory)
      : resources;
    if (searchQuery) {
      filtered = searchResources(searchQuery).filter((r) =>
        selectedCategory ? r.category === selectedCategory : true
      );
    }
    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="section-heading">Resources vault</h1>
          <p className="section-subheading mt-3 max-w-2xl">
            Curated YouTube videos and tools for ERLC communities. Graphic design, branding, Discord, and growth—organized by category. All credit to original creators.
          </p>
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
            <p className="text-sm text-foreground/90">
              <strong className="font-semibold">Note:</strong> Unity Vault curates and organizes; we don’t create tutorials. All credit belongs to the original creators.
            </p>
          </div>
        </div>

        <div className="mb-10 space-y-6">
          <div className="relative">
            <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-foreground/50" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-4 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                selectedCategory === ""
                  ? "bg-primary text-white shadow-lg"
                  : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
              }`}
            >
              All
            </button>
            {resourceCategories.map((category) => {
              const iconName = categoryIcons[category] || "book";
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
                  }`}
                >
                  <Icon name={iconName} className="text-base" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {(selectedCategory || searchQuery) && (
          <p className="mb-6 text-sm text-foreground/60">
            {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
            {selectedCategory && ` in ${selectedCategory}`}
            {searchQuery && ` matching “${searchQuery}”`}
          </p>
        )}

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="gradient-border rounded-2xl p-12 text-center">
            <Icon name="search" className="mx-auto text-4xl text-foreground/40 mb-4" />
            <p className="text-lg font-medium text-foreground/80">No resources found</p>
            <p className="mt-1 text-sm text-foreground/60">
              Try a different category or search term
            </p>
          </div>
        )}

        {!selectedCategory && !searchQuery && (
          <div className="space-y-14 mt-14">
            {resourceCategories.map((category) => {
              const categoryResources = getResourcesByCategory(category);
              const iconName = categoryIcons[category] || "book";
              if (categoryResources.length === 0) return null;
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon name={iconName} className="text-xl text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground">{category}</h2>
                    </div>
                    <span className="text-sm text-foreground/60">
                      {categoryResources.length} resource{categoryResources.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </div>
              );
            })}
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
