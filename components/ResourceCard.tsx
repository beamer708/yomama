import { Resource } from "@/lib/resources";

interface ResourceCardProps {
  resource: Resource;
}

const typeLabels: Record<Resource["type"], string> = {
  video: "YouTube Video",
  guide: "Guide",
  website: "Website",
  tool: "Tool",
  document: "Document",
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="group rounded-lg bg-card border border-border p-6 hover:border-primary/40 hover:bg-card-hover transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {typeLabels[resource.type]}
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
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View Resource
          <svg
            className="h-4 w-4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
