import { Resource } from "@/lib/resources";
import { MessageCircle } from "lucide-react";
import Icon from "@/components/Icon";

interface DiscordCommunityCardProps {
  resource: Resource;
}

export default function DiscordCommunityCard({ resource }: DiscordCommunityCardProps) {
  return (
    <article className="group flex items-start gap-4 border-b border-border/40 py-5 last:border-b-0">
      {/* Icon */}
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card">
        <MessageCircle className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} aria-hidden />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
            {resource.title}
          </h3>
          {resource.memberCount && (
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {resource.memberCount} members
            </span>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {resource.description}
        </p>
      </div>

      {/* Action */}
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 shrink-0 inline-flex items-center gap-1 rounded-md border border-border/60 bg-card px-3 py-1.5 text-xs font-medium uppercase tracking-[0.06em] text-foreground transition-all hover:border-border hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-label={`Join ${resource.title} on Discord`}
      >
        Join
        <Icon name="up-right-from-square" className="text-[10px] text-muted-foreground" />
      </a>
    </article>
  );
}
