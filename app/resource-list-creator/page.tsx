"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { AssistantResults, type AssistantGrouped } from "@/components/resource-assistant/AssistantResults";

export default function ResourceListCreatorPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{
    grouped: AssistantGrouped;
    reasons: Record<string, string>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRefine, setShowRefine] = useState(false);

  const submit = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/resource-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: trimmed }),
      });
      const text = await res.text();
      let data: {
        error?: string;
        recommended?: AssistantGrouped["recommended"];
        helpful?: AssistantGrouped["helpfulTools"];
        optional?: AssistantGrouped["optional"];
      };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(res.ok ? "Invalid response from server. Try again." : "Something went wrong. Try again.");
        return;
      }
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      if (!data.recommended || !data.helpful || !data.optional) {
        setError("No suggestions returned. Try rephrasing your goal.");
        return;
      }
      setResult({
        grouped: {
          recommended: data.recommended,
          helpfulTools: data.helpful,
          optional: data.optional,
        },
        reasons: {},
      });
      setQuery(trimmed);
      setShowRefine(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't load suggestions. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = () => {
    setShowRefine(true);
    setResult(null);
  };

  const handleRestart = () => {
    setQuery("");
    setResult(null);
    setError(null);
    setShowRefine(false);
  };

  const showPrompt = !result || showRefine;

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-7 text-center sm:p-9">
          <h1 className="section-heading">Resource Assistant</h1>
          <p className="section-subheading mx-auto">
            Describe what you want to build or improve. We’ll suggest relevant resources from the vault.
          </p>
        </div>

        {showPrompt && (
          <div className="animate-in-fade">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(query);
              }}
              className="gradient-border gradient-card rounded-2xl p-6 sm:p-8"
            >
              <label htmlFor="assistant-query" className="block text-sm font-medium text-foreground mb-3">
                What are you trying to build or improve?
              </label>
              <textarea
                id="assistant-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. I want to start an ERLC roleplay server from scratch"
                rows={3}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                disabled={loading}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                One sentence is enough. No forms or settings.
              </p>
              {error && (
                <p className="mt-3 text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Finding resources…
                    </>
                  ) : (
                    <>
                      Get suggestions
                      <Icon name="arrow-right" className="text-base" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {!showRefine && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Examples: “I need branding and graphics for my server”, “I want to improve staff management”, “I want to redesign my existing server”
              </p>
            )}
          </div>
        )}

        {loading && !showPrompt && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Finding resources…</p>
          </div>
        )}

        {result && !showRefine && !loading && (
          <AssistantResults
            grouped={result.grouped}
            reasons={result.reasons}
            onRefine={handleRefine}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
