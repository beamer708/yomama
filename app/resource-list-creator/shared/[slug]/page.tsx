import { notFound } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { prisma } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SharedListPage({ params }: PageProps) {
  const { slug } = await params;
  const list = await prisma.savedList.findFirst({
    where: { slug, sharedAt: { not: null } },
    include: {
      projectPlan: true,
      items: {
        where: { removed: false },
        include: { resource: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!list) notFound();

  const byPriority = {
    required: list.items.filter((i) => i.priority === "required"),
    recommended: list.items.filter((i) => i.priority === "recommended"),
    optional: list.items.filter((i) => i.priority === "optional"),
  };

  const sections = [
    { key: "required" as const, label: "Required", color: "from-amber-500/20 to-orange-600/10 border-amber-500/30" },
    { key: "recommended" as const, label: "Recommended", color: "from-primary/20 to-primary/5 border-primary/30" },
    { key: "optional" as const, label: "Optional", color: "from-foreground/10 to-transparent border-border" },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-heading">{list.projectPlan.name}</h1>
            <p className="section-subheading mt-1">
              Shared resource list · {list.projectPlan.projectType}
            </p>
          </div>
          <Link
            href="/resource-list-creator"
            className="btn-primary"
          >
            Create your own list
            <Icon name="arrow-right" className="text-base" />
          </Link>
        </div>

        <div className="space-y-6">
          {sections.map(({ key, label, color }) => {
            const items = byPriority[key];
            if (items.length === 0) return null;
            return (
              <div
                key={key}
                className={`rounded-2xl border bg-gradient-to-br ${color} overflow-hidden`}
              >
                <div className="px-5 py-4 font-semibold text-foreground">
                  {label} ({items.length})
                </div>
                <div className="space-y-3 px-4 pb-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-card/50 p-4"
                    >
                      <a
                        href={item.resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary inline-flex items-center gap-1"
                      >
                        {item.resource.title}
                        <Icon name="up-right-from-square" className="text-xs" />
                      </a>
                      <p className="mt-1 text-sm text-foreground/70">
                        {item.resource.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-foreground/70">
                          {item.resource.category}
                        </span>
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-foreground/70 capitalize">
                          {item.resource.difficultyLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
