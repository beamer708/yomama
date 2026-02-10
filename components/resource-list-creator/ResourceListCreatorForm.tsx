"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { GroupedResourceList } from "@/lib/resource-list-engine";

const STEPS = ["Basics", "Focus areas", "Details"];

export interface ProjectPlanFormState {
  name: string;
  projectType: string;
  skillLevel: string;
  budgetRange: string;
  timelineUrgency: string;
  focusAreas: string[];
  description: string;
}

interface ResourceListCreatorFormProps {
  projectTypes: readonly string[];
  skillLevels: readonly string[];
  budgetRanges: readonly string[];
  timelineOptions: readonly string[];
  focusAreas: readonly string[];
  onGenerated: (result: GroupedResourceList, formState: ProjectPlanFormState) => void;
}

export function ResourceListCreatorForm({
  projectTypes,
  skillLevels,
  budgetRanges,
  timelineOptions,
  focusAreas,
  onGenerated,
}: ResourceListCreatorFormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    projectType: "",
    skillLevel: "",
    budgetRange: "",
    timelineUrgency: "",
    focusAreas: [] as string[],
    description: "",
  });

  const toggleFocus = (area: string) => {
    setForm((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const canNext =
    (step === 0 &&
      form.name.trim() &&
      form.projectType &&
      form.skillLevel) ||
    (step === 1 && form.focusAreas.length > 0) ||
    step === 2;

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/resource-list/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          projectType: form.projectType,
          skillLevel: form.skillLevel,
          budgetRange: form.budgetRange,
          timelineUrgency: form.timelineUrgency,
          focusAreas: form.focusAreas,
          description: form.description.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate list");
      }
      const data = (await res.json()) as GroupedResourceList;
      onGenerated(data, {
        name: form.name.trim(),
        projectType: form.projectType,
        skillLevel: form.skillLevel,
        budgetRange: form.budgetRange,
        timelineUrgency: form.timelineUrgency,
        focusAreas: form.focusAreas,
        description: form.description.trim(),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-border rounded-2xl p-8 sm:p-10">
      <div className="mb-8 flex gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              step === i
                ? "bg-primary text-white"
                : "bg-white/5 text-foreground/70 hover:text-foreground"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-6 animate-in-fade">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Project name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Liberty County Rebrand"
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-foreground mb-2">
              Project type
            </label>
            <select
              id="projectType"
              value={form.projectType}
              onChange={(e) => setForm((p) => ({ ...p, projectType: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select type</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-foreground mb-2">
              Skill level
            </label>
            <select
              id="skillLevel"
              value={form.skillLevel}
              onChange={(e) => setForm((p) => ({ ...p, skillLevel: e.target.value }))}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select level</option>
              {skillLevels.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                Budget
              </label>
              <select
                id="budget"
                value={form.budgetRange}
                onChange={(e) => setForm((p) => ({ ...p, budgetRange: e.target.value }))}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                value={form.timelineUrgency}
                onChange={(e) => setForm((p) => ({ ...p, timelineUrgency: e.target.value }))}
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-in-fade">
          <p className="text-sm text-foreground/70 mb-4">
            Select all areas that apply to your project.
          </p>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => toggleFocus(area)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  form.focusAreas.includes(area)
                    ? "bg-primary text-white"
                    : "bg-white/5 text-foreground/80 hover:bg-white/10"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in-fade">
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
            Goals or notes (optional)
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Describe what you want to achieve..."
            rows={4}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
          />
        </div>
      )}

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {step < 2 ? (
          <>
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="btn-primary disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
              <Icon name="arrow-right" className="text-base" />
            </button>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="btn-ghost"
              >
                Back
              </button>
            )}
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? "Generating…" : "Generate resource list"}
              <Icon name="book" className="text-base" />
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-ghost"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}
