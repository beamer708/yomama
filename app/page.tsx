import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/site-structure";
import uLogo from "@/Media/ULogo.svg";
import ScrollAnimator from "@/components/ScrollAnimator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ScrollAnimator />

      {/* ── HERO — visible on load, no animate-on-scroll ──────────────────── */}
      <section className="relative overflow-hidden gradient-bg-hero section-grid-overlay pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32">
        <div className="page-container relative">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-4">
              <Image
                src={uLogo}
                alt=""
                width={64}
                height={64}
                className="opacity-95"
              />
            </div>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              Helping ERLC communities grow smarter.
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
                Enter Vault
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

      {/* ── SECTION 1: How It Works ───────────────────────────────────────── */}
      <section className="section-spacing" aria-labelledby="how-it-works-heading">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2
              id="how-it-works-heading"
              className="section-heading animate-on-scroll"
            >
              How It Works
            </h2>
            <p className="section-subheading mx-auto animate-on-scroll">
              Three steps. No guesswork.
            </p>
          </div>
          <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Browse the Vault",
                body: "Explore curated resources organized by category, ready to use immediately.",
              },
              {
                num: "02",
                title: "Apply It to Your Server",
                body: "Take what fits your structure and implement it with confidence.",
              },
              {
                num: "03",
                title: "Grow With Clarity",
                body: "Build consistently using proven organization and presentation principles.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="animate-on-scroll rounded-2xl border border-border bg-card p-8"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <span className="step-num block text-5xl font-bold leading-none">
                  {step.num}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Inside the Vault ──────────────────────────────────── */}
      <section className="section-spacing" aria-labelledby="inside-vault-heading">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2
              id="inside-vault-heading"
              className="section-heading animate-on-scroll"
            >
              Inside the Vault
            </h2>
            <p className="section-subheading mx-auto animate-on-scroll">
              A curated look at what Unity Vault organizes for you.
            </p>
          </div>
          <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Branding",
                body: "Fonts, color systems, and visual identity frameworks.",
              },
              {
                title: "Discord Structure",
                body: "Channel layouts, role hierarchies, and server organization templates.",
              },
              {
                title: "Server Growth",
                body: "Consistency guides, presentation principles, and community systems.",
              },
              {
                title: "Design Tools",
                body: "Curated professional tools used by leading ERLC communities.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="animate-on-scroll rounded-xl border border-border bg-card p-6"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="text-base font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={NAV.resources.href} className="btn-primary animate-on-scroll">
              <Icon name="book" className="text-lg" />
              Enter Vault
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXISTING: A cleaner way to run your resource stack ────────────── */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading animate-on-scroll">
              A cleaner way to run your resource stack
            </h2>
            <p className="section-subheading mx-auto animate-on-scroll">
              The Resource Vault is a curated library of ERLC tools, guides, and references organized by category. One place for your team to find what they need and execute.
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

      {/* ── EXISTING: What big communities do differently ─────────────────── */}
      <section className="section-spacing">
        <div className="page-container relative">
          <div className="surface-panel mx-auto max-w-5xl rounded-3xl px-8 py-10 sm:px-12 sm:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr] lg:items-center">
              <div>
                <h2 className="section-heading animate-on-scroll">
                  What big communities do differently
                </h2>
                <p className="section-subheading animate-on-scroll">
                  They do not rely on hidden secrets. They rely on systems. Unity Vault helps you apply the same public resources through a cleaner execution model.
                </p>
                <Link
                  href={NAV.resources.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors animate-on-scroll"
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
                ].map((line, i) => (
                  <div
                    key={line}
                    className="animate-on-scroll rounded-xl border border-border/70 bg-background/60 px-4 py-3 text-sm text-muted-foreground"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXISTING: Support and status ──────────────────────────────────── */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border/70 bg-card/75 p-8 sm:p-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl animate-on-scroll">
                  Support and status
                </h2>
                <p className="mt-2 max-w-md text-muted-foreground animate-on-scroll">
                  Join our Discord for help, check status and updates, or read community guides.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link href={NAV.support.href} className="btn-secondary animate-on-scroll">
                  Support
                </Link>
                <Link href={NAV.status.href} className="btn-ghost animate-on-scroll" style={{ transitionDelay: "60ms" }}>
                  Status
                </Link>
                <a
                  href="https://discord.gg/HjcqH2djjC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary animate-on-scroll"
                  style={{ transitionDelay: "120ms" }}
                >
                  <Icon name="discord" className="text-lg" />
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Community Stats ────────────────────────────────────── */}
      <section className="section-spacing" aria-labelledby="stats-heading">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 id="stats-heading" className="section-heading animate-on-scroll">
              Built for the Community
            </h2>
          </div>
          <div className="mx-auto max-w-3xl grid gap-10 sm:grid-cols-3 text-center">
            {[
              { number: "500+", label: "Resources Curated", delay: 0 },
              { number: "120+", label: "Servers Helped", delay: 120 },
              { number: "1", label: "Community. Zero Chaos.", delay: 240 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="animate-on-scroll is-scale"
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                <p className="text-6xl font-bold tracking-tight text-foreground">
                  {stat.number}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXISTING: Ready to build your community? ──────────────────────── */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(243,236,226,0.14),transparent_55%)]" aria-hidden />
            <h2 className="relative text-2xl font-bold tracking-tight text-foreground sm:text-3xl animate-on-scroll">
              Ready to build your community?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground animate-on-scroll">
              Explore the vault and get the resources that help successful ERLC servers grow.
            </p>
            <div className="relative mt-8">
              <Link href={NAV.resources.href} className="btn-primary animate-on-scroll">
                <Icon name="book" className="text-lg" />
                Enter Vault
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
