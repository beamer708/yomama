import { Resource } from "@/lib/resources";
import Icon, { IconName, BrandIconName } from "@/components/Icon";

interface WebsiteResourceCardProps {
  resource: Resource;
  showListActions?: boolean;
  isInList?: boolean;
  onToggleList?: (resourceId: string) => void;
}

const typeLabels: Record<Resource["type"], { label: string; icon: IconName | BrandIconName }> = {
  video: { label: "Video", icon: "youtube" },
  guide: { label: "Guide", icon: "book" },
  website: { label: "Website", icon: "globe" },
  tool: { label: "Tool", icon: "wrench" },
  document: { label: "Document", icon: "document" },
  "font-library": { label: "Font Library", icon: "text" },
  "color-tool": { label: "Color Tool", icon: "palette" },
  inspiration: { label: "Inspiration", icon: "sparkles" },
};

export default function WebsiteResourceCard({
  resource,
  showListActions = false,
  isInList = false,
  onToggleList,
}: WebsiteResourceCardProps) {
  const typeInfo = typeLabels[resource.type];

  return (
    <article className="group relative block rounded-2xl border border-border bg-card/90 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card-hover">
      {resource.isNew && (
        <span className="absolute top-3 right-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-background">
          New
        </span>
      )}
      {/* Type Badge */}
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          <Icon name={typeInfo.icon} className="text-[10px]" />
          {typeInfo.label}
        </span>
        <span className="text-xs text-muted-foreground">{resource.category}</span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1"
        >
          {resource.title}
          <Icon name="up-right-from-square" className="text-xs" />
        </a>
      </h3>
      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {resource.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-4">
        <div className="text-xs text-muted-foreground">
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
            <span>{resource.creator}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showListActions ? (
            <button
              type="button"
              onClick={() => onToggleList?.(resource.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                isInList
                  ? "bg-primary/20 text-primary hover:bg-primary/30"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              <Icon name={isInList ? "check" : "book"} className="text-xs" />
              {isInList ? "Added" : "Add to list"}
            </button>
          ) : null}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary-hover transition-colors"
          >
            Visit Site
            <Icon name="up-right-from-square" className="text-sm" />
          </a>
        </div>
      </div>
    </article>
  );
}
