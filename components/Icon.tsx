"use client";

import {
  AppWindow,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Check,
  CheckSquare,
  CirclePlay,
  Clock3,
  Compass,
  ExternalLink,
  File,
  FileText,
  Folder,
  Globe,
  Grid3X3,
  Home,
  Info,
  Layers,
  Lightbulb,
  Menu,
  MessageCircle,
  Monitor,
  Navigation,
  Palette,
  Search,
  Settings,
  Shield,
  Sparkles,
  Type,
  User,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

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
  | "computer"
  | "globe"
  | "wrench"
  | "up-right-from-square"
  | "sparkles"
  | "compass"
  | "navigation"
  | "clock"
  | "video-camera"
  | "vault"
  | "resources"
  | "text";

/** Brand icon aliases rendered with Lucide equivalents. */
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

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  book: BookOpen,
  books: BookOpen,
  file: File,
  document: FileText,
  info: Info,
  "menu-burger": Menu,
  cross: X,
  search: Search,
  user: User,
  users: Users,
  "users-alt": Users,
  bulb: Lightbulb,
  check: Check,
  checkbox: CheckSquare,
  "arrow-right": ArrowRight,
  layers: Layers,
  palette: Palette,
  "message-sms": MessageCircle,
  "arrow-trend-up": BarChart3,
  settings: Settings,
  chatbot: Bot,
  grid: Grid3X3,
  apps: AppWindow,
  computer: Monitor,
  globe: Globe,
  wrench: Wrench,
  "up-right-from-square": ExternalLink,
  sparkles: Sparkles,
  compass: Compass,
  navigation: Navigation,
  clock: Clock3,
  "video-camera": CirclePlay,
  vault: Shield,
  resources: Folder,
  text: Type,
};

const brandIconMap: Record<BrandIconName, LucideIcon> = {
  discord: MessageCircle,
  youtube: CirclePlay,
  behance: Briefcase,
  flaticon: Grid3X3,
  github: Folder,
  twitter: MessageCircle,
  instagram: CirclePlay,
  facebook: MessageCircle,
  linkedin: Briefcase,
  twitch: CirclePlay,
  tiktok: CirclePlay,
  spotify: CirclePlay,
  reddit: MessageCircle,
  whatsapp: MessageCircle,
  telegram: MessageCircle,
  vimeo: CirclePlay,
  figma: Palette,
  dribbble: CirclePlay,
  pinterest: Palette,
};

const brandNames = new Set<BrandIconName>(Object.keys(brandIconMap) as BrandIconName[]);

export default function Icon({ name, className = "", "aria-hidden": ariaHidden = true }: IconProps) {
  if (name === "discord") {
    return <FaDiscord className={`text-muted-foreground ${className}`.trim()} aria-hidden={ariaHidden} />;
  }
  const isBrand = brandNames.has(name as BrandIconName);
  const LucideComponent = isBrand
    ? (brandIconMap[name as BrandIconName] ?? MessageCircle)
    : (iconMap[name as IconName] ?? Info);
  return (
    <LucideComponent
      className={`text-muted-foreground ${className}`.trim()}
      aria-hidden={ariaHidden}
      strokeWidth={1.8}
    />
  );
}
