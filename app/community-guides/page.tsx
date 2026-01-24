import Link from "next/link";

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
        </div>

        {/* Empty State */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-card border border-border p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-foreground/40 mb-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              No Guides Available Yet
            </h2>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
              Community guides are coming soon. Unity Lab is focused on curating the best existing resources 
              to help ERLC communities grow.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-foreground/60">
                In the meantime, explore the Resources Vault for curated content that can help you build your community.
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
      </div>
    </div>
  );
}
