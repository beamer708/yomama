"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResourceCard from "@/components/ResourceCard";
import { resources, resourceCategories, getResourcesByCategory, searchResources } from "@/lib/resources";

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
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:max-w-4xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Resources Vault
          </h1>
          <p className="text-lg text-foreground/70 mb-6">
            Curated YouTube videos and resources from across the ERLC community. Most resources are high-quality 
            YouTube videos, especially for graphic design, branding, and Discord server presentation. All resources 
            are organized by category and properly credited to their original creators.
          </p>
          <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4 mb-8">
            <p className="text-sm text-foreground/80">
              <strong className="font-semibold">Important:</strong> Unity Lab does not create tutorials. 
              We curate, organize, and reference resources. All credit belongs to the original creators.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 pl-10 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-foreground/50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-primary text-white"
                  : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
              }`}
            >
              All Categories
            </button>
            {resourceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-card text-foreground/70 hover:bg-card-hover hover:text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
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
          <div className="space-y-12">
            {resourceCategories.map((category) => {
              const categoryResources = getResourcesByCategory(category);
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-foreground">{category}</h2>
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
                    <div className="rounded-lg bg-card border border-border p-8 text-center">
                      <p className="text-sm text-foreground/60">No resources available</p>
                    </div>
                  )}
                  
                  <div className="rounded-lg bg-card/50 border border-border/50 p-3">
                    <p className="text-xs text-foreground/50 text-center">
                      Not available
                    </p>
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
    <Suspense fallback={
      <div className="py-12 sm:py-16">
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
