import { Resource, getYouTubeThumbnail } from "@/lib/resources";
import Icon from "@/components/Icon";

interface YouTubeResourceCardProps {
  resource: Resource;
}

export default function YouTubeResourceCard({ resource }: YouTubeResourceCardProps) {
  const thumbnailUrl = resource.thumbnailUrl || getYouTubeThumbnail(resource.url);

  return (
    <article className="resource-card group block overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0d0d0d]">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={resource.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 hidden h-full w-full items-center justify-center bg-[#0d0d0d]">
              <Icon name="video-camera" className="text-4xl text-muted-foreground/30" />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#0d0d0d]">
            <Icon name="video-camera" className="text-4xl text-muted-foreground/30" />
          </div>
        )}
        {resource.isNew && (
          <div className="absolute top-2 left-2 z-10">
            <span className="resource-tag">New</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1.5 rounded border border-border/60 bg-background/80 px-2 py-1 backdrop-blur-sm">
            <Icon name="video-camera" className="text-[11px] text-muted-foreground" />
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">YouTube</span>
          </div>
        </div>
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-1 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {resource.category}
        </div>
        <h3 className="mb-3 text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {resource.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {resource.description}
        </p>
        <div className="flex items-center justify-between gap-3 border-t border-border/40 pt-4">
          <span className="text-xs text-muted-foreground truncate">
            {resource.channelName || resource.creator}
          </span>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-foreground hover:text-accent transition-colors"
            aria-label={`Watch ${resource.title} on YouTube`}
          >
            Watch
            <Icon name="up-right-from-square" className="text-xs text-muted-foreground" />
          </a>
        </div>
      </div>
    </article>
  );
}
