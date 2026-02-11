export type ResourceType = "video" | "guide" | "website" | "tool" | "document" | "font-library" | "color-tool" | "inspiration";
export type ResourceSection = "youtube" | "website";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  category: string;
  creator: string;
  creatorUrl?: string;
  section: ResourceSection;
  channelName?: string; // For YouTube videos
  thumbnailUrl?: string; // For YouTube videos
  isNew?: boolean;
}

// YouTube Resource Categories
export const youtubeCategories = [
  "Graphic Design",
  "Discord Server Visuals",
  "Community Building",
  "Advertising and Growth",
  "Roleplay Structure",
  "Automation and Systems",
];

// Website Resource Categories
export const websiteCategories = [
  "Graphic Design Tools",
  "Fonts and Typography",
  "Color Palette Tools",
  "Icons and Emojis",
  "Animated Icons",
  "Design Inspiration",
  "Discord Utilities",
];

// Legacy categories for backward compatibility
export const resourceCategories = [
  ...youtubeCategories,
  ...websiteCategories,
];

// Resources - in production, this would come from a database or CMS
// Most resources are YouTube videos, especially from high-quality design channels
export const resources: Resource[] = [
  // YouTube Resources
  {
    id: "19",
    title: "Server Branding Guide",
    description: "A comprehensive tutorial covering server branding strategies, visual identity creation, and brand consistency for ERLC communities. Learn how to build a cohesive brand that represents your server effectively.",
    type: "video",
    url: "https://www.youtube.com/watch?v=sO4te2QNsHY",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
  },
  {
    id: "1",
    title: "Minimal Logo Design",
    description: "A comprehensive playlist covering minimal logo design principles and techniques for creating clean, professional logos.",
    type: "video",
    url: "https://www.youtube.com/playlist?list=PLa_yy-WEeRrmTZUUK-nkAujtftVMZ8I5g",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
    isNew: true,
  },
  {
    id: "16",
    title: "Graphic Design Tutorial",
    description: "A comprehensive guide covering essential graphic design principles, techniques, and best practices for creating professional visual content for ERLC server branding and community assets.",
    type: "video",
    url: "https://youtu.be/2RO44hoGdlE?si=ncRj6FjZeO0zH86G",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
  },
  {
    id: "17",
    title: "Graphic Design Fundamentals",
    description: "An educational video covering core graphic design concepts, composition, typography, and visual hierarchy to help create effective branding and visual assets for ERLC communities.",
    type: "video",
    url: "https://www.youtube.com/watch?v=NW3Hob026xI",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
  },
  {
    id: "20",
    title: "Graphic Design Techniques",
    description: "Learn essential graphic design techniques and workflows for creating professional visual content. Covers design principles, tools, and best practices for ERLC server branding and community assets.",
    type: "video",
    url: "https://www.youtube.com/watch?v=CK6uYrvD8qc",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
  },
  {
    id: "21",
    title: "Graphic Design and Branding",
    description: "Curated video on graphic design and branding for ERLC communities. Useful for server visuals, logos, and professional presentation.",
    type: "video",
    url: "https://youtu.be/hDsqIH6Xai8?si=FGarL0ii4ssoFN5V",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
  },
  {
    id: "15",
    title: "Discord Setup Tutorial",
    description: "A comprehensive guide for setting up and configuring Discord servers, including visual customization, channel organization, and server presentation for ERLC communities.",
    type: "video",
    url: "https://youtu.be/58Ex3zVmvS4?si=ylwDuEFEUcovwsKM",
    category: "Discord Server Visuals",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
    isNew: true,
  },
  {
    id: "22",
    title: "ERLC Visual Design Walkthrough",
    description: "Step-by-step video walkthrough for creating cleaner ERLC visuals and server branding assets with practical design tips and layout examples.",
    type: "video",
    url: "https://youtu.be/OgNnIn_juPo?si=t9XpKL_2uHHwx3q3",
    category: "Graphic Design",
    creator: "YouTube Creator",
    section: "youtube",
    channelName: "YouTube Creator",
    isNew: true,
  },
  // Website Resources
  {
    id: "4",
    title: "Flaticon - Interface Icons",
    description: "High-quality static interface icons for branding, websites, UI elements, panels, and embeds. Perfect for creating professional visual assets for ERLC server branding and Discord visuals.",
    type: "website",
    url: "https://www.flaticon.com/uicons/interface-icons",
    category: "Icons and Emojis",
    creator: "Flaticon",
    creatorUrl: "https://www.flaticon.com",
    section: "website",
  },
  {
    id: "5",
    title: "Flaticon - Static Interface Icons for Discord",
    description: "Static Discord-style icons and emojis compatible for Discord usage including emojis, role icons, and panel graphics. Perfect for improving visual quality of ERLC server interfaces.",
    type: "website",
    url: "https://www.flaticon.com/uicons/interface-icons",
    category: "Icons and Emojis",
    creator: "Flaticon",
    creatorUrl: "https://www.flaticon.com",
    section: "website",
  },
  {
    id: "6",
    title: "Flaticon - Animated Icons for Discord",
    description: "Animated icons and emojis for Discord usage. Compatible for animated emojis, role icons, and dynamic panel graphics. Enhances visual appeal of ERLC server interfaces with motion.",
    type: "website",
    url: "https://www.flaticon.com/animated-icons",
    category: "Animated Icons",
    creator: "Flaticon",
    creatorUrl: "https://www.flaticon.com",
    section: "website",
  },
  {
    id: "7",
    title: "DaFont Free - Fonts and Typography",
    description: "Font discovery and typography inspiration for logos, branding, and server visuals. External font resource; individual fonts may have separate licenses. Use for ERLC branding and Discord text styling.",
    type: "font-library",
    url: "https://www.dafontfree.io",
    category: "Fonts and Typography",
    creator: "DaFont Free",
    creatorUrl: "https://www.dafontfree.io",
    section: "website",
  },
  {
    id: "8",
    title: "ColorHunt - Color Palettes",
    description: "Color palette tool for consistent branding, Discord role colors, and embed design. Helps ERLC servers build a cohesive visual identity.",
    type: "color-tool",
    url: "https://colorhunt.co",
    category: "Color Palette Tools",
    creator: "ColorHunt",
    creatorUrl: "https://colorhunt.co",
    section: "website",
  },
  {
    id: "9",
    title: "Picular - Color Tools",
    description: "Color discovery and palette tools for branding, role colors, and visual identity. Use for ERLC server branding and Discord embed design.",
    type: "color-tool",
    url: "https://www.picular.co",
    category: "Color Palette Tools",
    creator: "Picular",
    creatorUrl: "https://www.picular.co",
    section: "website",
  },
  {
    id: "10",
    title: "Scheme Color - Color Palettes",
    description: "Color palette generator for branding, Discord role colors, and embed design. Supports consistent visual identity across ERLC server assets.",
    type: "color-tool",
    url: "https://www.schemecolor.com",
    category: "Color Palette Tools",
    creator: "Scheme Color",
    creatorUrl: "https://www.schemecolor.com",
    section: "website",
  },
  {
    id: "11",
    title: "Behance - Design Inspiration",
    description: "Design inspiration from professional creatives. Use for reference only: logos, layouts, banners, and overall brand direction for ERLC servers.",
    type: "inspiration",
    url: "https://www.behance.net",
    category: "Design Inspiration",
    creator: "Adobe Behance",
    creatorUrl: "https://www.behance.net",
    section: "website",
  },
  {
    id: "18",
    title: "Pinterest - Design Inspiration",
    description: "Visual discovery platform for design inspiration including logos, branding, layouts, color schemes, and creative concepts. Use for reference and inspiration when creating visual assets for ERLC server branding.",
    type: "inspiration",
    url: "https://www.pinterest.com",
    category: "Design Inspiration",
    creator: "Pinterest",
    creatorUrl: "https://www.pinterest.com",
    section: "website",
  },
  {
    id: "iconify",
    title: "Iconify - Open Source Icon Sets",
    description: "Massive library of open source icons (100+ icon sets, 200k+ icons) for Discord emojis, bot interfaces, role icons, and server graphics. Includes Material, Lucide, Heroicons, Phosphor, and many more. Copy SVG or use via API/CDN.",
    type: "website",
    url: "https://icon-sets.iconify.design",
    category: "Discord Utilities",
    creator: "Iconify",
    creatorUrl: "https://iconify.design",
    section: "website",
    isNew: true,
  },
  {
    id: "2",
    title: "ER:LC Hub - Interactive Map & Vehicle Stats",
    description: "Interactive map for ERLC with vehicle stats, map layers, custom layers, and comprehensive game location information including spawns, buildings, NPCs, and more.",
    type: "website",
    url: "https://erlc-hub.pages.dev/",
    category: "Discord Utilities",
    creator: "Syce Gaming",
    creatorUrl: "https://discord.gg/7KfgS5M4Jn",
    section: "website",
    isNew: true,
  },
  {
    id: "3",
    title: "ER:LC Hub Discord Community",
    description: "Discord community for ER:LC Hub featuring map customizations, ERLC stats, and community resources for roleplay structure and game information.",
    type: "website",
    url: "https://discord.gg/7KfgS5M4Jn",
    category: "Discord Utilities",
    creator: "Syce Gaming",
    section: "website",
  },
  {
    id: "unity-vault-discord",
    title: "Unity Vault Discord",
    description: "Official Unity Vault Discord server for support, updates, announcements, and community discussion.",
    type: "website",
    url: "https://discord.gg/3qpVpCBwj",
    category: "Discord Utilities",
    creator: "Unity Vault",
    creatorUrl: "https://discord.gg/3qpVpCBwj",
    section: "website",
    isNew: true,
  },
  {
    id: "12",
    title: "Melonly",
    description: "ERLC roleplay platform and community hub for server discovery, profiles, and roleplay structure resources.",
    type: "website",
    url: "https://melonly.xyz",
    category: "Discord Utilities",
    creator: "Melonly",
    creatorUrl: "https://melonly.xyz",
    section: "website",
    isNew: true,
  },
  {
    id: "13",
    title: "Melonly - Servers",
    description: "Discover and browse ERLC servers on Melonly. Useful for advertising, server discovery, and growth within the ERLC community.",
    type: "website",
    url: "https://melonly.xyz/servers",
    category: "Discord Utilities",
    creator: "Melonly",
    creatorUrl: "https://melonly.xyz",
    section: "website",
    isNew: true,
  },
  {
    id: "14",
    title: "Melonly - Profiles",
    description: "User profiles and community directory on Melonly. Helps with advertising, networking, and connecting with the ERLC community.",
    type: "website",
    url: "https://melonly.xyz/profiles",
    category: "Discord Utilities",
    creator: "Melonly",
    creatorUrl: "https://melonly.xyz",
    section: "website",
    isNew: true,
  },
];

export function getResourcesByCategory(category?: string, section?: ResourceSection): Resource[] {
  let filtered = resources;
  if (section) {
    filtered = filtered.filter((resource) => resource.section === section);
  }
  if (category) {
    filtered = filtered.filter((resource) => resource.category === category);
  }
  return filtered;
}

export function getResourcesBySection(section: ResourceSection): Resource[] {
  return resources.filter((resource) => resource.section === section);
}

export function searchResources(query: string, section?: ResourceSection): Resource[] {
  const lowerQuery = query.toLowerCase();
  let filtered = resources;
  if (section) {
    filtered = filtered.filter((resource) => resource.section === section);
  }
  return filtered.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.category.toLowerCase().includes(lowerQuery) ||
      (resource.channelName && resource.channelName.toLowerCase().includes(lowerQuery))
  );
}

// Helper to extract YouTube video ID for thumbnail
export function getYouTubeThumbnail(url: string): string {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  if (videoIdMatch) {
    return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
  }
  return "";
}
