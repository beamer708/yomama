import Link from "next/link";
import Icon from "@/components/Icon";

export default function CommunityGuidesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="books" className="text-2xl" />
          </div>
          <h1 className="section-heading">Helpful Guides</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Pick a guide topic and follow step-by-step instructions. More guides will be added over time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/community-guides/emojis"
            className="group rounded-2xl border border-border bg-card/85 p-6 transition-all hover:border-primary/40 hover:bg-card-hover"
          >
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="sparkles" className="text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              Create Discord Emojis
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn how to use icon sites, download SVG, recolor in an editor, size to 32x32, and upload to Discord.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open guide
              <Icon name="arrow-right" className="text-xs" />
            </span>
          </Link>

          <div className="rounded-2xl border border-border bg-card/80 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-foreground/70">
              <Icon name="clock" className="text-xl" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">More guides coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We’ll continue adding practical guides for branding, visual systems, and community operations.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/resources" className="btn-primary">
            <Icon name="book" className="text-base" />
            Open Resource Vault
          </Link>
          <a
            href="https://discord.gg/3qpVpCBwj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <Icon name="discord" className="text-base" />
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
