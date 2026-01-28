import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            About Unity Vault
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <section>
            <p className="text-lg leading-8 text-foreground/70 mb-6">
              Unity Vault exists to help ERLC communities stop overthinking growth.
            </p>
            <p className="text-lg leading-8 text-foreground/70 mb-6">
              Everything successful servers learn comes from public resources. Unity Vault organizes those 
              resources in one place, making it easy to find what you need without spending hours searching.
            </p>
            <p className="text-lg leading-8 text-foreground/70">
              We curate the best ERLC resources already available on the web and organize them clearly 
              and professionally. Unity Vault does not create tutorials. We are a resource vault, not a 
              tutorial creator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Community First Mindset
            </h2>
            <p className="text-foreground/70 leading-7">
              Unity Vault is built with the ERLC community in mind. We focus on curating trusted resources, 
              always giving proper credit to original creators, and helping communities grow through organization 
              and clarity.
            </p>
          </section>

          {/* Call to Action */}
          <section className="rounded-lg bg-card border border-border p-8 mt-12">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-foreground/70 mb-6">
              Explore the Resources Vault and start building your ERLC community with confidence.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Explore Resources
            </Link>
          </section>

          {/* Creator Credit */}
          <section className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-foreground/70 text-center">
              Unity Vault was founded January 26th, 2026 and is created and owned by{" "}
              <a
                href="https://discord.com/users/527166312095678475"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                b3amerr
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
