import Link from "next/link";
import Icon from "@/components/Icon";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your ERLC Community Resource Vault
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70 sm:text-xl">
              Unity Vault exists to remove the intimidation factor around building successful ERLC communities. 
              Everything you need to learn, organized in one place.
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/60">
              Big servers learned from public resources. You can learn the same way through organization, 
              consistency, and execution.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Icon name="book" className="text-base" />
                Explore Resources
              </Link>
              <Link
                href="/community-guides"
                className="inline-flex items-center gap-1.5 text-sm font-medium leading-6 text-foreground/80 hover:text-foreground transition-colors"
              >
                Learn How Servers Grow
                <Icon name="arrow-right" className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Unity Vault Is */}
      <section className="py-20 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Unity Vault Is
              </h2>
              <p className="mt-4 text-lg text-foreground/70">
                A curated resource vault for the ERLC community
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-lg bg-card p-8 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="books" className="text-2xl text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">A Resource Vault</h3>
                </div>
                <p className="text-foreground/70 leading-7">
                  Unity Vault is a vault of knowledge, not a tutorial creator. We curate the best ERLC resources 
                  already available on the web and organize them clearly and professionally.
                </p>
              </div>
              <div className="rounded-lg bg-card p-8 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="book" className="text-2xl text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Organized Learning</h3>
                </div>
                <p className="text-foreground/70 leading-7">
                  Visitors should feel like they discovered a gold mine when landing on the site. Everything 
                  needed to learn ERLC success is organized in one place, making growth accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It Helps */}
      <section className="py-20 sm:py-24 bg-card/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Who It Helps
            </h2>
            <p className="text-lg leading-8 text-foreground/70 mb-12">
              Unity Vault serves the entire ERLC community ecosystem
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="palette" className="text-xl text-primary" />
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    Design Servers
                  </dt>
                </div>
                <dd className="mt-1 text-base leading-7 text-foreground/70">
                  Resources for building professional server branding, graphics, and visual identity.
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="users-alt" className="text-xl text-primary" />
                  <dt className="text-base font-semibold leading-7 text-foreground">
                    Roleplay Servers
                  </dt>
                </div>
                <dd className="mt-1 text-base leading-7 text-foreground/70">
                  Frameworks and guides for structuring roleplay systems, staff management, and community building.
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="layers" className="text-xl text-primary" />
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
      <section className="py-20 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
                Why Big Servers Are Not Different
              </h2>
            </div>
            <div className="rounded-lg bg-card p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="bulb" className="text-2xl text-primary" />
                <h3 className="text-xl font-semibold text-foreground">The Truth About Growth</h3>
              </div>
              <p className="text-foreground/70 leading-7 mb-4">
                Many ERLC owners overthink growth and believe large servers have secret knowledge. 
                Unity Vault reframes that mindset by showing that big servers learned from public resources.
              </p>
              <p className="text-foreground/70 leading-7">
                Success comes from organization, consistency, and execution. The resources are already out there. 
                Unity Vault helps you find them, understand them, and apply them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the Vault Works */}
      <section className="py-20 sm:py-24 bg-card/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              How the Vault Works
            </h2>
            <p className="text-lg leading-8 text-foreground/70 mb-12">
              We remove barriers to learning and growth
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
              <div className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-foreground mb-2">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon name="book" className="text-lg text-primary" />
                  </div>
                  Curated Resources
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/70">
                  We find and organize the best ERLC resources from across the web, saving you time and effort.
                </dd>
              </div>
              <div className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-foreground mb-2">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon name="layers" className="text-lg text-primary" />
                  </div>
                  Clear Organization
                </dt>
                <dd className="mt-2 text-base leading-7 text-foreground/70">
                  Resources are categorized and searchable, making it easy to find exactly what you need.
                </dd>
              </div>
              <div className="relative pl-12">
                <dt className="text-base font-semibold leading-7 text-foreground mb-2">
                  <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Icon name="users" className="text-lg text-primary" />
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

      {/* Resource Categories Preview */}
      <section className="py-20 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Resource Categories
            </h2>
            <p className="text-lg leading-8 text-foreground/70 mb-12">
              Explore resources organized by topic
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {[
              { name: "Server Branding", icon: "palette" as const },
              { name: "Graphic Design Fundamentals", icon: "layers" as const },
              { name: "Discord Setup and Visuals", icon: "discord" as const },
              { name: "Roleplay Structure", icon: "users-alt" as const },
              { name: "Advertising and Growth", icon: "arrow-trend-up" as const },
              { name: "Staff Systems", icon: "settings" as const },
              { name: "Community Management", icon: "users" as const },
              { name: "Automation and Bots", icon: "chatbot" as const },
            ].map(({ name, icon }) => (
              <Link
                key={name}
                href={`/resources?category=${encodeURIComponent(name)}`}
                className="group rounded-lg bg-card p-5 border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon name={icon} className="text-lg text-primary shrink-0" />
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community First Statement */}
      <section className="py-20 sm:py-24 bg-card/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Community First
            </h2>
            <p className="text-lg leading-8 text-foreground/70 mb-8">
              Unity Vault is built on trust and respect for the ERLC community. We curate resources with care, 
              always credit original creators, and focus on helping communities grow. This is a resource vault 
              for everyone, by the community.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              <Icon name="book" className="text-base" />
              Start Exploring Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
