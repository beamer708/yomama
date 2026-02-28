"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { resources } from "@/lib/resources";

const CUSTOM_LIST_STORAGE_KEY = "unityvault.customListIds.v1";

export default function ResourceListCreatorPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [lookupCode, setLookupCode] = useState("");
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CUSTOM_LIST_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const validIds = parsed.filter(
        (id): id is string => typeof id === "string" && resources.some((resource) => resource.id === id)
      );
      setSelectedIds(new Set(validIds));
    } catch {
      // Ignore invalid local data
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CUSTOM_LIST_STORAGE_KEY, JSON.stringify(Array.from(selectedIds)));
    } catch {
      // Ignore storage write failures
    }
  }, [selectedIds]);

  const selectedResources = useMemo(
    () => resources.filter((resource) => selectedIds.has(resource.id)),
    [selectedIds]
  );

  const handleRemoveSelected = (resourceId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(resourceId);
      return next;
    });
  };

  const handleCreateCode = async () => {
    if (selectedResources.length === 0) {
      setCreateError("Add resources first before creating a share code.");
      return;
    }
    setCreateError(null);
    setCreateLoading(true);
    try {
      const response = await fetch("/api/resource-lists/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Custom Resource List",
          resourceIds: selectedResources.map((resource) => resource.id),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message =
          typeof data.detail === "string" && data.detail.trim().length > 0
            ? `${typeof data.error === "string" ? data.error : "Failed to create share code"}: ${data.detail}`
            : typeof data.error === "string"
              ? data.error
              : "Failed to create share code";
        throw new Error(message);
      }
      const relativeUrl = typeof data.shareUrl === "string" ? data.shareUrl : "";
      if (!relativeUrl) throw new Error("Missing share URL from server");

      const fullUrl =
        typeof window !== "undefined" ? `${window.location.origin}${relativeUrl}` : relativeUrl;
      setShareUrl(fullUrl);
      await navigator.clipboard.writeText(fullUrl);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Failed to create share code");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleLookup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLookupError(null);
    const code = lookupCode.trim();
    if (!code) {
      setLookupError("Enter a shared list code.");
      return;
    }
    if (!/^[A-Za-z0-9_-]{6,32}$/.test(code)) {
      setLookupError("Invalid code format. Use letters, numbers, - or _.");
      return;
    }
    setLookupLoading(true);
    try {
      const res = await fetch(`/api/resource-lists/shared/${encodeURIComponent(code)}`);
      if (res.status === 404) {
        setLookupError("List not found. Check the code and try again.");
        return;
      }
      if (!res.ok) {
        setLookupError("Unable to open this list right now. Try again.");
        return;
      }
      router.push(`/resource-list-creator/shared/${encodeURIComponent(code)}`);
    } catch {
      setLookupError("Network error while looking up code.");
    } finally {
      setLookupLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-5xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-7 text-center sm:p-9">
          <h1 className="section-heading">Create Resource List</h1>
          <p className="section-subheading mx-auto">
            Review your selected resources, then create a share code when ready.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card/85 p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-foreground">How this works</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use List Mode on the Resources page to choose items. Every selected item appears here before you create a code.
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              1. Open <span className="text-foreground">Resources</span>.
            </p>
            <p>
              2. Turn <span className="text-foreground">List Mode</span> to ON.
            </p>
            <p>
              3. Click <span className="text-foreground">Add to list</span> on any resource you want.
            </p>
            <p>
              4. Come back here to review the full list and create your share code.
            </p>
          </div>
          <div className="mt-5">
            <Link href="/resources" className="btn-primary">
              Go to Resources
              <Icon name="arrow-right" className="text-base" />
            </Link>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card/85 p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              Selected resources ({selectedResources.length})
            </h2>
            {selectedResources.length > 0 ? (
              <button
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Clear selected list
              </button>
            ) : null}
          </div>
          {selectedResources.length > 0 ? (
            <div className="mt-4 space-y-3">
              {selectedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-card/70 p-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{resource.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{resource.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveSelected(resource.id)}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                    aria-label={`Remove ${resource.title} from selected list`}
                  >
                    <Icon name="cross" className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No resources selected yet. Go to Resources and add items in List Mode.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCreateCode}
              disabled={createLoading || selectedResources.length === 0}
              className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
            >
              {createLoading ? "Creating code..." : "Create share code"}
              <Icon name="up-right-from-square" className="text-base" />
            </button>
            {shareUrl && (
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Open shared list
              </a>
            )}
          </div>
          {shareUrl && (
            <p className="mt-2 text-xs text-muted-foreground">
              Share code created and copied to your clipboard.
            </p>
          )}
          {createError && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {createError}
            </p>
          )}
        </div>

        <div id="open-shared" className="mb-8 rounded-2xl border border-border bg-card/85 p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-foreground">Open shared list by code</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            If someone shared a code with you, paste it here to open that exact list.
          </p>
          <form onSubmit={handleLookup} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={lookupCode}
              onChange={(e) => setLookupCode(e.target.value)}
              placeholder="Enter code (example: A7KD29QF)"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={lookupLoading}
              className="btn-secondary shrink-0 disabled:opacity-50"
            >
              {lookupLoading ? "Opening…" : "Open list"}
              <Icon name="arrow-right" className="text-base" />
            </button>
          </form>
          {lookupError && (
            <p className="mt-3 text-sm text-red-400" role="alert">
              {lookupError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
