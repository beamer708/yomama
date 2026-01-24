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
  "Discord Setup",
  "Roleplay Structure",
  "Advertising and Growth",
  "Staff Systems",
  "ERLC Optimization",
  "Community Management",
  "Automation and Bots",
];

// Placeholder resources - in production, this would come from a database or CMS
export const resources: Resource[] = [
  {
    id: "1",
    title: "ERLC Server Branding Guide",
    description: "Comprehensive guide to creating professional server branding and visual identity.",
    type: "guide",
    url: "#",
    category: "Server Branding",
    creator: "Community Creator",
  },
  {
    id: "2",
    title: "Discord Server Setup Tutorial",
    description: "Step by step guide to setting up a Discord server for ERLC communities.",
    type: "video",
    url: "#",
    category: "Discord Setup",
    creator: "Community Creator",
  },
  {
    id: "3",
    title: "Roleplay Structure Framework",
    description: "Framework for organizing roleplay systems and hierarchies.",
    type: "document",
    url: "#",
    category: "Roleplay Structure",
    creator: "Community Creator",
  },
  {
    id: "4",
    title: "ERLC Advertising Strategies",
    description: "Proven strategies for growing your ERLC community through advertising.",
    type: "guide",
    url: "#",
    category: "Advertising and Growth",
    creator: "Community Creator",
  },
  {
    id: "5",
    title: "Staff Management System",
    description: "System for managing staff effectively in ERLC communities.",
    type: "guide",
    url: "#",
    category: "Staff Systems",
    creator: "Community Creator",
  },
  {
    id: "6",
    title: "ERLC Optimization Tools",
    description: "Tools and techniques for optimizing ERLC server performance.",
    type: "tool",
    url: "#",
    category: "ERLC Optimization",
    creator: "Community Creator",
  },
  {
    id: "7",
    title: "Community Management Best Practices",
    description: "Best practices for managing and growing ERLC communities.",
    type: "guide",
    url: "#",
    category: "Community Management",
    creator: "Community Creator",
  },
  {
    id: "8",
    title: "Discord Bot Setup Guide",
    description: "Guide to setting up and configuring Discord bots for ERLC servers.",
    type: "guide",
    url: "#",
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
