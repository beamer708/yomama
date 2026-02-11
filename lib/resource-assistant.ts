import { prisma } from "./db";
import { FOCUS_AREAS, type FocusArea } from "./resource-list-mapping";
import {
  generateResourceList,
  type GroupedResourceList,
  type ScoredResource,
} from "./resource-list-engine";

const ALLOWED_FOCUS_AREAS = FOCUS_AREAS as readonly string[];

/** Result of intent classification. Only allowed focus areas are returned. */
export interface ClassifiedIntent {
  focusAreas: string[];
  usedAI: boolean;
}

/** Keyword-to-focus-area mapping for fallback when AI is unavailable. */
const QUERY_KEYWORDS: Record<string, FocusArea[]> = {
  start: ["Server Setup", "Documentation / SOPs"],
  scratch: ["Server Setup", "Documentation / SOPs"],
  server: ["Server Setup", "Branding"],
  erlc: ["Server Setup", "Branding"],
  roleplay: ["Staff & Management", "Documentation / SOPs"],
  branding: ["Branding", "Graphic Design"],
  brand: ["Branding", "Graphic Design"],
  graphic: ["Graphic Design", "Branding"],
  graphics: ["Graphic Design", "Branding"],
  logo: ["Graphic Design", "Branding"],
  design: ["Graphic Design", "Branding"],
  staff: ["Staff & Management", "Documentation / SOPs"],
  management: ["Staff & Management", "Documentation / SOPs"],
  moderation: ["Staff & Management", "Documentation / SOPs"],
  mod: ["Staff & Management", "Documentation / SOPs"],
  discord: ["Server Setup", "Automation / Bots"],
  bot: ["Automation / Bots", "Server Setup"],
  bots: ["Automation / Bots", "Server Setup"],
  automation: ["Automation / Bots", "Server Setup"],
  marketing: ["Marketing & Growth"],
  growth: ["Marketing & Growth"],
  advertise: ["Marketing & Growth"],
  community: ["Staff & Management", "Documentation / SOPs"],
  redesign: ["Branding", "Graphic Design", "Server Setup"],
  improve: ["Documentation / SOPs", "Staff & Management"],
  sop: ["Documentation / SOPs"],
  documentation: ["Documentation / SOPs"],
  tools: ["Graphic Design", "Server Setup"],
  visual: ["Graphic Design", "Branding"],
  setup: ["Server Setup"],
};

/**
 * Classify user query into focus areas using an LLM.
 * Returns only focus areas from the allowed list. No hallucinated values.
 */
export async function classifyIntentWithAI(query: string): Promise<ClassifiedIntent | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) return null;

  const prompt = `You are classifying a user's goal for an ERLC (Roblox roleplay) community project. The user said: "${query}"

Respond with a JSON object only, no other text. Use this exact format:
{"focusAreas": ["Area1", "Area2", ...]}

You MUST choose only from this exact list (use these strings verbatim):
${ALLOWED_FOCUS_AREAS.join(", ")}

Pick 1 to 4 areas that best match what the user wants to build or improve. If unclear, include "Server Setup" and "Branding".`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 200,
      }),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;

    const jsonStr = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(jsonStr) as { focusAreas?: unknown };
    const raw = Array.isArray(parsed.focusAreas) ? parsed.focusAreas : [];
    const focusAreas = raw
      .filter((a): a is string => typeof a === "string")
      .filter((a) => ALLOWED_FOCUS_AREAS.includes(a))
      .slice(0, 5);

    if (focusAreas.length === 0) return null;
    return { focusAreas, usedAI: true };
  } catch {
    return null;
  }
}

/**
 * Fallback: map query text to focus areas using keyword matching.
 */
export function classifyIntentFallback(query: string): ClassifiedIntent {
  const lower = query.toLowerCase().trim();
  const words = lower.split(/\s+/);
  const set = new Set<string>();

  for (const word of words) {
    const clean = word.replace(/[^a-z0-9]/g, "");
    if (clean.length < 2) continue;
    for (const [key, areas] of Object.entries(QUERY_KEYWORDS)) {
      if (clean.includes(key) || key.includes(clean)) {
        areas.forEach((a) => set.add(a));
      }
    }
  }

  // Also check full phrase for common phrases
  if (lower.includes("from scratch") || lower.includes("start a server")) {
    set.add("Server Setup");
    set.add("Documentation / SOPs");
  }
  if (lower.includes("branding") || lower.includes("graphics")) {
    set.add("Branding");
    set.add("Graphic Design");
  }
  if (lower.includes("staff") || lower.includes("moderation")) {
    set.add("Staff & Management");
    set.add("Documentation / SOPs");
  }
  if (lower.includes("redesign") || lower.includes("improve my server")) {
    set.add("Branding");
    set.add("Graphic Design");
    set.add("Server Setup");
  }

  const focusAreas = set.size > 0 ? Array.from(set) : ["Server Setup", "Branding", "Graphic Design"];
  return { focusAreas: focusAreas.slice(0, 5), usedAI: false };
}

/**
 * Get grouped resource suggestions for a natural-language query and/or selected focus areas.
 * If focusAreasOverride is provided and non-empty, it is used; otherwise classifies from query.
 * Resources always come from the database; no hallucinated entries.
 */
export async function getSuggestionsForQuery(
  query: string,
  focusAreasOverride?: string[]
): Promise<{
  grouped: GroupedResourceList;
  reasons: Record<string, string>;
  usedAI: boolean;
}> {
  const trimmed = query.trim();
  const allowedSet = new Set(ALLOWED_FOCUS_AREAS);
  const validOverride =
    Array.isArray(focusAreasOverride) && focusAreasOverride.length > 0
      ? focusAreasOverride.filter((a) => allowedSet.has(a)).slice(0, 6)
      : null;

  let areas: string[];
  let usedAI: boolean;
  if (validOverride && validOverride.length > 0) {
    areas = validOverride;
    usedAI = false;
  } else {
    const classified =
      (await classifyIntentWithAI(trimmed)) ?? classifyIntentFallback(trimmed);
    areas = classified.focusAreas;
    usedAI = classified.usedAI;
  }

  const syntheticInput = {
    name: "Assistant request",
    projectType: "Other",
    skillLevel: "Intermediate",
    budgetRange: "Medium",
    timelineUrgency: "Within a month",
    focusAreas: areas,
    description: trimmed,
  };

  const grouped = await generateResourceList(syntheticInput);
  const reasons = buildReasons(grouped, areas, trimmed);

  return {
    grouped,
    reasons,
    usedAI,
  };
}

/** Build a short "why" explanation for each resource. Template-based, no AI. */
function buildReasons(
  grouped: GroupedResourceList,
  focusAreas: string[],
  _query: string
): Record<string, string> {
  const reasons: Record<string, string> = {};
  const add = (r: ScoredResource) => {
    const area = focusAreas[0] || "your project";
    reasons[r.resourceId] = `Matches your focus on ${area.toLowerCase()}. ${r.description.slice(0, 80)}${r.description.length > 80 ? "…" : ""}`;
  };
  grouped.required.forEach(add);
  grouped.recommended.forEach(add);
  grouped.optional.forEach(add);
  return reasons;
}
