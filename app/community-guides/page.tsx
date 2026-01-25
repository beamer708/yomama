import Link from "next/link";
import { FileText, BookOpen, Clock } from "lucide-react";

export default function CommunityGuidesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Community Guides
            </h1>
          </div>
          <p className="text-lg text-foreground/70 mb-6">
            High level guidance for ERLC communities. These guides provide frameworks and perspectives 
            to help you think through common challenges and opportunities.
          </p>
        </div>

        {/* Empty State */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg bg-card border border-border p-12 text-center">
            <Clock className="mx-auto h-16 w-16 text-foreground/40 mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              No Guides Available Yet
            </h2>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
              Community guides are coming soon. Unity Vault is focused on curating the best existing resources 
              to help ERLC communities grow.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-foreground/60">
                In the meantime, explore the Resources Vault for curated content that can help you build your community.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Explore Resources Vault
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
