/**
 * Site information architecture and resource grouping.
 * Single source of truth for nav, footer, and resource hub.
 */

export const SITE_NAME = "Unity Vault";

/** Top-level nav: Resources, Resource List Creator, Support, Updates & Status, Partners, About */
export const NAV = {
  resources: {
    label: "Resources",
    href: "/resources",
    groups: [
      {
        label: "Server Resources",
        href: "/resources?group=server",
        description: "Discord, community, automation, roleplay structure",
      },
      {
        label: "Graphic Design and Branding",
        href: "/resources?group=design",
        description: "Visual identity, logos, assets",
      },
      {
        label: "Tools and Utilities",
        href: "/resources?group=tools",
        description: "Fonts, color tools, Discord utilities",
      },
    ] as const,
  },
  listCreator: { label: "List Creator", href: "/resource-list-creator" },
  support: { label: "Support", href: "/support" },
  status: { label: "Updates & Status", href: "/status" },
  partners: { label: "Partners", href: "/partners" },
  about: { label: "About", href: "/about" },
} as const;

/** Map resource groups (URL param) to category lists from lib/resources */
export const RESOURCE_GROUP_TO_CATEGORIES: Record<string, string[]> = {
  server: [
    "Discord Server Visuals",
    "Community Building",
    "Roleplay Structure",
    "Advertising and Growth",
    "Automation and Systems",
  ],
  design: [
    "Graphic Design",
  ],
  tools: [
    "Graphic Design Tools",
    "Fonts and Typography",
    "Color Palette Tools",
    "Icons and Emojis",
    "Animated Icons",
    "Design Inspiration",
    "Discord Utilities",
  ],
};

/** Human-readable group labels for headings and breadcrumbs */
export const RESOURCE_GROUP_LABELS: Record<string, string> = {
  server: "Server Resources",
  design: "Graphic Design and Branding",
  tools: "Tools and Utilities",
};

export const SUPPORT_LINKS = [
  { label: "Discord", href: "https://discord.gg/rJECs3rpDh", external: true },
  { label: "Community Guides", href: "/community-guides" },
  { label: "Staff Application", href: "/staff-application" },
  { label: "Legal", href: "/legal" },
] as const;

export const STATUS_URL = "https://unityvaultstatus.betteruptime.com";
