import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

const featuredCategories = [
  { name: "Graphic Design & Branding", href: "/resources?category=Graphic%20Design%20and%20Branding", icon: "palette" as const },
  { name: "Discord & Visuals", href: "/resources?category=Discord%20Server%20Visuals", icon: "discord" as const },
  { name: "Advertising & Growth", href: "/resources?category=Advertising%20and%20Growth", icon: "arrow-trend-up" as const },
  { name: "Community Building", href: "/resources?category=Community%20Building", icon: "users" as const },
];

const valueCards = [
  {
    title: "Curated resources",
    description: "We find and organize the best ERLC resources from across the web so you can focus on building.",
    icon: "book" as const,
  },
  {
    title: "Clear organization",
    description: "Everything is categorized and searchable. Find what you need without the guesswork.",
    icon: "layers" as const,
  },
  {
    title: "Community first",
    description: "Built for ERLC server owners and communities. All credit goes to original creators.",
    icon: "users" as const,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-bg-hero pt-16 pb-28 sm:pt-24 sm:pb-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)] pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="/UnityLogo.svg"
                alt=""
                width={64}
                height={64}
                className="opacity-95"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              The ERLC community resource vault
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80 sm:text-xl">
              Everything you need to build a successful ERLC community, organized in one place. No fluff—just curated resources that scale.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/resources" className="btn-primary">
                <Icon name="book" className="text-lg" />
                Explore resources
              </Link>
              <Link href="/community-guides" className="btn-ghost text-white/90 hover:text-white hover:bg-white/10">
                Community guides
                <Icon name="arrow-right" className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">What we offer</h2>
            <p className="section-subheading mx-auto">
              Unity Vault curates the best existing resources. We don’t create tutorials—we organize them so you can learn faster.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
            {valueCards.map((card, i) => (
              <div
                key={card.title}
                className="gradient-border card-hover-lift p-8 animate-in-fade"
                style={{ animationDelay: `${i * 60}ms` }}
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

      {/* Resource categories (IA) */}
      <section className="relative py-20 sm:py-28 bg-card/40">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(59,130,246,0.04)_50%,transparent_100%)] pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-heading">Browse by category</h2>
            <p className="section-subheading mx-auto">
              Graphic design, server tools, community building, and more—all in one place.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-200 hover:border-primary/30 hover:bg-card-hover"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon name={cat.icon} className="text-2xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </div>
                <Icon name="arrow-right" className="shrink-0 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/resources" className="btn-ghost">
              View all categories
              <Icon name="arrow-right" className="text-base" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Unity Vault */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="gradient-border overflow-hidden p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                  <Icon name="bulb" className="text-2xl text-primary" />
                </div>
                <h2 className="section-heading text-2xl sm:text-3xl">
                  Why big servers aren’t different
                </h2>
              </div>
              <p className="text-foreground/80 leading-relaxed">
                Many ERLC owners assume large servers have secret playbooks. The reality: they learned from the same public resources everyone else can use. Success comes from organization, consistency, and execution. Unity Vault puts those resources in one place so you can find them, understand them, and apply them.
              </p>
              <Link
                href="/resources"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
              >
                Start exploring
                <Icon name="arrow-right" className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-10 sm:p-16 text-center">
            <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none" aria-hidden />
            <h2 className="relative text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Ready to build your community?
            </h2>
            <p className="relative mt-3 text-foreground/80 max-w-xl mx-auto">
              Explore the vault and get the resources that help successful ERLC servers grow.
            </p>
            <div className="relative mt-8">
              <Link href="/resources" className="btn-primary">
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
