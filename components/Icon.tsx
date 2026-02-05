"use client";

export type IconName =
  | "home"
  | "book"
  | "books"
  | "file"
  | "document"
  | "info"
  | "menu-burger"
  | "cross"
  | "search"
  | "user"
  | "users"
  | "users-alt"
  | "bulb"
  | "check"
  | "checkbox"
  | "arrow-right"
  | "layers"
  | "palette"
  | "message-sms"
  | "arrow-trend-up"
  | "settings"
  | "chatbot"
  | "grid"
  | "apps"
  | "globe"
  | "wrench"
  | "brush"
  | "up-right-from-square"
  | "sparkles"
  | "compass"
  | "navigation"
  | "clock"
  | "video-camera"
  | "vault"
  | "resources"
  | "text";

/** Flaticon brand icons (Discord, YouTube, etc.) */
export type BrandIconName =
  | "discord"
  | "youtube"
  | "behance"
  | "flaticon"
  | "github"
  | "twitter"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "twitch"
  | "tiktok"
  | "spotify"
  | "reddit"
  | "whatsapp"
  | "telegram"
  | "vimeo"
  | "figma"
  | "dribbble"
  | "pinterest";

interface IconProps {
  name: IconName | BrandIconName;
  className?: string;
  "aria-hidden"?: boolean;
}

const iconClassMap: Record<IconName, string> = {
  home: "fi-br-home",
  book: "fi-br-book",
  books: "fi-br-books",
  file: "fi-br-file",
  document: "fi-br-document",
  info: "fi-br-info",
  "menu-burger": "fi-br-menu-burger",
  cross: "fi-br-cross",
  search: "fi-br-search",
  user: "fi-br-user",
  users: "fi-br-users",
  "users-alt": "fi-br-users-alt",
  bulb: "fi-br-bulb",
  check: "fi-br-check",
  checkbox: "fi-br-checkbox",
  "arrow-right": "fi-br-arrow-right",
  layers: "fi-br-layers",
  palette: "fi-br-palette",
  "message-sms": "fi-br-message-sms",
  "arrow-trend-up": "fi-br-arrow-trend-up",
  settings: "fi-br-settings",
  chatbot: "fi-br-chatbot",
  grid: "fi-br-grid",
  apps: "fi-br-apps",
  globe: "fi-br-globe",
  wrench: "fi-br-wrench",
  brush: "fi-br-brush",
  "up-right-from-square": "fi-br-up-right-from-square",
  sparkles: "fi-br-sparkles",
  compass: "fi-br-drafting-compass",
  navigation: "fi-br-navigation",
  clock: "fi-br-clock",
  "video-camera": "fi-br-video-camera",
  vault: "fi-br-vault",
  resources: "fi-br-resources",
  text: "fi-br-text",
};

const brandIconClassMap: Record<BrandIconName, string> = {
  discord: "fi-brands-discord",
  youtube: "fi-brands-youtube",
  behance: "fi-brands-behance",
  flaticon: "fi-brands-flaticon",
  github: "fi-brands-github",
  twitter: "fi-brands-twitter",
  instagram: "fi-brands-instagram",
  facebook: "fi-brands-facebook",
  linkedin: "fi-brands-linkedin",
  twitch: "fi-brands-twitch",
  tiktok: "fi-brands-tik-tok",
  spotify: "fi-brands-spotify",
  reddit: "fi-brands-reddit",
  whatsapp: "fi-brands-whatsapp",
  telegram: "fi-brands-telegram",
  vimeo: "fi-brands-vimeo",
  figma: "fi-brands-figma",
  dribbble: "fi-brands-dribbble",
  pinterest: "fi-brands-pinterest",
};

const brandNames = new Set<BrandIconName>(Object.keys(brandIconClassMap) as BrandIconName[]);

export default function Icon({ name, className = "", "aria-hidden": ariaHidden = true }: IconProps) {
  const isBrand = brandNames.has(name as BrandIconName);
  const fiClass = isBrand
    ? (brandIconClassMap[name as BrandIconName] ?? "fi-brands-discord")
    : (iconClassMap[name as IconName] ?? "fi-br-circle");
  return (
    <i
      className={`fi ${fiClass} ${className}`.trim()}
      aria-hidden={ariaHidden}
      style={{ fontStyle: "normal" }}
    />
  );
}
