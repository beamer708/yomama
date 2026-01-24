import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Legal and Disclaimer
          </h1>
          <p className="text-lg text-foreground/70">
            Important information about Unity Lab's relationship with Roblox, ERLC, and resource ownership
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Affiliation Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Affiliation Disclaimer
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab is an independent community resource platform. Unity Lab is not affiliated with, 
                endorsed by, or sponsored by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Roblox Corporation</li>
                <li>Emergency Response: Liberty County (ERLC) developers</li>
                <li>Any official ERLC or Roblox entities</li>
              </ul>
              <p>
                Unity Lab operates independently and is created by and for the ERLC community. Any references 
                to Roblox, ERLC, or related services are for informational purposes only.
              </p>
            </div>
          </section>

          {/* Resource Ownership */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Resource Ownership and Credit
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab curates and organizes resources from across the web. All external resources 
                displayed on Unity Lab belong to their original creators. Unity Lab does not claim 
                ownership of any curated resources.
              </p>
              <p>
                Every resource in the Resources Vault includes proper credit to its original creator. 
                Unity Lab's role is limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Curating and organizing resources</li>
                <li>Providing descriptions and categorization</li>
                <li>Linking to original resources</li>
                <li>Crediting original creators</li>
              </ul>
              <p>
                If you are a resource creator and believe your content is being used without proper 
                credit, please contact us immediately through the Contact page.
              </p>
            </div>
          </section>

          {/* Educational Purpose */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Educational and Informational Purpose
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab is provided for educational and informational purposes only. The resources, 
                guides, and frameworks available on Unity Lab are intended to help ERLC community 
                owners learn and grow their communities.
              </p>
              <p>
                Unity Lab does not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Results from using any resources or guidance</li>
                <li>Accuracy of all curated content</li>
                <li>Availability of external resources</li>
                <li>Success in building or growing an ERLC community</li>
              </ul>
              <p>
                Users are responsible for evaluating resources and applying them appropriately to their 
                specific situations.
              </p>
            </div>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              External Links
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab contains links to external websites and resources. Unity Lab is not responsible 
                for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The content of external websites</li>
                <li>The availability of external resources</li>
                <li>The accuracy of information on external sites</li>
                <li>The privacy practices of external websites</li>
                <li>Any damages resulting from use of external resources</li>
              </ul>
              <p>
                Users access external resources at their own risk. Unity Lab does not endorse or 
                guarantee any external content.
              </p>
            </div>
          </section>

          {/* Unity Lab Original Content */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Unity Lab Original Content
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab creates original content including frameworks, checklists, explanations, and 
                guidance. This original content is provided under the following terms:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Unity Lab original content may be used freely by the ERLC community</li>
                <li>Attribution to Unity Lab is appreciated but not required</li>
                <li>Unity Lab original content may not be sold or used for commercial purposes without permission</li>
                <li>Modifications to Unity Lab original content are allowed</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Unity Lab is provided "as is" without warranties of any kind. Unity Lab and its creators 
                are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any damages resulting from use of Unity Lab</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
            </div>
          </section>

          {/* Contact for Legal Matters */}
          <section className="rounded-lg bg-card border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Questions or Concerns
            </h2>
            <p className="text-foreground/70 mb-4">
              If you have questions about these terms, concerns about resource usage, or need to report 
              an issue, please contact us through the{" "}
              <Link href="/contact" className="text-primary hover:text-primary-hover transition-colors">
                Contact page
              </Link>
              .
            </p>
            <p className="text-sm text-foreground/60">
              Last updated: January 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
