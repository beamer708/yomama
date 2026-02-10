"use client";

import { useState } from "react";
import { ResourceListCreatorForm } from "@/components/resource-list-creator/ResourceListCreatorForm";
import type { ProjectPlanFormState } from "@/components/resource-list-creator/ResourceListCreatorForm";
import { ResourceListResult } from "@/components/resource-list-creator/ResourceListResult";
import {
  FOCUS_AREAS,
  PROJECT_TYPES,
  SKILL_LEVELS,
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
} from "@/lib/resource-list-mapping";
import type { GroupedResourceList } from "@/lib/resource-list-engine";

export default function ResourceListCreatorPage() {
  const [result, setResult] = useState<GroupedResourceList | null>(null);
  const [formState, setFormState] = useState<ProjectPlanFormState | null>(null);
  const [savedListId, setSavedListId] = useState<string | null>(null);

  const handleGenerated = (r: GroupedResourceList, form: ProjectPlanFormState) => {
    setResult(r);
    setFormState(form);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="section-heading">Resource List Creator</h1>
          <p className="section-subheading mx-auto">
            Describe your project and get a curated list of resources tailored to your goals.
          </p>
        </div>

        {!result || !formState ? (
          <ResourceListCreatorForm
            projectTypes={[...PROJECT_TYPES]}
            skillLevels={[...SKILL_LEVELS]}
            budgetRanges={[...BUDGET_RANGES]}
            timelineOptions={[...TIMELINE_OPTIONS]}
            focusAreas={[...FOCUS_AREAS]}
            onGenerated={handleGenerated}
          />
        ) : (
          <ResourceListResult
            grouped={result}
            formState={formState}
            savedListId={savedListId}
            onSavedListId={setSavedListId}
            onStartOver={() => {
              setResult(null);
              setFormState(null);
              setSavedListId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
