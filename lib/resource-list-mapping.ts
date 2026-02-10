/**
 * Maps resource categories to focus areas for the Resource List Creator.
 * Admins can override via ScoringConfig in the database.
 */

export const FOCUS_AREAS = [
  "Graphic Design",
  "Branding",
  "Server Setup",
  "Automation / Bots",
  "Staff & Management",
  "Marketing & Growth",
  "Documentation / SOPs",
] as const;

export type FocusArea = (typeof FOCUS_AREAS)[number];

export const PROJECT_TYPES = [
  "ERLC server",
  "Branding",
  "Redesign",
  "Startup",
  "Community expansion",
  "Other",
] as const;

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export const BUDGET_RANGES = [
  "No budget",
  "Low",
  "Medium",
  "High",
] as const;

export const TIMELINE_OPTIONS = [
  "No rush",
  "Within a month",
  "Within a week",
  "Urgent",
] as const;

/** Maps each resource category to one or more focus areas for scoring. */
export const CATEGORY_TO_FOCUS_AREAS: Record<string, FocusArea[]> = {
  "Graphic Design": ["Graphic Design", "Branding"],
  "Discord Server Visuals": ["Server Setup", "Branding"],
  "Community Building": ["Staff & Management", "Documentation / SOPs"],
  "Advertising and Growth": ["Marketing & Growth"],
  "Roleplay Structure": ["Staff & Management", "Documentation / SOPs"],
  "Automation and Systems": ["Automation / Bots", "Server Setup"],
  "Graphic Design Tools": ["Graphic Design", "Branding"],
  "Fonts and Typography": ["Graphic Design", "Branding"],
  "Color Palette Tools": ["Graphic Design", "Branding"],
  "Icons and Emojis": ["Graphic Design", "Branding"],
  "Animated Icons": ["Graphic Design", "Branding"],
  "Design Inspiration": ["Graphic Design", "Branding", "Documentation / SOPs"],
  "Discord Utilities": ["Server Setup", "Automation / Bots"],
};

export function getFocusAreasForCategory(category: string): FocusArea[] {
  return CATEGORY_TO_FOCUS_AREAS[category] ?? ["Graphic Design"];
}
