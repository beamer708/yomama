import Link from "next/link";
import Icon from "@/components/Icon";

export default function CommunityGuidesPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Community Guides
          </h1>
          <p className="text-lg text-foreground/70">
            High level guidance for ERLC communities. These guides provide frameworks and perspectives 
            to help you think through common challenges and opportunities.
          </p>
        </div>

        {/* Empty State */}
        <div className="rounded-lg bg-card border border-border p-16 text-center">
          <Icon name="clock" className="mx-auto block text-5xl text-foreground/30 mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            More Coming Soon
          </h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Community guides are coming soon. Unity Vault is focused on curating the best existing resources 
            to help ERLC communities grow.
          </p>
          <p className="text-sm text-foreground/60 mb-6">
            In the meantime, explore the Resources Vault for curated content that can help you build your community.
          </p>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            <Icon name="book" className="text-base" />
            Explore Resources Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
