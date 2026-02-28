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
    { key: "required" as const, label: "Required", color: "border-primary/35 bg-card/95" },
    { key: "recommended" as const, label: "Recommended", color: "border-border bg-card/90" },
    { key: "optional" as const, label: "Optional", color: "border-border/80 bg-card/80" },
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
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
              <div key={key} className={`overflow-hidden rounded-2xl ${color}`}>
                <div className="border-b border-border/60 px-5 py-4 font-semibold text-foreground">
                  {label} ({items.length})
                </div>
                <div className="space-y-3 px-4 pb-4 pt-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-card/85 p-4"
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
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.resource.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-muted-foreground">
                          {item.resource.category}
                        </span>
                        <span className="rounded-md bg-white/5 px-2 py-0.5 text-muted-foreground capitalize">
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
