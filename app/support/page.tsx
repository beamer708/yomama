import Link from "next/link";
import Icon from "@/components/Icon";
import { STATUS_URL } from "@/lib/site-structure";

export default function SupportPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-12">
          <h1 className="section-heading">Support</h1>
          <p className="section-subheading mt-3">
            Get help, join the community, or find guides and legal information.
          </p>
        </div>

        <div className="space-y-6">
          <a
            href="https://discord.gg/rJECs3rpDh"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card-hover"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="discord" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Discord</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Join the Unity Vault Discord for community support, updates, and discussion.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Join server
                <Icon name="up-right-from-square" className="text-xs" />
              </span>
            </div>
          </a>

          <Link
            href="/community-guides"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card-hover block"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="book" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Community Guides</h2>
              <p className="mt-1 text-sm text-foreground/70">
                High-level guidance and frameworks for building ERLC communities.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                View guides
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>

          <Link
            href="/staff-application"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card-hover block"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="users" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Staff Application</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Interested in helping run Unity Vault? Apply to join the team.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Apply
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>

          <Link
            href="/legal"
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card-hover block"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon name="document" className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Legal</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Terms of use, privacy, and other legal information.
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read
                <Icon name="arrow-right" className="text-xs" />
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-border/60 bg-card/30 p-6">
          <h3 className="font-semibold text-foreground">Status and uptime</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Check service status and incident history on our status page.
          </p>
          <a
            href={STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            Open status page
            <Icon name="up-right-from-square" className="text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
}
