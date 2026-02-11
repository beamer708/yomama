"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { GroupedResourceList, ScoredResource } from "@/lib/resource-list-engine";
import { getYouTubeThumbnail } from "@/lib/resources";
import type { ProjectPlanFormState } from "./ResourceListCreatorForm";

interface ResourceListResultProps {
  grouped: GroupedResourceList;
  formState: ProjectPlanFormState;
  savedListId: string | null;
  onSavedListId: (id: string | null) => void;
  onStartOver: () => void;
}

type SectionKey = "required" | "recommended" | "optional";

const SECTION_CONFIG: Record<
  SectionKey,
  { label: string; color: string; defaultOpen: boolean }
> = {
  required: {
    label: "Required",
    color: "from-amber-500/20 to-orange-600/10 border-amber-500/30",
    defaultOpen: true,
  },
  recommended: {
    label: "Recommended",
    color: "from-primary/20 to-primary/5 border-primary/30",
    defaultOpen: true,
  },
  optional: {
    label: "Optional",
    color: "from-foreground/10 to-transparent border-border",
    defaultOpen: false,
  },
};

function ResourceCardRow({
  resource,
  onRemove,
  onFavorite,
  isFavorite,
}: {
  resource: ScoredResource;
  onRemove: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isYouTube = resource.section === "youtube" || resource.type.toLowerCase() === "video";
  const thumbnailUrl = isYouTube ? getYouTubeThumbnail(resource.url) : "";
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
          {thumbnailUrl && (
            <div className="mt-2 overflow-hidden rounded-lg border border-border/60 bg-black/20">
              <img
                src={thumbnailUrl}
                alt={`${resource.title} preview`}
                className="h-auto w-full max-w-sm object-cover"
                loading="lazy"
              />
            </div>
          )}
          {resource.isNew && (
            <span className="mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-white">
              New
            </span>
          )}
          <p className="mt-1 text-sm text-foreground/70 line-clamp-2">
            {resource.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-foreground/70">
              {resource.category}
            </span>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-foreground/70 capitalize">
              {resource.difficultyLevel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onFavorite}
            className="rounded-lg p-2 text-foreground/60 hover:bg-white/10 hover:text-primary"
            title={isFavorite ? "Unfavorite" : "Favorite"}
            aria-label={isFavorite ? "Unfavorite" : "Favorite"}
          >
            <Icon name={isFavorite ? "check" : "book"} className="text-base" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg p-2 text-foreground/60 hover:bg-red-500/10 hover:text-red-400"
            title="Remove from list"
            aria-label="Remove from list"
          >
            <Icon name="cross" className="text-base" />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="mt-3 border-t border-border pt-3 text-sm text-foreground/70">
          <p>{resource.description}</p>
          {resource.creator && (
            <p className="mt-1">
              Creator:{" "}
              {resource.creatorUrl ? (
                <a
                  href={resource.creatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {resource.creator}
                </a>
              ) : (
                resource.creator
              )}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="mt-2 text-xs text-foreground/60 hover:text-foreground"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}

function SectionBlock({
  sectionKey,
  resources,
  removedIds,
  favoriteIds,
  onRemove,
  onFavorite,
}: {
  sectionKey: SectionKey;
  resources: ScoredResource[];
  removedIds: Set<string>;
  favoriteIds: Set<string>;
  onRemove: (id: string) => void;
  onFavorite: (id: string) => void;
}) {
  const [open, setOpen] = useState(SECTION_CONFIG[sectionKey].defaultOpen);
  const config = SECTION_CONFIG[sectionKey];
  const visible = resources.filter((r) => !removedIds.has(r.resourceId));
  if (visible.length === 0) return null;

  return (
    <div
      className={`rounded-2xl border bg-gradient-to-br ${config.color} overflow-hidden`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-foreground"
      >
        <span>
          {config.label} ({visible.length})
        </span>
        <Icon
          name="arrow-right"
          className={`text-lg transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-3 px-4 pb-4">
          {visible.map((r) => (
            <ResourceCardRow
              key={r.resourceId}
              resource={r}
              isFavorite={favoriteIds.has(r.resourceId)}
              onRemove={() => onRemove(r.resourceId)}
              onFavorite={() => onFavorite(r.resourceId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ResourceListResult({
  grouped,
  formState,
  savedListId,
  onSavedListId,
  onStartOver,
}: ResourceListResultProps) {
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const planRes = await fetch("/api/project-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          projectType: formState.projectType,
          skillLevel: formState.skillLevel,
          budgetRange: formState.budgetRange,
          timelineUrgency: formState.timelineUrgency,
          focusAreas: formState.focusAreas,
          description: formState.description || undefined,
        }),
      });
      if (!planRes.ok) {
        const d = await planRes.json().catch(() => ({}));
        throw new Error(d.error || "Failed to save plan");
      }
      const plan = (await planRes.json()) as { id: string };
      const listRes = await fetch("/api/resource-lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectPlanId: plan.id }),
      });
      if (!listRes.ok) {
        const d = await listRes.json().catch(() => ({}));
        throw new Error(d.error || "Failed to save list");
      }
      const list = (await listRes.json()) as { id: string };
      onSavedListId(list.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (!savedListId) {
      setError("Save the list first to share it.");
      return;
    }
    setError(null);
    setSharing(true);
    try {
      const res = await fetch(`/api/resource-lists/${savedListId}/share`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to share");
      const data = (await res.json()) as { shareUrl: string };
      const fullUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}${data.shareUrl}`
          : data.shareUrl;
      setShareUrl(fullUrl);
      await navigator.clipboard.writeText(fullUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to share");
    } finally {
      setSharing(false);
    }
  };

  const handleExport = () => {
    const payload = {
      projectName: formState.name,
      projectType: formState.projectType,
      skillLevel: formState.skillLevel,
      exportedAt: new Date().toISOString(),
      sections: {
        required: grouped.required.filter((r) => !removedIds.has(r.resourceId)),
        recommended: grouped.recommended.filter(
          (r) => !removedIds.has(r.resourceId)
        ),
        optional: grouped.optional.filter((r) => !removedIds.has(r.resourceId)),
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `resource-list-${formState.name.replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">
          Your resource list
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !!savedListId}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Saving…" : savedListId ? "Saved" : "Save list"}
            <Icon name="check" className="text-base" />
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={sharing || !savedListId}
            className="btn-ghost disabled:opacity-50"
          >
            {sharing ? "Sharing…" : "Share"}
            <Icon name="up-right-from-square" className="text-base" />
          </button>
          <button type="button" onClick={handleExport} className="btn-ghost">
            Export JSON
            <Icon name="file" className="text-base" />
          </button>
          <button type="button" onClick={onStartOver} className="btn-ghost">
            Start over
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      {shareUrl && (
        <p className="text-sm text-foreground/80">
          Share link copied to clipboard:{" "}
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {shareUrl}
          </a>
        </p>
      )}

      <div className="space-y-6">
        <SectionBlock
          sectionKey="required"
          resources={grouped.required}
          removedIds={removedIds}
          favoriteIds={favoriteIds}
          onRemove={(id) => setRemovedIds((s) => new Set(s).add(id))}
          onFavorite={toggleFavorite}
        />
        <SectionBlock
          sectionKey="recommended"
          resources={grouped.recommended}
          removedIds={removedIds}
          favoriteIds={favoriteIds}
          onRemove={(id) => setRemovedIds((s) => new Set(s).add(id))}
          onFavorite={toggleFavorite}
        />
        <SectionBlock
          sectionKey="optional"
          resources={grouped.optional}
          removedIds={removedIds}
          favoriteIds={favoriteIds}
          onRemove={(id) => setRemovedIds((s) => new Set(s).add(id))}
          onFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}
