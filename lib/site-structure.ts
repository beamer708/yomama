/**
 * Site information architecture and resource grouping.
 * Single source of truth for nav, footer, and resource hub.
 */

export const SITE_NAME = "Unity Vault";

/** Top-level nav: Resources, Support, Status, About. Resources = single page (assistant). */
export const NAV = {
  resources: { label: "Resources", href: "/resources" },
  support: { label: "Support", href: "/support" },
  status: { label: "Status", href: "/status" },
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

export type FooterLink = { label: string; href: string; external?: boolean };

export const SUPPORT_LINKS: FooterLink[] = [
  { label: "Discord", href: "https://discord.gg/3qpVpCBwj", external: true },
  { label: "Community Guides", href: "/community-guides" },
  { label: "Staff Application", href: "/staff-application" },
  { label: "Legal", href: "/legal" },
];

export const STATUS_URL = "https://unityvaultstatus.betteruptime.com";
