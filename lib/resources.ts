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

// Resources - in production, this would come from a database or CMS
// Most resources are YouTube videos, especially from high-quality design channels
export const resources: Resource[] = [];

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
