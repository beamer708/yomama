import Link from "next/link";

interface Guide {
  id: string;
  title: string;
  description: string;
  topics: string[];
}

const guides: Guide[] = [
  {
    id: "1",
    title: "Starting a Server Without Overthinking",
    description: "High level guidance for starting an ERLC server with confidence, avoiding common pitfalls that lead to paralysis by analysis.",
    topics: ["Initial Planning", "Resource Gathering", "Team Building", "Launch Strategy"],
  },
  {
    id: "2",
    title: "Building Trust Before Growth",
    description: "Understanding why trust is the foundation of sustainable growth and how to build it from day one.",
    topics: ["Community Values", "Transparency", "Consistency", "Member Relationships"],
  },
  {
    id: "3",
    title: "Staff Structure That Works",
    description: "Guidance on creating staff structures that scale with your community and support long term success.",
    topics: ["Role Definition", "Hierarchy Design", "Communication Systems", "Accountability"],
  },
  {
    id: "4",
    title: "Avoiding Burnout as an Owner",
    description: "Strategies for maintaining sustainable server management practices and preventing owner burnout.",
    topics: ["Workload Management", "Delegation", "Boundaries", "Long Term Sustainability"],
  },
];

export default function CommunityGuidesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:max-w-4xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Community Guides
          </h1>
          <p className="text-lg text-foreground/70 mb-6">
            High level guidance for ERLC communities. These guides provide frameworks and perspectives 
            to help you think through common challenges and opportunities.
          </p>
          <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
            <p className="text-sm text-foreground/80">
              Community guides are not step by step tutorials. They provide guidance, frameworks, and 
              perspectives to help you make informed decisions for your community.
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="rounded-lg bg-card border border-border p-8 hover:border-primary/40 transition-all"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                {guide.title}
              </h2>
              <p className="text-foreground/70 mb-6">
                {guide.description}
              </p>
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Topics Covered</h3>
                <ul className="space-y-2">
                  {guide.topics.map((topic, index) => (
                    <li key={index} className="flex items-center text-sm text-foreground/70">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/community-guides/${guide.id}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Read Guide →
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Guidance */}
        <div className="mt-12 rounded-lg bg-card border border-border p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Looking for More Specific Resources?
          </h3>
          <p className="text-foreground/70 mb-6">
            Community guides provide high level guidance. For specific tutorials, tools, and detailed 
            resources, explore the Resources Vault.
          </p>
          <Link
            href="/resources"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Explore Resources Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
