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
  "Roleplay Structure": "users-alt",
  "Advertising and Growth": "arrow-trend-up",
  "Staff Systems": "settings",
  "Community Management": "users",
  "Automation and Bots": "chatbot",
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
      filtered = searchResources(searchQuery).filter((resource) =>
        selectedCategory ? resource.category === selectedCategory : true
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Resources Vault
          </h1>
          <p className="text-lg text-foreground/70 mb-6">
            Curated YouTube videos and resources from across the ERLC community. Most resources are high-quality 
            YouTube videos, especially for graphic design, branding, and Discord server presentation. All resources 
            are organized by category and properly credited to their original creators.
          </p>
          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-sm text-foreground/80">
              <strong className="font-semibold">Important:</strong> Unity Vault does not create tutorials. 
              We curate, organize, and reference resources. All credit belongs to the original creators.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 pl-10 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Icon name="search" className="absolute left-3 top-3.5 text-xl text-foreground/50" />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-primary text-white"
                  : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
              }`}
            >
              <Icon name="grid" className="text-base" />
              All Categories
            </button>
            {resourceCategories.map((category) => {
              const iconName = categoryIcons[category] || "book";
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
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

        {/* Resources by Category */}
        {selectedCategory || searchQuery ? (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-foreground/60">
                {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
                {selectedCategory && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Filtered Resources Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-card border border-border p-12 text-center">
                <p className="text-lg text-foreground/70 mb-2">No resources found</p>
                <p className="text-sm text-foreground/60">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-16">
            {resourceCategories.map((category) => {
              const categoryResources = getResourcesByCategory(category);
              const iconName = categoryIcons[category] || "book";
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-3">
                      <Icon name={iconName} className="text-2xl text-primary" />
                      <h2 className="text-2xl font-semibold text-foreground">{category}</h2>
                    </div>
                    <span className="text-sm text-foreground/60">
                      {categoryResources.length} resource{categoryResources.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  
                  {categoryResources.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-card/50 border border-border/50 p-6">
                      <p className="text-sm text-foreground/50 text-center">
                        Not available
                      </p>
                    </div>
                  )}
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
    <Suspense fallback={
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-card rounded mb-4"></div>
            <div className="h-6 bg-card rounded mb-8"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-card rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  );
}
