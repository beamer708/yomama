import { prisma } from "./db";
import {
  getFocusAreasForCategory,
  type FocusArea,
} from "./resource-list-mapping";

export interface ProjectPlanInput {
  name: string;
  projectType: string;
  skillLevel: string;
  budgetRange: string;
  timelineUrgency: string;
  focusAreas: string[];
  description?: string;
}

export interface ScoredResource {
  resourceId: string;
  title: string;
  description: string;
  type: string;
  url: string;
  category: string;
  creator: string;
  creatorUrl: string | null;
  section: string;
  difficultyLevel: string;
  priority: "required" | "recommended" | "optional";
  score: number;
}

export interface GroupedResourceList {
  required: ScoredResource[];
  recommended: ScoredResource[];
  optional: ScoredResource[];
}

const WEIGHT_FOCUS = 10;
const WEIGHT_SKILL = 3;
const WEIGHT_PRIORITY_DEFAULT = 2;

const SKILL_ORDER = ["beginner", "intermediate", "advanced"];

function skillMatch(userLevel: string, resourceLevel: string): number {
  const u = SKILL_ORDER.indexOf(userLevel.toLowerCase());
  const r = SKILL_ORDER.indexOf(resourceLevel.toLowerCase());
  if (r === -1 || u === -1) return 1;
  if (r <= u) return 1;
  if (r === u + 1) return 0.5;
  return 0.2;
}

function priorityBoost(priority: string): number {
  switch (priority.toLowerCase()) {
    case "required":
      return 1.2;
    case "recommended":
      return 1;
    case "optional":
      return 0.8;
    default:
      return 1;
  }
}

function assignPriority(
  scores: Array<ScoredResource & { rawScore: number }>,
  thresholds: { required: number; recommended: number }
): GroupedResourceList {
  const sorted = [...scores].sort((a, b) => b.rawScore - a.rawScore);
  const required: ScoredResource[] = [];
  const recommended: ScoredResource[] = [];
  const optional: ScoredResource[] = [];

  sorted.forEach((item, index) => {
    const { rawScore, ...rest } = item;
    const resource: ScoredResource = { ...rest, score: rawScore };

    if (index < thresholds.required) {
      required.push({ ...resource, priority: "required" });
    } else if (index < thresholds.required + thresholds.recommended) {
      recommended.push({ ...resource, priority: "recommended" });
    } else {
      optional.push({ ...resource, priority: "optional" });
    }
  });

  return { required, recommended, optional };
}

export async function generateResourceList(
  input: ProjectPlanInput
): Promise<GroupedResourceList> {
  const resources = await prisma.resource.findMany();
  const userFocusSet = new Set(input.focusAreas as FocusArea[]);
  const userSkill = input.skillLevel;

  const scored: Array<ScoredResource & { rawScore: number }> = resources.map(
    (r) => {
      const resourceFocusAreas: string[] =
        typeof r.focusAreaTags === "string"
          ? (JSON.parse(r.focusAreaTags) as string[])
          : (r.focusAreaTags as string[]);
      if (resourceFocusAreas.length === 0) {
        resourceFocusAreas.push(
          ...getFocusAreasForCategory(r.category).map((f) => f as string)
        );
      }
      const focusMatch = resourceFocusAreas.filter((f) =>
        userFocusSet.has(f as FocusArea)
      ).length;
      const skillScore = skillMatch(userSkill, r.difficultyLevel);
      const priorityScore = priorityBoost(r.priorityDefault);

      const rawScore =
        focusMatch * WEIGHT_FOCUS +
        skillScore * WEIGHT_SKILL +
        priorityScore * WEIGHT_PRIORITY_DEFAULT;

      return {
        resourceId: r.id,
        title: r.title,
        description: r.description,
        type: r.type,
        url: r.url,
        category: r.category,
        creator: r.creator,
        creatorUrl: r.creatorUrl,
        section: r.section,
        difficultyLevel: r.difficultyLevel,
        priority: "recommended" as const,
        score: rawScore,
        rawScore,
      };
    }
  );

  const withRelevance = scored.filter((s) => s.rawScore > 0);
  const requiredCount = Math.min(5, Math.max(2, Math.ceil(withRelevance.length * 0.2)));
  const recommendedCount = Math.min(10, Math.max(5, Math.ceil(withRelevance.length * 0.4)));

  return assignPriority(withRelevance, {
    required: requiredCount,
    recommended: recommendedCount,
  });
}

export async function getScoringWeights(): Promise<{
  focus: number;
  skill: number;
  priority: number;
}> {
  const config = await prisma.scoringConfig.findUnique({
    where: { key: "weights" },
  });
  if (config?.value) {
    try {
      const parsed = JSON.parse(config.value) as {
        focus?: number;
        skill?: number;
        priority?: number;
      };
      return {
        focus: parsed.focus ?? WEIGHT_FOCUS,
        skill: parsed.skill ?? WEIGHT_SKILL,
        priority: parsed.priority ?? WEIGHT_PRIORITY_DEFAULT,
      };
    } catch {
      // ignore
    }
  }
  return {
    focus: WEIGHT_FOCUS,
    skill: WEIGHT_SKILL,
    priority: WEIGHT_PRIORITY_DEFAULT,
  };
}
