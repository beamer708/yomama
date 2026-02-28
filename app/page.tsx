import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import ERLCLogo from "@/components/ERLCLogo";
import { NAV } from "@/lib/site-structure";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden gradient-bg-hero section-grid-overlay pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
        <div className="page-container relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-4">
              <Image
                src="/UnityLogo.svg"
                alt=""
                width={64}
                height={64}
                className="opacity-95"
              />
              <ERLCLogo size={52} className="opacity-95" />
            </div>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              Built for serious ERLC teams
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The premium operating layer for ERLC resources
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Unity Vault organizes high-signal resources, tools, and guidance into a single workflow so your team can build faster, execute cleaner, and grow with confidence.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href={NAV.resources.href} className="btn-primary">
                <Icon name="book" className="text-lg" />
                Explore resources
              </Link>
              <Link
                href={NAV.resources.href}
                className="btn-secondary"
              >
                Get resource suggestions
                <Icon name="arrow-right" className="text-base" />
              </Link>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Curated Library", "Tools, guides, and references in one place"],
                ["Fast Discovery", "Find the right resource stack in minutes"],
                ["Execution Focused", "Built for owners and management teams"],
              ].map((item) => (
                <div key={item[0]} className="surface-panel rounded-xl px-4 py-3 text-left">
                  <p className="text-sm font-semibold text-foreground">{item[0]}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">A cleaner way to run your resource stack</h2>
            <p className="section-subheading mx-auto">
              Most communities waste time switching between links, docs, and half-finished notes. Unity Vault gives your team one structured place to discover and execute.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
            {[
              {
                title: "Curated Intelligence",
                description: "Server setup, branding, management, and growth resources sorted by real operational needs.",
                icon: "book" as const,
              },
              {
                title: "Assistant Workflow",
                description: "Describe your target outcome and get a tailored stack of resources you can use immediately.",
                icon: "sparkles" as const,
              },
              {
                title: "Team-Ready Structure",
                description: "Built for owners, staff, and creators with a structure that reduces guesswork and overlap.",
                icon: "users" as const,
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="gradient-border gradient-card card-hover-lift rounded-2xl p-8 animate-in-fade"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon name={card.icon} className="text-2xl" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-foreground/70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-container relative">
          <div className="surface-panel mx-auto max-w-5xl rounded-3xl px-8 py-10 sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:items-center">
              <div>
                <h2 className="section-heading">What big communities do differently</h2>
                <p className="section-subheading">
                  They do not rely on hidden secrets. They rely on systems. Unity Vault helps you apply the same public resources through a cleaner execution model.
                </p>
                <Link
                  href={NAV.resources.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Start exploring
                  <Icon name="arrow-right" className="text-base" />
                </Link>
              </div>
              <div className="grid gap-3">
                {[
                  "One source of truth for your team",
                  "Reduced decision fatigue and duplicate effort",
                  "Faster onboarding for staff and creators",
                ].map((line) => (
                  <div key={line} className="rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border/70 bg-card/75 p-8 sm:p-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Support and status
                </h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Join our Discord for help, check status and updates, or read community guides.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href={NAV.support.href} className="btn-secondary">
                  Support
                </Link>
                <Link href={NAV.status.href} className="btn-ghost">
                  Status
                </Link>
                <a
                  href="https://discord.gg/3qpVpCBwj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Icon name="discord" className="text-lg" />
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(102,227,255,0.14),transparent_55%)]" aria-hidden />
            <h2 className="relative text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ready to build your community?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
              Explore the vault and get the resources that help successful ERLC servers grow.
            </p>
            <div className="relative mt-8">
              <Link href={NAV.resources.href} className="btn-primary">
                <Icon name="book" className="text-lg" />
                Explore resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
