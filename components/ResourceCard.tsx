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
  inspiration: { label: "Inspiration", icon: "sparkles" },
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const typeInfo = typeLabels[resource.type];

  return (
    <div className="group gradient-border gradient-card card-hover-lift flex flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          <Icon name={typeInfo.icon} className="text-[10px]" />
          {typeInfo.label}
        </span>
        {resource.isNew && (
          <span className="rounded-lg bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
            New
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {resource.title}
      </h3>
      <p className="mb-4 flex-1 line-clamp-2 text-sm text-muted-foreground">
        {resource.description}
      </p>
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
        <span className="truncate text-xs text-muted-foreground">
          {resource.creatorUrl ? (
            <a
              href={resource.creatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {resource.creator}
            </a>
          ) : (
            resource.creator
          )}
        </span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 shrink-0 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          Open
          <Icon name="up-right-from-square" className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
