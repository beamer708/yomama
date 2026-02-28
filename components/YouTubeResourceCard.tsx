import { Resource } from "@/lib/resources";
import Icon from "@/components/Icon";
import { getYouTubeThumbnail } from "@/lib/resources";

interface YouTubeResourceCardProps {
  resource: Resource;
}

export default function YouTubeResourceCard({ resource }: YouTubeResourceCardProps) {
  const thumbnailUrl = resource.thumbnailUrl || getYouTubeThumbnail(resource.url);

  return (
    <article className="group block overflow-hidden rounded-2xl border border-border bg-card/90 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card-hover">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-border">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={resource.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Hide image and show placeholder if thumbnail fails
                e.currentTarget.style.display = "none";
                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 hidden h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <Icon name="youtube" className="text-4xl text-primary/50" />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Icon name="youtube" className="text-4xl text-primary/50" />
          </div>
        )}
        {/* NEW sticker */}
        {resource.isNew && (
          <div className="absolute top-2 left-2 z-10">
            <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-white">
              New
            </span>
          </div>
        )}
        {/* YouTube overlay icon */}
        <div className="absolute top-2 right-2">
          <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1 flex items-center gap-1.5">
            <Icon name="youtube" className="text-xs text-white" />
            <span className="text-xs text-white font-medium">YouTube</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
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
        {resource.channelName && (
          <p className="mb-3 text-sm text-muted-foreground">
            {resource.channelName}
          </p>
        )}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {resource.description}
        </p>
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
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
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary-hover transition-colors"
          >
            Watch Video
            <Icon name="up-right-from-square" className="text-sm" />
          </a>
        </div>
      </div>
    </article>
  );
}
