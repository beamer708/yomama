import { Resource } from "@/lib/resources";
import Icon, { IconName, BrandIconName } from "@/components/Icon";

interface ResourceCardProps {
  resource: Resource;
}

const typeLabels: Record<Resource["type"], { label: string; icon: IconName | BrandIconName }> = {
  video: { label: "YouTube Video", icon: "youtube" },
  guide: { label: "Guide", icon: "book" },
  website: { label: "Website", icon: "globe" },
  tool: { label: "Tool", icon: "wrench" },
  document: { label: "Document", icon: "document" },
  "font-library": { label: "Font Library", icon: "text" },
  "color-tool": { label: "Color Tool", icon: "palette" },
  inspiration: { label: "Inspiration Platform", icon: "sparkles" },
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const typeInfo = typeLabels[resource.type];

  return (
    <div className="group rounded-lg bg-card border border-border p-6 hover:border-primary/30 hover:bg-card-hover transition-all">
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          <Icon name={typeInfo.icon} className="text-[10px]" />
          {typeInfo.label}
        </span>
        <span className="text-xs text-foreground/50">{resource.category}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {resource.title}
      </h3>
      <p className="text-sm text-foreground/70 mb-5 line-clamp-2 leading-relaxed">
        {resource.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
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
          <Icon name="up-right-from-square" className="text-sm" />
        </a>
      </div>
    </div>
  );
}
