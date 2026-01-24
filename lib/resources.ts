export type ResourceType = "video" | "guide" | "website" | "tool" | "document";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  category: string;
  creator: string;
  creatorUrl?: string;
}

export const resourceCategories = [
  "Server Branding",
  "Graphic Design Fundamentals",
  "Discord Setup and Visuals",
  "Roleplay Structure",
  "Advertising and Growth",
  "Staff Systems",
  "Community Management",
  "Automation and Bots",
];

// Placeholder resources - in production, this would come from a database or CMS
// Most resources are YouTube videos, especially from high-quality design channels
export const resources: Resource[] = [
  {
    id: "1",
    title: "Branding Basics: Building a Visual Identity",
    description: "Learn the fundamentals of creating a cohesive brand identity that communicates your server's values and personality.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Server Branding",
    creator: "The Futur",
    creatorUrl: "https://www.youtube.com/@thefutur",
  },
  {
    id: "2",
    title: "Logo Design Process: From Concept to Final",
    description: "A comprehensive walkthrough of professional logo design, applicable to server branding and visual identity.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Server Branding",
    creator: "The Futur",
    creatorUrl: "https://www.youtube.com/@thefutur",
  },
  {
    id: "3",
    title: "Color Theory for Designers",
    description: "Understanding color psychology and how to choose color palettes that work for your community's brand.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Graphic Design Fundamentals",
    creator: "The Futur",
    creatorUrl: "https://www.youtube.com/@thefutur",
  },
  {
    id: "4",
    title: "Typography Essentials",
    description: "Master typography fundamentals to create readable, professional designs for your server materials.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Graphic Design Fundamentals",
    creator: "The Futur",
    creatorUrl: "https://www.youtube.com/@thefutur",
  },
  {
    id: "5",
    title: "Discord Server Design and Layout",
    description: "Best practices for organizing and presenting your Discord server with clear visual hierarchy.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Discord Setup and Visuals",
    creator: "Community Creator",
  },
  {
    id: "6",
    title: "Creating Professional Discord Banners",
    description: "Design principles for creating eye-catching Discord banners that represent your server effectively.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Discord Setup and Visuals",
    creator: "Community Creator",
  },
  {
    id: "7",
    title: "Roleplay Server Structure Guide",
    description: "How to organize roleplay systems and hierarchies for ERLC communities.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Roleplay Structure",
    creator: "Community Creator",
  },
  {
    id: "8",
    title: "Community Growth Strategies",
    description: "Proven strategies for growing your ERLC community through effective advertising and engagement.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Advertising and Growth",
    creator: "Community Creator",
  },
  {
    id: "9",
    title: "Staff Management Best Practices",
    description: "Systems and approaches for managing staff effectively in ERLC communities.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Staff Systems",
    creator: "Community Creator",
  },
  {
    id: "10",
    title: "Building Trust in Online Communities",
    description: "Understanding how to build and maintain trust with your community members.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Community Management",
    creator: "Community Creator",
  },
  {
    id: "11",
    title: "Discord Bot Setup and Configuration",
    description: "Guide to setting up and configuring Discord bots for ERLC servers.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Automation and Bots",
    creator: "Community Creator",
  },
];

export function getResourcesByCategory(category?: string): Resource[] {
  if (!category) return resources;
  return resources.filter((resource) => resource.category === category);
}

export function searchResources(query: string): Resource[] {
  const lowerQuery = query.toLowerCase();
  return resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.category.toLowerCase().includes(lowerQuery)
  );
}
