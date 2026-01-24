import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            About Unity Lab
          </h1>
          <p className="text-lg text-foreground/70">
            Understanding why Unity Lab exists and how it serves the ERLC community
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Why Unity Lab Was Created */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Why Unity Lab Was Created
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab was created to solve a real problem in the ERLC community: the intimidation 
                factor around building successful communities. Many server owners believe that large, 
                successful servers have secret knowledge or special advantages that they cannot access.
              </p>
              <p>
                This belief creates a barrier to growth. Owners overthink their approach, delay launching, 
                or give up before they start. Unity Lab exists to remove that barrier by showing that 
                success comes from learning public resources, not from secret knowledge.
              </p>
            </div>
          </section>

          {/* The Problem It Solves */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The Problem It Solves
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                The ERLC community has incredible resources scattered across the web. Videos, guides, 
                tools, and frameworks exist, but they are hard to find, poorly organized, or buried 
                in outdated content. New server owners spend countless hours searching for information 
                that experienced owners already know where to find.
              </p>
              <p>
                Unity Lab solves this by curating the best resources, organizing them clearly, and 
                making them accessible to everyone. We do the research so you can focus on building 
                your community.
              </p>
            </div>
          </section>

          {/* Community First Philosophy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Community First Philosophy
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab is built on a community first philosophy. This means:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Proper Credit:</strong> Every resource is properly 
                  credited to its original creator. We never claim ownership of curated content.
                </li>
                <li>
                  <strong className="text-foreground">No Hype:</strong> We provide information, not 
                  sales pressure. Our language is supportive and motivating without being pushy.
                </li>
                <li>
                  <strong className="text-foreground">Accessibility:</strong> Unity Lab is free and 
                  accessible to everyone. Growth should not be gated behind paywalls or exclusive groups.
                </li>
                <li>
                  <strong className="text-foreground">Transparency:</strong> We are clear about what 
                  Unity Lab is and is not. We curate resources, we do not create tutorials.
                </li>
              </ul>
            </div>
          </section>

          {/* What Unity Lab Is Not */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              What Unity Lab Is Not
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                To be clear about Unity Lab's purpose, it is important to understand what we are not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Not a Tutorial Creator:</strong> Unity Lab does 
                  not create step by step tutorials. We curate and organize existing resources.
                </li>
                <li>
                  <strong className="text-foreground">Not Affiliated with Roblox or ERLC:</strong> 
                  Unity Lab is an independent community resource. We are not affiliated with Roblox or 
                  the ERLC developers.
                </li>
                <li>
                  <strong className="text-foreground">Not a Paid Service:</strong> Unity Lab is free 
                  and always will be. We believe knowledge should be accessible.
                </li>
                <li>
                  <strong className="text-foreground">Not a Replacement for Learning:</strong> Unity Lab 
                  organizes resources, but you still need to learn and apply them. We provide the tools, 
                  you do the work.
                </li>
              </ul>
            </div>
          </section>

          {/* How to Use Unity Lab */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              How to Use Unity Lab
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab is designed to be straightforward:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Explore Resources:</strong> Browse the Resources 
                  Vault to find curated content organized by category.
                </li>
                <li>
                  <strong className="text-foreground">Use Unity Lab Resources:</strong> Review frameworks, 
                  checklists, and guidance created by Unity Lab to help you apply what you learn.
                </li>
                <li>
                  <strong className="text-foreground">Read Community Guides:</strong> Get high level 
                  guidance on common challenges and opportunities.
                </li>
                <li>
                  <strong className="text-foreground">Contribute:</strong> Submit resources you find valuable 
                  to help grow the vault for everyone.
                </li>
              </ol>
            </div>
          </section>

          {/* Call to Action */}
          <section className="rounded-lg bg-card border border-border p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-foreground/70 mb-6">
              Explore the Resources Vault and start building your ERLC community with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/resources"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
              >
                Explore Resources
              </Link>
              <Link
                href="/community-guides"
                className="rounded-md border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-card-hover transition-colors"
              >
                Read Community Guides
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
