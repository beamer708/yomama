import Link from "next/link";
import Icon from "@/components/Icon";

export default function LegalPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <h1 className="section-heading mb-10">Legal and disclaimer</h1>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              No affiliation
            </h2>
            <p className="text-foreground/75 leading-relaxed">
              Unity Vault is not affiliated with Roblox Corporation, Roblox developers, or the developers of Emergency Response: Liberty County (ERLC). Unity Vault is an independent resource curation platform created by and for the ERLC community.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              External content ownership
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-4">
              All external resources featured on Unity Vault belong to their original creators. Unity Vault does not claim ownership of any external content, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-foreground/75 ml-2">
              <li>YouTube videos and playlists</li>
              <li>Website content and tools</li>
              <li>Design resources and assets</li>
              <li>Guides and documentation</li>
              <li>Any other external resources linked from Unity Vault</li>
            </ul>
            <p className="text-foreground/75 leading-relaxed mt-4">
              Unity Vault curates and organizes these resources for educational purposes only. All credit and ownership rights remain with the original creators.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Educational use only
            </h2>
            <p className="text-foreground/75 leading-relaxed">
              Unity Vault is provided for educational and informational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any external resource. Users are responsible for verifying information and respecting the terms of use of external platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              No tutorial creation
            </h2>
            <p className="text-foreground/75 leading-relaxed">
              Unity Vault does not create tutorials. We curate, organize, and reference existing resources from across the web. All tutorial content and educational materials linked from Unity Vault are created by third parties and subject to their terms of use and licensing.
            </p>
          </section>
        </div>

        <div className="mt-14 pt-8 border-t border-border/50">
          <Link href="/" className="btn-ghost">
            <Icon name="home" className="text-base" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
