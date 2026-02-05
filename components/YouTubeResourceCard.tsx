import { Resource } from "@/lib/resources";
import Icon from "@/components/Icon";
import { getYouTubeThumbnail } from "@/lib/resources";

interface YouTubeResourceCardProps {
  resource: Resource;
}

export default function YouTubeResourceCard({ resource }: YouTubeResourceCardProps) {
  const thumbnailUrl = resource.thumbnailUrl || getYouTubeThumbnail(resource.url);

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg bg-card border border-border overflow-hidden hover:border-primary/30 hover:bg-card-hover transition-all"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-border overflow-hidden">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={resource.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Hide image and show placeholder if thumbnail fails
                e.currentTarget.style.display = "none";
                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = "flex";
              }}
            />
            <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 absolute inset-0">
              <Icon name="youtube" className="text-4xl text-primary/50" />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
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
          {resource.title}
        </h3>
        {resource.channelName && (
          <p className="text-sm text-foreground/70 mb-3">
            {resource.channelName}
          </p>
        )}
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="text-xs text-foreground/60">
            {resource.creatorUrl ? (
              <a
                href={resource.creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:text-foreground transition-colors"
              >
                {resource.creator}
              </a>
            ) : (
              <span>{resource.creator}</span>
            )}
          </div>
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary-hover transition-colors">
            Watch Video
            <Icon name="up-right-from-square" className="text-sm" />
          </div>
        </div>
      </div>
    </a>
  );
}
