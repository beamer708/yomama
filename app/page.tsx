import Link from "next/link";
import { BookOpen, Library, Users, Lightbulb, CheckSquare, ArrowRight, Layers, Palette, MessageSquare, TrendingUp, Users2, Settings, Bot, Info } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-6">
              <Library className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Your ERLC Community Resource Vault
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              Unity Vault exists to remove the intimidation factor around building successful ERLC communities. 
              Everything you need to learn, organized in one place.
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/60">
              Big servers learned from public resources. You can learn the same way through organization, 
              consistency, and execution.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <BookOpen className="h-4 w-4" />
                Explore Resources
              </Link>
              <Link
                href="/community-guides"
                className="inline-flex items-center gap-1.5 text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
              >
                Learn How Servers Grow
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Unity Vault Is */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Info className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Unity Vault Is
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-lg bg-card p-8 border border-border hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <Library className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">A Resource Vault</h3>
                </div>
                <p className="text-foreground/70">
                  Unity Vault is a vault of knowledge, not a tutorial creator. We curate the best ERLC resources 
                  already available on the web and organize them clearly and professionally.
                </p>
              </div>
              <div className="rounded-lg bg-card p-8 border border-border hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Organized Learning</h3>
                </div>
                <p className="text-foreground/70">
                  Visitors should feel like they discovered a gold mine when landing on the site. Everything 
                  needed to learn ERLC success is organized in one place, making growth accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It Is For */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Who It Is For
              </h2>
            </div>
            <p className="text-lg leading-8 text-foreground/70 mb-12">
              Unity Vault serves the entire ERLC community ecosystem
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    Design Servers
                  </dt>
                </div>
                <dd className="mt-1 text-base leading-7 text-foreground/70">
                  Resources for building professional server branding, graphics, and visual identity.
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Users2 className="h-5 w-5 text-primary" />
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    Roleplay Servers
                  </dt>
                </div>
                <dd className="mt-1 text-base leading-7 text-foreground/70">
                  Frameworks and guides for structuring roleplay systems, staff management, and community building.
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    Misc Servers for ERLC
                  </dt>
                </div>
                <dd className="mt-1 text-base leading-7 text-foreground/70">
                  Resources for various ERLC server types and community expansion.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Why Big Servers Are Not Different */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Lightbulb className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Why Big Servers Are Not Different
              </h2>
            </div>
            <div className="space-y-8">
              <div className="rounded-lg bg-card p-8 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">The Truth About Growth</h3>
                </div>
                <p className="text-foreground/70 mb-4">
                  Many ERLC owners overthink growth and believe large servers have secret knowledge. 
                  Unity Vault reframes that mindset by showing that big servers learned from public resources.
                </p>
                <p className="text-foreground/70">
                  Success comes from organization, consistency, and execution. The resources are already out there. 
                  Unity Vault helps you find them, understand them, and apply them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Unity Vault Helps */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckSquare className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How Unity Vault Helps
              </h2>
            </div>
            <p className="text-lg leading-8 text-foreground/70 mb-12">
              We remove barriers to learning and growth
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  Curated Resources
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/70">
                  We find and organize the best ERLC resources from across the web, saving you time and effort.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                  Clear Organization
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/70">
                  Resources are categorized and searchable, making it easy to find exactly what you need.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  Community First
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/70">
                  Everything is designed to support the ERLC community, with proper credit to original creators.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Featured Resource Categories */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Featured Resource Categories
            </h2>
            <p className="text-lg leading-8 text-foreground/70 mb-12">
              Explore resources organized by topic
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {[
              { name: "Server Branding", icon: Palette },
              { name: "Graphic Design Fundamentals", icon: Layers },
              { name: "Discord Setup and Visuals", icon: MessageSquare },
              { name: "Roleplay Structure", icon: Users2 },
              { name: "Advertising and Growth", icon: TrendingUp },
              { name: "Staff Systems", icon: Settings },
              { name: "Community Management", icon: Users },
              { name: "Automation and Bots", icon: Bot },
            ].map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href={`/resources?category=${encodeURIComponent(name)}`}
                className="group rounded-lg bg-card p-6 border border-border hover:border-primary/40 hover:bg-card-hover transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-base font-semibold text-foreground">{name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Trust Statement */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-6">
              <Users className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Community Trust
            </h2>
            <p className="text-lg leading-8 text-foreground/70">
              Unity Vault is built on trust and respect for the ERLC community. We curate resources with care, 
              always credit original creators, and focus on helping communities grow. This is a resource vault 
              for everyone, by the community.
            </p>
            <div className="mt-10">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Start Exploring Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
