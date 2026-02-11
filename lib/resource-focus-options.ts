import type { IconName } from "@/components/Icon";
import type { FocusArea } from "@/lib/resource-list-mapping";

/** Icon-based selection options for the Resources page. Maps to focus areas for the API. */
export const RESOURCE_FOCUS_OPTIONS: Array<{
  id: FocusArea;
  title: string;
  subtitle: string;
  icon: IconName;
}> = [
  {
    id: "Server Setup",
    title: "ERLC Server Setup",
    subtitle: "Discord, channels, structure",
    icon: "wrench",
  },
  {
    id: "Graphic Design",
    title: "Graphic Design",
    subtitle: "Logos, visuals, assets",
    icon: "palette",
  },
  {
    id: "Branding",
    title: "Branding",
    subtitle: "Identity, consistency",
    icon: "layers",
  },
  {
    id: "Automation / Bots",
    title: "Automation and Bots",
    subtitle: "Bots, workflows",
    icon: "chatbot",
  },
  {
    id: "Staff & Management",
    title: "Staff and Management",
    subtitle: "Moderation, teams",
    icon: "users",
  },
  {
    id: "Marketing & Growth",
    title: "Marketing and Growth",
    subtitle: "Outreach, growth",
    icon: "arrow-trend-up",
  },
  {
    id: "Documentation / SOPs",
    title: "Documentation and SOPs",
    subtitle: "Guides, processes",
    icon: "document",
  },
];
