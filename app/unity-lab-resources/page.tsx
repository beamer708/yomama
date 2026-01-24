import Link from "next/link";

interface UnityLabResource {
  id: string;
  title: string;
  description: string;
  type: "framework" | "checklist" | "explanation" | "breakdown" | "overview";
  category: string;
}

const unityLabResources: UnityLabResource[] = [
  {
    id: "1",
    title: "Server Growth Framework",
    description: "A structured framework for understanding and implementing server growth strategies without overthinking.",
    type: "framework",
    category: "Growth",
  },
  {
    id: "2",
    title: "Pre-Launch Checklist",
    description: "Essential checklist for launching an ERLC server with confidence and proper preparation.",
    type: "checklist",
    category: "Launch",
  },
  {
    id: "3",
    title: "Staff Structure Overview",
    description: "Overview of effective staff structures that work for ERLC communities of all sizes.",
    type: "overview",
    category: "Staff",
  },
  {
    id: "4",
    title: "Common Mistakes Breakdown",
    description: "Breakdown of common mistakes ERLC owners make and how to avoid them.",
    type: "breakdown",
    category: "Guidance",
  },
  {
    id: "5",
    title: "Trust Building Framework",
    description: "Framework for building trust in your community before focusing on growth.",
    type: "framework",
    category: "Community",
  },
  {
    id: "6",
    title: "Owner Burnout Prevention",
    description: "Explanation of owner burnout patterns and strategies for sustainable server management.",
    type: "explanation",
    category: "Management",
  },
];

const typeLabels: Record<UnityLabResource["type"], string> = {
  framework: "Framework",
  checklist: "Checklist",
  explanation: "Explanation",
  breakdown: "Breakdown",
  overview: "Overview",
};

export default function UnityLabResourcesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:max-w-4xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Unity Lab Resources
          </h1>
          <p className="text-lg text-foreground/70 mb-6">
            Original Unity Lab content including frameworks, checklists, explanations, and guidance. 
            These resources are designed to help you understand and apply the curated resources effectively.
          </p>
          <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
            <p className="text-sm text-foreground/80">
              Unity Lab resources are frameworks and guidance, not tutorials. They help you organize 
              your thinking and apply what you learn from the curated resources.
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {unityLabResources.map((resource) => (
            <div
              key={resource.id}
              className="group rounded-lg bg-card border border-border p-6 hover:border-primary/40 hover:bg-card-hover transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {typeLabels[resource.type]}
                </span>
                <span className="text-xs text-foreground/60">{resource.category}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-foreground/70 mb-4">
                {resource.description}
              </p>
              <Link
                href={`/unity-lab-resources/${resource.id}`}
                className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                View Resource →
              </Link>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 rounded-lg bg-card border border-border p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            More Resources Coming Soon
          </h3>
          <p className="text-foreground/70 mb-4">
            Unity Lab is continuously developing frameworks and guidance based on community needs.
          </p>
          <Link
            href="/submit"
            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            Suggest a Resource Topic →
          </Link>
        </div>
      </div>
    </div>
  );
}
