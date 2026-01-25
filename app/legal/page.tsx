import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Legal and Disclaimer
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No Affiliation
            </h2>
            <p className="text-foreground/70 leading-7">
              Unity Vault is not affiliated with Roblox Corporation, Roblox developers, or the developers 
              of Emergency Response: Liberty County (ERLC). Unity Vault is an independent resource curation 
              platform created by and for the ERLC community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              External Content Ownership
            </h2>
            <p className="text-foreground/70 leading-7 mb-4">
              All external resources featured on Unity Vault belong to their original creators. Unity Vault 
              does not claim ownership of any external content, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 ml-4">
              <li>YouTube videos and playlists</li>
              <li>Website content and tools</li>
              <li>Design resources and assets</li>
              <li>Guides and documentation</li>
              <li>Any other external resources linked from Unity Vault</li>
            </ul>
            <p className="text-foreground/70 leading-7 mt-4">
              Unity Vault curates and organizes these resources for educational purposes only. All credit 
              and ownership rights remain with the original creators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Educational and Informational Use Only
            </h2>
            <p className="text-foreground/70 leading-7">
              Unity Vault is provided for educational and informational purposes only. The resources curated 
              on this platform are intended to help ERLC community members learn and grow. Unity Vault does 
              not guarantee the accuracy, completeness, or usefulness of any external resource, and users are 
              responsible for verifying information and respecting the terms of use of external platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No Tutorial Creation
            </h2>
            <p className="text-foreground/70 leading-7">
              Unity Vault does not create tutorials. We curate, organize, and reference existing resources 
              from across the web. All tutorial content, guides, and educational materials linked from Unity 
              Vault are created by third parties and are subject to their respective terms of use and licensing.
            </p>
          </section>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
