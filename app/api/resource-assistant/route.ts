import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type CanonicalCategory =
  | "server-setup"
  | "branding"
  | "graphic-design"
  | "automation"
  | "staff-management"
  | "marketing"
  | "documentation";

type SkillPriority = "beginner" | "intermediate" | "advanced";

interface ClassificationResult {
  primaryCategories: CanonicalCategory[];
  secondaryCategories: CanonicalCategory[];
  priority: SkillPriority;
}

interface AssistantResource {
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
  isNew?: boolean;
}

const VALID_CATEGORIES: CanonicalCategory[] = [
  "server-setup",
  "branding",
  "graphic-design",
  "automation",
  "staff-management",
  "marketing",
  "documentation",
];

const CATEGORY_TO_FOCUS_AREAS: Record<CanonicalCategory, string[]> = {
  "server-setup": ["Server Setup"],
  branding: ["Branding"],
  "graphic-design": ["Graphic Design", "Branding"],
  automation: ["Automation / Bots", "Server Setup"],
  "staff-management": ["Staff & Management"],
  marketing: ["Marketing & Growth"],
  documentation: ["Documentation / SOPs"],
};

const CATEGORY_TO_DB_CATEGORIES: Record<CanonicalCategory, string[]> = {
  "server-setup": ["Discord Server Visuals", "Discord Utilities", "Automation and Systems"],
  branding: ["Graphic Design", "Discord Server Visuals", "Design Inspiration"],
  "graphic-design": ["Graphic Design", "Graphic Design Tools", "Design Inspiration"],
  automation: ["Automation and Systems", "Discord Utilities"],
  "staff-management": ["Community Building", "Roleplay Structure"],
  marketing: ["Advertising and Growth", "Community Building"],
  documentation: ["Roleplay Structure", "Community Building", "Design Inspiration"],
};

const PRIORITY_ORDER: SkillPriority[] = ["beginner", "intermediate", "advanced"];

function parseFocusTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function difficultyDistance(user: SkillPriority, resource: string): number {
  const normalized = resource.toLowerCase() as SkillPriority;
  const userIndex = PRIORITY_ORDER.indexOf(user);
  const resourceIndex = PRIORITY_ORDER.indexOf(normalized);
  if (userIndex < 0 || resourceIndex < 0) return 1;
  return Math.abs(userIndex - resourceIndex);
}

function keywordFallback(input: string): ClassificationResult {
  const q = input.toLowerCase();
  const hit = (patterns: string[]) => patterns.some((p) => q.includes(p));

  const primary: CanonicalCategory[] = [];
  const secondary: CanonicalCategory[] = [];

  if (hit(["setup", "start", "new server", "channels", "roles"])) primary.push("server-setup");
  if (hit(["brand", "branding", "identity"])) primary.push("branding");
  if (hit(["design", "graphic", "logo", "visual", "thumbnail"])) primary.push("graphic-design");
  if (hit(["bot", "automation", "ticket system"])) primary.push("automation");
  if (hit(["staff", "management", "moderation"])) primary.push("staff-management");
  if (hit(["market", "growth", "advertis", "members"])) primary.push("marketing");
  if (hit(["sop", "documentation", "policy", "guide"])) primary.push("documentation");

  if (primary.length === 0) primary.push("server-setup", "branding");
  if (!primary.includes("graphic-design")) secondary.push("graphic-design");

  const priority: SkillPriority = hit(["advanced", "expert"]) 
    ? "advanced"
    : hit(["beginner", "new", "first time", "starting"])
      ? "beginner"
      : "intermediate";

  return {
    primaryCategories: primary.slice(0, 3),
    secondaryCategories: secondary.slice(0, 3),
    priority,
  };
}

function sanitizeClassification(raw: unknown): ClassificationResult | null {
  if (!raw || typeof raw !== "object") return null;
  const parsed = raw as {
    primaryCategories?: unknown;
    secondaryCategories?: unknown;
    priority?: unknown;
  };

  const primaryCategories = Array.isArray(parsed.primaryCategories)
    ? parsed.primaryCategories.filter(
        (v): v is CanonicalCategory => typeof v === "string" && VALID_CATEGORIES.includes(v as CanonicalCategory)
      )
    : [];

  const secondaryCategories = Array.isArray(parsed.secondaryCategories)
    ? parsed.secondaryCategories.filter(
        (v): v is CanonicalCategory => typeof v === "string" && VALID_CATEGORIES.includes(v as CanonicalCategory)
      )
    : [];

  const priority = parsed.priority;
  const safePriority: SkillPriority =
    priority === "beginner" || priority === "intermediate" || priority === "advanced"
      ? priority
      : "intermediate";

  if (primaryCategories.length === 0 && secondaryCategories.length === 0) return null;

  return { primaryCategories, secondaryCategories, priority: safePriority };
}

async function classifyWithOpenAI(input: string): Promise<ClassificationResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const prompt = `You are helping classify a project request for an ERLC resource platform.

User input:
${input}

Return ONLY valid JSON in this format:
{
  "primaryCategories": [],
  "secondaryCategories": [],
  "priority": "beginner | intermediate | advanced"
}

Valid categories:
- server-setup
- branding
- graphic-design
- automation
- staff-management
- marketing
- documentation

Do not include explanations.
Do not include resources.
Only return JSON.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content) as unknown;
    return sanitizeClassification(parsed);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: unknown };
    const query = typeof body.query === "string" ? body.query.trim() : "";

    if (!query) {
      return NextResponse.json({ error: "Please describe what you want to build." }, { status: 400 });
    }

    const classification = (await classifyWithOpenAI(query)) ?? keywordFallback(query);
    const resources = await prisma.resource.findMany();

    const matchedFocusAreas = new Set<string>();
    const matchedDbCategories = new Set<string>();
    classification.primaryCategories.forEach((c) => {
      CATEGORY_TO_FOCUS_AREAS[c].forEach((v) => matchedFocusAreas.add(v));
      CATEGORY_TO_DB_CATEGORIES[c].forEach((v) => matchedDbCategories.add(v));
    });
    classification.secondaryCategories.forEach((c) => {
      CATEGORY_TO_FOCUS_AREAS[c].forEach((v) => matchedFocusAreas.add(v));
      CATEGORY_TO_DB_CATEGORIES[c].forEach((v) => matchedDbCategories.add(v));
    });

    const queryTokens = query.toLowerCase().split(/\s+/).filter((token) => token.length > 2);

    const scored = resources
      .map((r) => {
        const focusTags = parseFocusTags(r.focusAreaTags);
        const text = `${r.title} ${r.description} ${r.category}`.toLowerCase();

        const primaryFocusScore = focusTags.some((tag) =>
          classification.primaryCategories.some((cat) => CATEGORY_TO_FOCUS_AREAS[cat].includes(tag))
        )
          ? 12
          : 0;
        const secondaryFocusScore = focusTags.some((tag) =>
          classification.secondaryCategories.some((cat) => CATEGORY_TO_FOCUS_AREAS[cat].includes(tag))
        )
          ? 6
          : 0;
        const dbCategoryScore = matchedDbCategories.has(r.category) ? 4 : 0;
        const focusMatchScore = focusTags.some((tag) => matchedFocusAreas.has(tag)) ? 3 : 0;
        const tokenScore = queryTokens.reduce((sum, token) => (text.includes(token) ? sum + 1 : sum), 0);
        const difficultyScore = Math.max(0, 3 - difficultyDistance(classification.priority, r.difficultyLevel));

        const score = primaryFocusScore + secondaryFocusScore + dbCategoryScore + focusMatchScore + tokenScore + difficultyScore;
        return { resource: r, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 24);
    const recommended = top.slice(0, 6);
    const helpful = top.slice(6, 14);
    const optional = top.slice(14, 24);

    const toAssistantResource = (
      entries: Array<{ resource: (typeof resources)[number]; score: number }>,
      priority: "required" | "recommended" | "optional"
    ): AssistantResource[] =>
      entries.map(({ resource, score }) => ({
        resourceId: resource.id,
        title: resource.title,
        description: resource.description,
        type: resource.type,
        url: resource.url,
        category: resource.category,
        creator: resource.creator,
        creatorUrl: resource.creatorUrl,
        section: resource.section,
        difficultyLevel: resource.difficultyLevel,
        priority,
        score,
      }));

    return NextResponse.json({
      classification,
      recommended: toAssistantResource(recommended, "required"),
      helpful: toAssistantResource(helpful, "recommended"),
      optional: toAssistantResource(optional, "optional"),
    });
  } catch (error) {
    console.error("resource-assistant", error);
    return NextResponse.json(
      { error: "Unable to process your request right now. Please try again." },
      { status: 500 }
    );
  }
}
