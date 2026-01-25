import { Resource } from "@/lib/resources";
import { Video, BookOpen, Globe, Wrench, FileText, ExternalLink, Type, Palette, Sparkles } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

const typeLabels: Record<Resource["type"], { label: string; icon: typeof Video }> = {
  video: { label: "YouTube Video", icon: Video },
  guide: { label: "Guide", icon: BookOpen },
  website: { label: "Website", icon: Globe },
  tool: { label: "Tool", icon: Wrench },
  document: { label: "Document", icon: FileText },
  "font-library": { label: "Font Library", icon: Type },
  "color-tool": { label: "Color Tool", icon: Palette },
  inspiration: { label: "Inspiration Platform", icon: Sparkles },
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const typeInfo = typeLabels[resource.type];
  const TypeIcon = typeInfo.icon;

  return (
    <div className="group rounded-lg bg-card border border-border p-6 hover:border-primary/40 hover:bg-card-hover transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          <TypeIcon className="h-3 w-3" />
          {typeInfo.label}
        </span>
        <span className="text-xs text-foreground/60">{resource.category}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {resource.title}
      </h3>
      <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
        {resource.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-xs text-foreground/60">
          By{" "}
          {resource.creatorUrl ? (
            <a
              href={resource.creatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {resource.creator}
            </a>
          ) : (
            <span>{resource.creator}</span>
          )}
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View Resource
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
