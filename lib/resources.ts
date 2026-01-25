export type ResourceType = "video" | "guide" | "website" | "tool" | "document" | "font-library" | "color-tool" | "inspiration";

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
export const resources: Resource[] = [
  {
    id: "1",
    title: "Minimal Logo Design",
    description: "A comprehensive playlist covering minimal logo design principles and techniques for creating clean, professional logos.",
    type: "video",
    url: "https://www.youtube.com/playlist?list=PLa_yy-WEeRrmTZUUK-nkAujtftVMZ8I5g",
    category: "Graphic Design Fundamentals",
    creator: "YouTube Creator",
  },
  {
    id: "4",
    title: "Flaticon - Interface Icons",
    description: "High-quality static interface icons for branding, websites, UI elements, panels, and embeds. Perfect for creating professional visual assets for ERLC server branding and Discord visuals.",
    type: "website",
    url: "https://www.flaticon.com/uicons/interface-icons",
    category: "Graphic Design Fundamentals",
    creator: "Flaticon",
    creatorUrl: "https://www.flaticon.com",
  },
  {
    id: "7",
    title: "DaFont Free - Fonts and Typography",
    description: "Font discovery and typography inspiration for logos, branding, and server visuals. External font resource; individual fonts may have separate licenses. Use for ERLC branding and Discord text styling.",
    type: "font-library",
    url: "https://www.dafontfree.io",
    category: "Graphic Design Fundamentals",
    creator: "DaFont Free",
    creatorUrl: "https://www.dafontfree.io",
  },
  {
    id: "8",
    title: "ColorHunt - Color Palettes",
    description: "Color palette tool for consistent branding, Discord role colors, and embed design. Helps ERLC servers build a cohesive visual identity.",
    type: "color-tool",
    url: "https://colorhunt.co",
    category: "Graphic Design Fundamentals",
    creator: "ColorHunt",
    creatorUrl: "https://colorhunt.co",
  },
  {
    id: "9",
    title: "Picular - Color Tools",
    description: "Color discovery and palette tools for branding, role colors, and visual identity. Use for ERLC server branding and Discord embed design.",
    type: "color-tool",
    url: "https://www.picular.co",
    category: "Graphic Design Fundamentals",
    creator: "Picular",
    creatorUrl: "https://www.picular.co",
  },
  {
    id: "10",
    title: "Scheme Color - Color Palettes",
    description: "Color palette generator for branding, Discord role colors, and embed design. Supports consistent visual identity across ERLC server assets.",
    type: "color-tool",
    url: "https://www.schemecolor.com",
    category: "Graphic Design Fundamentals",
    creator: "Scheme Color",
    creatorUrl: "https://www.schemecolor.com",
  },
  {
    id: "11",
    title: "Behance - Design Inspiration",
    description: "Design inspiration from professional creatives. Use for reference only: logos, layouts, banners, and overall brand direction for ERLC servers.",
    type: "inspiration",
    url: "https://www.behance.net",
    category: "Graphic Design Fundamentals",
    creator: "Adobe Behance",
    creatorUrl: "https://www.behance.net",
  },
  {
    id: "2",
    title: "ER:LC Hub - Interactive Map & Vehicle Stats",
    description: "Interactive map for ERLC with vehicle stats, map layers, custom layers, and comprehensive game location information including spawns, buildings, NPCs, and more.",
    type: "website",
    url: "https://erlc-hub.pages.dev/",
    category: "Roleplay Structure",
    creator: "Syce Gaming",
    creatorUrl: "https://discord.gg/7KfgS5M4Jn",
  },
  {
    id: "3",
    title: "ER:LC Hub Discord Community",
    description: "Discord community for ER:LC Hub featuring map customizations, ERLC stats, and community resources for roleplay structure and game information.",
    type: "website",
    url: "https://discord.gg/7KfgS5M4Jn",
    category: "Roleplay Structure",
    creator: "Syce Gaming",
  },
  {
    id: "5",
    title: "Flaticon - Static Interface Icons for Discord",
    description: "Static Discord-style icons and emojis compatible for Discord usage including emojis, role icons, and panel graphics. Perfect for improving visual quality of ERLC server interfaces.",
    type: "website",
    url: "https://www.flaticon.com/uicons/interface-icons",
    category: "Discord Setup and Visuals",
    creator: "Flaticon",
    creatorUrl: "https://www.flaticon.com",
  },
  {
    id: "6",
    title: "Flaticon - Animated Icons for Discord",
    description: "Animated icons and emojis for Discord usage. Compatible for animated emojis, role icons, and dynamic panel graphics. Enhances visual appeal of ERLC server interfaces with motion.",
    type: "website",
    url: "https://www.flaticon.com/animated-icons",
    category: "Discord Setup and Visuals",
    creator: "Flaticon",
    creatorUrl: "https://www.flaticon.com",
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
