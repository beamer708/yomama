export type ResourceType = "video" | "guide" | "website" | "tool" | "document" | "font-library" | "color-tool" | "inspiration";
export type ResourceSection = "youtube" | "website" | "discord";

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
  memberCount?: string; // For Discord communities
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
  "Emergency Response Liberty County Helpful Tips",
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
    title: "What Is Branding? 4 Minute Crash Course.",
    description: "A comprehensive tutorial covering server branding strategies, visual identity creation, and brand consistency for ERLC communities. Learn how to build a cohesive brand that represents your server effectively.",
    type: "video",
    url: "https://www.youtube.com/watch?v=sO4te2QNsHY",
    category: "Graphic Design",
    creator: "The Futur",
    section: "youtube",
    channelName: "The Futur",
  },
  {
    id: "1",
    title: "Minimal Logo Design",
    description: "A comprehensive playlist covering minimal logo design principles and techniques for creating clean, professional logos.",
    type: "video",
    url: "https://www.youtube.com/playlist?list=PLa_yy-WEeRrmTZUUK-nkAujtftVMZ8I5g",
    category: "Graphic Design",
    creator: "The Real Housewives of Florence",
    section: "youtube",
    channelName: "The Real Housewives of Florence",
  },
  {
    id: "16",
    title: "The ONLY Logo Design Guide You'll EVER Need (2025 Edition)",
    description: "A comprehensive guide covering essential graphic design principles, techniques, and best practices for creating professional visual content for ERLC server branding and community assets.",
    type: "video",
    url: "https://youtu.be/2RO44hoGdlE?si=ncRj6FjZeO0zH86G",
    category: "Graphic Design",
    creator: "Satori Graphics",
    section: "youtube",
    channelName: "Satori Graphics",
  },
  {
    id: "17",
    title: "Want YOUR Logo To STAND OUT? Watch This Now",
    description: "An educational video covering core graphic design concepts, composition, typography, and visual hierarchy to help create effective branding and visual assets for ERLC communities.",
    type: "video",
    url: "https://www.youtube.com/watch?v=NW3Hob026xI",
    category: "Graphic Design",
    creator: "The Futur",
    section: "youtube",
    channelName: "The Futur",
  },
  {
    id: "20",
    title: "How to build a brand in 7mins | Gary Vaynerchuk",
    description: "Learn essential graphic design techniques and workflows for creating professional visual content. Covers design principles, tools, and best practices for ERLC server branding and community assets.",
    type: "video",
    url: "https://www.youtube.com/watch?v=CK6uYrvD8qc",
    category: "Graphic Design",
    creator: "VaynerMedia",
    section: "youtube",
    channelName: "VaynerMedia",
  },
  {
    id: "21",
    title: "The Science of Building a Premium Brand",
    description: "Curated video on graphic design and branding for ERLC communities. Useful for server visuals, logos, and professional presentation.",
    type: "video",
    url: "https://youtu.be/hDsqIH6Xai8?si=FGarL0ii4ssoFN5V",
    category: "Graphic Design",
    creator: "Air",
    section: "youtube",
    channelName: "Air",
  },
  {
    id: "15",
    title: "The Ultimate Discord Server Guide 2026!",
    description: "A comprehensive guide for setting up and configuring Discord servers, including visual customization, channel organization, and server presentation for ERLC communities.",
    type: "video",
    url: "https://youtu.be/58Ex3zVmvS4?si=ylwDuEFEUcovwsKM",
    category: "Discord Server Visuals",
    creator: "Accede Productions",
    section: "youtube",
    channelName: "Accede Productions",
  },
  {
    id: "22",
    title: "Branding vs. Marketing: What's the Difference?",
    description: "Step-by-step video walkthrough for creating cleaner ERLC visuals and server branding assets with practical design tips and layout examples.",
    type: "video",
    url: "https://youtu.be/OgNnIn_juPo?si=t9XpKL_2uHHwx3q3",
    category: "Graphic Design",
    creator: "Philip VanDusen",
    section: "youtube",
    channelName: "Philip VanDusen",
  },
  {
    id: "23",
    title: "Create a FiveM Roleplay Logo for FREE in Photopea! (Quick & Easy)",
    description: "Practical YouTube tutorial with design tips and workflow ideas for creating stronger ERLC branding and community visuals.",
    type: "video",
    url: "https://youtu.be/K-OjOtJbpj4?si=Ln2vmtNMnBfQ_5XV",
    category: "Graphic Design",
    creator: "Cameron McSwain",
    section: "youtube",
    channelName: "Cameron McSwain",
  },
  {
    id: "24",
    title: "How to MAKE a Roleplay Logo for Your Server! (FiveM, Gmod, Roblox) *Free Template*",
    description: "Video covering layout, composition, and visual improvement techniques that can be applied to ERLC server branding assets.",
    type: "video",
    url: "https://youtu.be/jM1Ajo2hnmI?si=CY8tDRiLeZ1uaWA6",
    category: "Graphic Design",
    creator: "Cameron McSwain",
    section: "youtube",
    channelName: "Cameron McSwain",
  },
  {
    id: "25",
    title: "[FULL GUIDE] How To Make ANY ERLC LIVERIES FOR FREE! | Roblox ER:LC",
    description: "Focused design resource with practical branding guidance for creators building cleaner and more consistent ERLC visuals.",
    type: "video",
    url: "https://youtu.be/D4SLt23t8Fw?si=xZVnT3spSJPFo52D",
    category: "Graphic Design",
    creator: "Mad Shark",
    section: "youtube",
    channelName: "Mad Shark",
  },
  {
    id: "26",
    title: "How to make a Logo / Fivem Logo / Discord Logo animated (Tutorial Vid)",
    description: "Step-by-step tutorial for improving visual identity, including better graphic presentation for server posts and branding.",
    type: "video",
    url: "https://youtu.be/VkllA4Clb1o?si=nbN6dG2wCknfXVeF",
    category: "Graphic Design",
    creator: "GalaxyOfficial",
    section: "youtube",
    channelName: "GalaxyOfficial",
  },
  {
    id: "27",
    title: "How To Make An ERLC LOGO For YOUR PRIVATE Server! - ROBLOX Liberty County",
    description: "Workflow-focused guide to speed up the creation of ERLC graphics while keeping branding consistent and professional.",
    type: "video",
    url: "https://youtu.be/2HTbWgjGRaY?si=GLqQsEGvmAbhKFHY",
    category: "Graphic Design",
    creator: "Difficultyy",
    section: "youtube",
    channelName: "Difficultyy",
  },
  {
    id: "28",
    title: "ERLC Advance Livery Tutorial",
    description: "Advanced design techniques and examples for producing sharper ERLC visuals, logos, and branded server assets.",
    type: "video",
    url: "https://youtu.be/XeElcU9vs7s?si=CiPfUfo1XmtRo33F",
    category: "Graphic Design",
    creator: "MatthiasTHM",
    section: "youtube",
    channelName: "MatthiasTHM",
  },
  {
    id: "29",
    title: "Minimal Logo",
    description: "Beginner-friendly playlist covering practical AI workflows and tool usage to speed up content creation and project setup.",
    type: "video",
    url: "https://youtube.com/playlist?list=PLQXitECZ-yRN0gWhOFozR9qcXpjs4rSaE&si=B_no7WZ1q4ftsS-o",
    category: "Automation and Systems",
    creator: "Asm Arif",
    section: "youtube",
    channelName: "Asm Arif",
  },
  {
    id: "30",
    title: "How Brands Use Design & Marketing to Control Your Mind",
    description: "Video walkthrough of using AI tools effectively for faster workflows, idea generation, and productivity.",
    type: "video",
    url: "https://youtu.be/p6aF5ma7BiM?si=JoLd5Op4smTWJ2iA",
    category: "Automation and Systems",
    creator: "Design Theory",
    section: "youtube",
    channelName: "Design Theory",
  },
  {
    id: "31",
    title: "Welcome to ERLC - a complete guide",
    description: "A quick-start guide for new Emergency Response Liberty County players. Covers the basics to help you get started.",
    type: "video",
    url: "https://youtu.be/_op97mYl1Nw?si=VjDPYiHF7mxycffW",
    category: "Emergency Response Liberty County Helpful Tips",
    creator: "OMB Gaming",
    section: "youtube",
    channelName: "OMB Gaming",
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
  },
  {
    id: "chatgpt",
    title: "ChatGPT",
    description: "AI assistant for brainstorming, writing, planning, and accelerating creative workflows for server projects and resource planning.",
    type: "website",
    url: "https://chatgpt.com/",
    category: "Discord Utilities",
    creator: "OpenAI",
    creatorUrl: "https://chatgpt.com/",
    section: "website",
  },
  {
    id: "cursor",
    title: "Cursor",
    description: "AI-powered code editor for faster building, editing, and automation workflows. Helpful for custom tools and development tasks.",
    type: "website",
    url: "https://cursor.com",
    category: "Discord Utilities",
    creator: "Cursor",
    creatorUrl: "https://cursor.com",
    section: "website",
  },
  {
    id: "32",
    title: "Designercize - Design Brief Generator",
    description: "Random design brief generator for practicing logo, branding, and UI design skills. Useful for sharpening creative range and pushing your design abilities with realistic prompts.",
    type: "tool",
    url: "https://designercize.com/",
    category: "Graphic Design Tools",
    creator: "Designercize",
    creatorUrl: "https://designercize.com/",
    section: "website",
    isNew: true,
  },
  {
    id: "33",
    title: "Font Joy - Font Pairing",
    description: "AI-powered font pairing tool that generates visually balanced font combinations for logos, headings, and body text. Great for finding complementary typography for ERLC server branding.",
    type: "font-library",
    url: "https://fontjoy.com/",
    category: "Fonts and Typography",
    creator: "Font Joy",
    creatorUrl: "https://fontjoy.com/",
    section: "website",
    isNew: true,
  },
  {
    id: "34",
    title: "Fonts In Use - Typography Inspiration",
    description: "Curated archive of real-world font usage across branding, print, and design. Use as reference when selecting typefaces for ERLC server logos and visual assets.",
    type: "inspiration",
    url: "https://fontsinuse.com/",
    category: "Fonts and Typography",
    creator: "Fonts In Use",
    creatorUrl: "https://fontsinuse.com/",
    section: "website",
    isNew: true,
  },
  {
    id: "35",
    title: "Font Space - Free Fonts",
    description: "Large library of free and commercial fonts for logos, branding, and graphic design. Useful for finding unique typefaces for ERLC server branding and Discord visuals.",
    type: "font-library",
    url: "https://www.fontspace.com/",
    category: "Fonts and Typography",
    creator: "Font Space",
    creatorUrl: "https://www.fontspace.com/",
    section: "website",
    isNew: true,
  },
  {
    id: "36",
    title: "Logo Lab - Logo Testing Tool",
    description: "Test your logo against real-world conditions including scalability, color blindness, background contrast, and legibility. Essential for validating ERLC server logos before publishing.",
    type: "tool",
    url: "https://logolab.app/#tests",
    category: "Graphic Design Tools",
    creator: "Logo Lab",
    creatorUrl: "https://logolab.app/",
    section: "website",
    isNew: true,
  },
  {
    id: "37",
    title: "YouLearn AI - AI Learning Assistant",
    description: "AI-powered learning assistant that lets you upload videos, PDFs, and documents to ask questions and get instant explanations. Useful for studying design, branding, and community-building content faster.",
    type: "website",
    url: "https://www.youlearn.ai",
    category: "Discord Utilities",
    creator: "YouLearn",
    creatorUrl: "https://www.youlearn.ai",
    section: "website",
    isNew: true,
  },
  {
    id: "38",
    title: "Thumbnail Preview - YouTube Thumbnail Tester",
    description: "Preview how your YouTube thumbnail looks in search results, suggested videos, and mobile before publishing. Useful for ERLC content creators optimizing video branding and click-through rate.",
    type: "tool",
    url: "https://thumbnailpreview.com/",
    category: "Graphic Design Tools",
    creator: "Thumbnail Preview",
    creatorUrl: "https://thumbnailpreview.com/",
    section: "website",
    isNew: true,
  },
  // Discord Community Resources
  {
    id: "discord-erlc-hub",
    title: "ER:LC Hub Community",
    description: "The official Discord server for ER:LC Hub. Covers map customizations, vehicle stats, spawn locations, and community resources for ERLC roleplay structure and game information.",
    type: "website",
    url: "https://discord.gg/7KfgS5M4Jn",
    category: "ERLC Communities",
    creator: "Syce Gaming",
    creatorUrl: "https://discord.gg/7KfgS5M4Jn",
    section: "discord",
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
