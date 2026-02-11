"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { ScoredResource } from "@/lib/resource-list-engine";

export interface AssistantGrouped {
  recommended: ScoredResource[];
  helpfulTools: ScoredResource[];
  optional: ScoredResource[];
}

const SECTIONS: Array<{
  key: keyof AssistantGrouped;
  label: string;
  color: string;
  defaultOpen: boolean;
}> = [
  {
    key: "recommended",
    label: "Recommended",
    color: "from-amber-500/20 to-orange-600/10 border-amber-500/30",
    defaultOpen: true,
  },
  {
    key: "helpfulTools",
    label: "Helpful",
    color: "from-primary/20 to-primary/5 border-primary/30",
    defaultOpen: true,
  },
  {
    key: "optional",
    label: "Optional",
    color: "from-foreground/10 to-transparent border-border",
    defaultOpen: false,
  },
];

function ResourceCard({
  resource,
  reason,
  onRemove,
}: {
  resource: ScoredResource;
  reason: string;
  onRemove: () => void;
}) {
  return (
    <div className="group rounded-xl border border-border bg-card/50 p-4 transition-all hover:border-primary/30 hover:bg-card">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-primary inline-flex items-center gap-1"
          >
            {resource.title}
            <Icon name="up-right-from-square" className="text-xs shrink-0" />
          </a>
          <p className="mt-1 text-sm text-foreground/70 line-clamp-2">{reason}</p>
          <span className="mt-2 inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-foreground/70">
            {resource.category}
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-lg p-2 text-foreground/60 hover:bg-red-500/10 hover:text-red-400 shrink-0"
          title="Remove from list"
          aria-label="Remove from list"
        >
          <Icon name="cross" className="text-base" />
        </button>
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  resources,
  reasons,
  removedIds,
  onRemove,
}: {
  section: (typeof SECTIONS)[number];
  resources: ScoredResource[];
  reasons: Record<string, string>;
  removedIds: Set<string>;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(section.defaultOpen);
  const visible = resources.filter((r) => !removedIds.has(r.resourceId));
  if (visible.length === 0) return null;

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${section.color} overflow-hidden`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-foreground"
      >
        <span>
          {section.label} ({visible.length})
        </span>
        <Icon
          name="arrow-right"
          className={`text-lg transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-3 px-4 pb-4">
          {visible.map((r) => (
            <ResourceCard
              key={r.resourceId}
              resource={r}
              reason={reasons[r.resourceId] ?? r.description}
              onRemove={() => onRemove(r.resourceId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AssistantResultsProps {
  grouped: AssistantGrouped;
  reasons: Record<string, string>;
  onRefine: () => void;
  onRestart: () => void;
}

export function AssistantResults({
  grouped,
  reasons,
  onRefine,
  onRestart,
}: AssistantResultsProps) {
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const remove = (id: string) =>
    setRemovedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  return (
    <div className="space-y-8 animate-in-fade">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Here are some resources for you
        </h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onRefine} className="btn-ghost">
            Refine or try again
            <Icon name="search" className="text-base" />
          </button>
          <button type="button" onClick={onRestart} className="btn-secondary">
            Start over
            <Icon name="home" className="text-base" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <SectionBlock
            key={section.key}
            section={section}
            resources={grouped[section.key]}
            reasons={reasons}
            removedIds={removedIds}
            onRemove={remove}
          />
        ))}
      </div>
    </div>
  );
}
