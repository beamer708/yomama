/**
 * Resource Matcher - Server type and goal mapping for recommended resources.
 * TODO: Replace mock data with real API/database lookups when backend is ready.
 */

import { resources } from "./resources";
import type { Resource } from "./resources";

export const SERVER_TYPES = [
  "ERLC Roleplay",
  "Training Server",
  "Casual RP",
  "Realism RP",
] as const;

export const SERVER_GOALS = [
  "Grow members",
  "Improve realism",
  "Organize staff",
  "Improve branding",
] as const;

export type ServerType = (typeof SERVER_TYPES)[number];
export type ServerGoal = (typeof SERVER_GOALS)[number];

/** Recommended resource shape for matcher results (links are placeholders until wired to real resources) */
export interface RecommendedResource {
  id: string;
  title: string;
  description: string;
  url?: string; // Placeholder: real URLs from resources or external links
  type: string;
  isNew?: boolean;
}

/**
 * Maps server type + goal to resource categories and keywords.
 * In production, this would be a database query or ML-based recommendation.
 */
const MATCH_RULES: Record<
  string,
  { categories: string[]; keywords: string[] }
> = {
  "ERLC Roleplay-Grow members": {
    categories: ["Advertising and Growth", "Community Building", "Discord Utilities"],
    keywords: ["advertising", "growth", "community", "server", "discord", "melonly"],
  },
  "ERLC Roleplay-Improve realism": {
    categories: ["Roleplay Structure", "Community Building", "Graphic Design"],
    keywords: ["roleplay", "structure", "guide", "branding", "professional"],
  },
  "ERLC Roleplay-Organize staff": {
    categories: ["Roleplay Structure", "Community Building", "Automation and Systems"],
    keywords: ["staff", "structure", "management", "organization", "systems"],
  },
  "ERLC Roleplay-Improve branding": {
    categories: ["Graphic Design", "Discord Server Visuals", "Design Inspiration"],
    keywords: ["branding", "logo", "design", "visual", "discord", "icon"],
  },
  "Training Server-Grow members": {
    categories: ["Advertising and Growth", "Community Building"],
    keywords: ["advertising", "community", "growth"],
  },
  "Training Server-Improve realism": {
    categories: ["Roleplay Structure", "Graphic Design"],
    keywords: ["structure", "professional", "guide"],
  },
  "Training Server-Organize staff": {
    categories: ["Roleplay Structure", "Automation and Systems"],
    keywords: ["staff", "organization", "systems"],
  },
  "Training Server-Improve branding": {
    categories: ["Graphic Design", "Discord Server Visuals", "Icons and Emojis"],
    keywords: ["branding", "design", "discord", "icon", "visual"],
  },
  "Casual RP-Grow members": {
    categories: ["Advertising and Growth", "Community Building", "Discord Utilities"],
    keywords: ["advertising", "community", "discord", "melonly", "growth"],
  },
  "Casual RP-Improve realism": {
    categories: ["Roleplay Structure", "Community Building"],
    keywords: ["roleplay", "community", "structure"],
  },
  "Casual RP-Organize staff": {
    categories: ["Community Building", "Roleplay Structure"],
    keywords: ["staff", "community", "structure"],
  },
  "Casual RP-Improve branding": {
    categories: ["Graphic Design", "Icons and Emojis", "Color Palette Tools"],
    keywords: ["branding", "design", "color", "icon"],
  },
  "Realism RP-Grow members": {
    categories: ["Advertising and Growth", "Community Building", "Discord Utilities"],
    keywords: ["advertising", "community", "growth", "professional"],
  },
  "Realism RP-Improve realism": {
    categories: ["Roleplay Structure", "Graphic Design", "Community Building"],
    keywords: ["realism", "structure", "branding", "guide", "professional"],
  },
  "Realism RP-Organize staff": {
    categories: ["Roleplay Structure", "Automation and Systems", "Community Building"],
    keywords: ["staff", "structure", "systems", "organization"],
  },
  "Realism RP-Improve branding": {
    categories: ["Graphic Design", "Discord Server Visuals", "Design Inspiration", "Fonts and Typography"],
    keywords: ["branding", "design", "visual", "logo", "font", "inspiration"],
  },
};

/**
 * Returns recommended resources based on server type and goal.
 * Uses actual resources from the vault where possible; falls back to curated mock results.
 */
export function getRecommendedResources(
  serverType: ServerType,
  serverGoal: ServerGoal
): RecommendedResource[] {
  const key = `${serverType}-${serverGoal}`;
  const rules = MATCH_RULES[key] ?? {
    categories: ["Graphic Design", "Community Building", "Discord Utilities"],
    keywords: ["guide", "community", "discord"],
  };

  const seen = new Set<string>();
  const results: RecommendedResource[] = [];

  // Pull from real resources first (YouTube + Website)
  for (const r of resources) {
    if (seen.has(r.id)) continue;
    const inCategory = rules.categories.includes(r.category);
    const matchesKeyword = rules.keywords.some((kw) =>
      [r.title, r.description, r.category].join(" ").toLowerCase().includes(kw.toLowerCase())
    );
    if (inCategory || matchesKeyword) {
      seen.add(r.id);
      results.push({
        id: r.id,
        title: r.title,
        description: r.description,
        url: r.url,
        type: r.section === "youtube" ? "Video" : "Website",
        isNew: r.isNew,
      });
    }
  }

  // If we have fewer than 3, add some fallbacks (mock placeholders for variety)
  if (results.length < 3) {
    const fallbacks: RecommendedResource[] = [
      {
        id: "placeholder-1",
        title: "Community Growth Framework",
        description: "A structured approach to growing your ERLC server community through engagement and outreach.",
        url: "#",
        type: "Guide",
      },
      {
        id: "placeholder-2",
        title: "Staff Organization Best Practices",
        description: "Learn how to structure roles, permissions, and workflows for an efficient staff team.",
        url: "#",
        type: "Guide",
      },
      {
        id: "placeholder-3",
        title: "Brand Identity Workshop",
        description: "Step-by-step guide to defining your server's visual identity and brand consistency.",
        url: "#",
        type: "Guide",
      },
    ];
    for (const f of fallbacks) {
      if (results.length >= 6) break;
      if (!seen.has(f.id)) {
        seen.add(f.id);
        results.push(f);
      }
    }
  }

  return results.slice(0, 8); // Cap at 8 recommendations
}
