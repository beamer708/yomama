import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import ERLCLogo from "@/components/ERLCLogo";
import { NAV } from "@/lib/site-structure";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-bg-hero pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-40">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59, 130, 246, 0.18), transparent 55%)",
          }}
        />
        <div className="page-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center gap-4 items-center">
              <Image
                src="/UnityLogo.svg"
                alt=""
                width={72}
                height={72}
                className="opacity-95 drop-shadow-lg"
              />
              <ERLCLogo size={56} className="opacity-95 drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The ERLC resource platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl max-w-2xl mx-auto">
              Curated resources, tools, and guidance for building successful ERLC communities. One place to find what you need. No fluff.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href={NAV.resources.href} className="btn-primary">
                <Icon name="book" className="text-lg" />
                Explore resources
              </Link>
              <Link
                href={NAV.resources.href}
                className="btn-secondary text-white border-white/30 hover:bg-white/10 hover:border-white/50"
              >
                Get resource suggestions
                <Icon name="arrow-right" className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">What we offer</h2>
            <p className="section-subheading mx-auto">
              Unity Vault curates the best existing resources. We organize them so you can learn faster and build with confidence.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            {[
              {
                title: "Curated resources",
                description: "Server setup, graphic design, branding, and tools, organized by category. All credit to original creators.",
                icon: "book" as const,
              },
              {
                title: "Resource Assistant",
                description: "Describe your project and get a tailored list of resources. Save, share, and export your plan.",
                icon: "sparkles" as const,
              },
              {
                title: "Community first",
                description: "Built for ERLC server owners and creators. Clear structure, no overlap. Everything has its place.",
                icon: "users" as const,
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="gradient-border card-hover-lift p-8 rounded-2xl animate-in-fade"
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

      {/* Resources CTA */}
      <section className="relative section-spacing bg-card/30">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          aria-hidden
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.04) 50%, transparent 100%)",
          }}
        />
        <div className="page-container relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">Find what you need</h2>
            <p className="section-subheading mx-auto">
              Tell us what you&apos;re working on and get tailored resource suggestions. One page, no forms.
            </p>
          </div>
          <div className="mt-10 text-center">
            <Link href={NAV.resources.href} className="btn-primary">
              <Icon name="sparkles" className="text-lg" />
              Go to Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Why Unity Vault */}
      <section className="section-spacing bg-card/20">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 mb-6">
              <Icon name="bulb" className="text-2xl text-primary" />
            </div>
            <h2 className="section-heading">Why big servers aren’t different</h2>
            <p className="section-subheading mx-auto mt-4">
              Many ERLC owners assume large servers have secret playbooks. The reality: they learned from the same public resources everyone else can use. Success comes from organization, consistency, and execution. Unity Vault puts those resources in one place.
            </p>
            <Link
              href={NAV.resources.href}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Start exploring
              <Icon name="arrow-right" className="text-base" />
            </Link>
          </div>
        </div>
      </section>

      {/* Support & Status strip */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 to-transparent p-8 sm:p-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Support and status
                </h2>
                <p className="mt-2 text-foreground/70 max-w-md">
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

      {/* Final CTA */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-10 sm:p-16 text-center">
            <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none" aria-hidden />
            <h2 className="relative text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ready to build your community?
            </h2>
            <p className="relative mt-3 text-foreground/80 max-w-xl mx-auto">
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
