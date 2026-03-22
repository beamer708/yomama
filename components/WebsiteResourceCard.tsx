import { Resource } from "@/lib/resources";
import Icon from "@/components/Icon";

interface WebsiteResourceCardProps {
  resource: Resource;
}

export default function WebsiteResourceCard({ resource }: WebsiteResourceCardProps) {
  return (
    <article className="resource-card group relative p-5">
      {resource.isNew && (
        <span className="resource-tag absolute top-4 right-4">New</span>
      )}

      {/* Header */}
      <div className="mb-3 flex items-start gap-3 pr-10">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background">
          <Icon name="globe" className="text-sm text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent transition-colors truncate">
            {resource.title}
          </h3>
          <span className="mt-0.5 inline-block text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/70">
            {resource.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {resource.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border/40 pt-3">
        <span className="text-xs text-muted-foreground truncate">
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
          className="inline-flex shrink-0 items-center gap-1 text-xs font-medium uppercase tracking-[0.06em] text-foreground hover:text-accent transition-colors"
          aria-label={`Open ${resource.title}`}
        >
          Open
          <Icon name="up-right-from-square" className="text-[10px] text-muted-foreground" />
        </a>
      </div>
    </article>
  );
}
