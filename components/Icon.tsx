"use client";

import {
  ArrowRight,
  Book,
  Bot,
  Check,
  CheckSquare,
  Clock,
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
  LayoutGrid,
  Library,
  Lightbulb,
  Menu,
  MessageSquare,
  Monitor,
  Navigation,
  Palette,
  Search,
  Settings,
  Shield,
  Sparkles,
  TrendingUp,
  Type,
  User,
  Users,
  Video,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaBehance,
  FaDiscord,
  FaDribbble,
  FaFacebook,
  FaFigma,
  FaGithub,
  FaIcons,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaRedditAlien,
  FaSpotify,
  FaTelegram,
  FaTiktok,
  FaTwitch,
  FaVimeoV,
  FaWhatsapp,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

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

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  book: Book,
  books: Library,
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
  "message-sms": MessageSquare,
  "arrow-trend-up": TrendingUp,
  settings: Settings,
  chatbot: Bot,
  grid: Grid3X3,
  apps: LayoutGrid,
  computer: Monitor,
  globe: Globe,
  wrench: Wrench,
  "up-right-from-square": ExternalLink,
  sparkles: Sparkles,
  compass: Compass,
  navigation: Navigation,
  clock: Clock,
  "video-camera": Video,
  vault: Shield,
  resources: Folder,
  text: Type,
};

const brandIconMap: Record<BrandIconName, IconType> = {
  discord: FaDiscord,
  youtube: FaYoutube,
  behance: FaBehance,
  flaticon: FaIcons,
  github: FaGithub,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  twitch: FaTwitch,
  tiktok: FaTiktok,
  spotify: FaSpotify,
  reddit: FaRedditAlien,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  vimeo: FaVimeoV,
  figma: FaFigma,
  dribbble: FaDribbble,
  pinterest: FaPinterest,
};

const brandNames = new Set<BrandIconName>(Object.keys(brandIconMap) as BrandIconName[]);

export default function Icon({ name, className = "", "aria-hidden": ariaHidden = true }: IconProps) {
  const isBrand = brandNames.has(name as BrandIconName);
  if (isBrand) {
    const BrandComponent = brandIconMap[name as BrandIconName] ?? FaDiscord;
    return <BrandComponent className={className} aria-hidden={ariaHidden} />;
  }
  const LucideComponent = iconMap[name as IconName] ?? Info;
  return <LucideComponent className={className} aria-hidden={ariaHidden} strokeWidth={2.1} />;
}
