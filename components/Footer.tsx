import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">Unity Lab</h3>
            <p className="text-sm text-foreground/70 mb-4">
              A curated vault of knowledge for building successful ERLC communities.
            </p>
            <p className="text-xs text-foreground/60">
              Unity Lab curates and organizes resources. All credit belongs to original creators.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Resources Vault
                </Link>
              </li>
              <li>
                <Link href="/unity-lab-resources" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Unity Lab Resources
                </Link>
              </li>
              <li>
                <Link href="/community-guides" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Community Guides
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Submit a Resource
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  About Unity Lab
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Legal & Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-foreground/60 text-center">
            Unity Lab is not affiliated with Roblox or ERLC developers. All external resources belong to their original creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
