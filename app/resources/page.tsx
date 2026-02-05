"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Icon, { IconName, BrandIconName } from "@/components/Icon";
import YouTubeResourceCard from "@/components/YouTubeResourceCard";
import WebsiteResourceCard from "@/components/WebsiteResourceCard";
import {
  resources,
  youtubeCategories,
  websiteCategories,
  getResourcesByCategory,
  getResourcesBySection,
  searchResources,
  ResourceSection,
} from "@/lib/resources";

const youtubeCategoryIcons: Record<string, IconName | BrandIconName> = {
  "Graphic Design and Branding": "palette",
  "Discord Server Visuals": "discord",
  "Community Building": "users",
  "Advertising and Growth": "arrow-trend-up",
  "Roleplay Structure": "users-alt",
  "Automation and Systems": "settings",
};

const websiteCategoryIcons: Record<string, IconName | BrandIconName> = {
  "Graphic Design Tools": "brush",
  "Fonts and Typography": "text",
  "Color Palette Tools": "palette",
  "Icons and Emojis": "layers",
  "Animated Icons": "sparkles",
  "Design Inspiration": "bulb",
  "Discord Utilities": "discord",
};

function ResourcesContent() {
  const searchParams = useSearchParams();
  const urlSection = searchParams.get("section") as ResourceSection;
  const urlCategory = searchParams.get("category") || "";
  
  // Determine initial section: URL param > localStorage > default to youtube
  const getInitialSection = (): ResourceSection => {
    if (urlSection === "youtube" || urlSection === "website") {
      return urlSection;
    }
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("unityVault_lastSection");
      if (stored === "youtube" || stored === "website") {
        return stored;
      }
    }
    // If category is from YouTube categories, default to youtube
    if (urlCategory && youtubeCategories.includes(urlCategory)) {
      return "youtube";
    }
    // If category is from Website categories, default to website
    if (urlCategory && websiteCategories.includes(urlCategory)) {
      return "website";
    }
    return "youtube";
  };

  const [activeSection, setActiveSection] = useState<ResourceSection>(getInitialSection());
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState("");

  // Update section if URL category changes
  useEffect(() => {
    if (urlCategory) {
      if (youtubeCategories.includes(urlCategory) && activeSection !== "youtube") {
        setActiveSection("youtube");
      } else if (websiteCategories.includes(urlCategory) && activeSection !== "website") {
        setActiveSection("website");
      }
    }
  }, [urlCategory, activeSection]);

  // Persist section selection to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("unityVault_lastSection", activeSection);
    }
  }, [activeSection]);

  const currentCategories = activeSection === "youtube" ? youtubeCategories : websiteCategories;
  const categoryIcons = activeSection === "youtube" ? youtubeCategoryIcons : websiteCategoryIcons;

  const filteredResources = useMemo(() => {
    let filtered = getResourcesBySection(activeSection);

    if (selectedCategory) {
      filtered = getResourcesByCategory(selectedCategory, activeSection);
    }

    if (searchQuery) {
      filtered = searchResources(searchQuery, activeSection).filter((resource) =>
        selectedCategory ? resource.category === selectedCategory : true
      );
    }

    return filtered;
  }, [activeSection, selectedCategory, searchQuery]);

  const handleSectionChange = (section: ResourceSection) => {
    setActiveSection(section);
    setSelectedCategory(""); // Reset category when switching sections
    setSearchQuery(""); // Reset search when switching sections
  };

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Resources Vault
          </h1>
          <p className="text-lg text-foreground/70 mb-6">
            Curated educational videos and practical tools organized to help ERLC communities grow. 
            All resources are properly credited to their original creators.
          </p>
          <div className="rounded-lg bg-card border border-border p-4">
            <p className="text-sm text-foreground/80">
              <strong className="font-semibold">Important:</strong> Unity Vault does not create tutorials. 
              We curate, organize, and reference resources. All credit belongs to the original creators.
            </p>
          </div>
        </div>

        {/* Section Toggle */}
        <div className="mb-8">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => handleSectionChange("youtube")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === "youtube"
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:text-foreground hover:bg-card-hover"
              }`}
            >
              <Icon name="youtube" className="text-base" />
              YouTube Resources
            </button>
            <button
              onClick={() => handleSectionChange("website")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === "website"
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:text-foreground hover:bg-card-hover"
              }`}
            >
              <Icon name="globe" className="text-base" />
              Website Resources
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder={`Search ${activeSection === "youtube" ? "videos" : "resources"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 pl-10 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Icon name="search" className="absolute left-3 top-3.5 text-xl text-foreground/50" />
          </div>
        </div>

        {/* Category Filters */}
        {!searchQuery && (
          <div className="mb-10">
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
              {currentCategories.map((category) => {
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
        )}

        {/* Resources Display */}
        {selectedCategory || searchQuery ? (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-foreground/60">
                {filteredResources.length} {activeSection === "youtube" ? "video" : "resource"}
                {filteredResources.length !== 1 ? "s" : ""} found
                {selectedCategory && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Filtered Resources Grid */}
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) =>
                  activeSection === "youtube" ? (
                    <YouTubeResourceCard key={resource.id} resource={resource} />
                  ) : (
                    <WebsiteResourceCard key={resource.id} resource={resource} />
                  )
                )}
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
            {currentCategories.map((category) => {
              const categoryResources = getResourcesByCategory(category, activeSection);
              const iconName = categoryIcons[category] || "book";
              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-3">
                      <Icon name={iconName} className="text-2xl text-primary" />
                      <h2 className="text-2xl font-semibold text-foreground">{category}</h2>
                    </div>
                    <span className="text-sm text-foreground/60">
                      {categoryResources.length} {activeSection === "youtube" ? "video" : "resource"}
                      {categoryResources.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {categoryResources.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryResources.map((resource) =>
                        activeSection === "youtube" ? (
                          <YouTubeResourceCard key={resource.id} resource={resource} />
                        ) : (
                          <WebsiteResourceCard key={resource.id} resource={resource} />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-card/50 border border-border/50 p-8 text-center">
                      <p className="text-sm text-foreground/60">More resources coming soon</p>
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
    <Suspense
      fallback={
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
      }
    >
      <ResourcesContent />
    </Suspense>
  );
}
