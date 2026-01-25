import Link from "next/link";
import Icon from "@/components/Icon";
import UnityLogo from "@/components/UnityLogo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit" aria-label="Unity Vault – Home">
              <UnityLogo size="sm" className="h-5 w-5 shrink-0" />
              <span className="text-base font-semibold text-foreground">Unity Vault</span>
            </Link>
            <p className="text-sm text-foreground/60">
              A curated resource vault for the ERLC community.
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
                <Link href="/community-guides" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Community Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  About Unity Vault
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://discord.gg/rJECs3rpDh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the Unity Vault Discord"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary hover:text-white hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all"
            >
              <Icon name="discord" className="text-lg" />
            </a>
            <p className="text-xs text-foreground/60 text-center max-w-2xl">
              Unity Vault is not affiliated with Roblox or ERLC developers. All external resources belong to their original creators.
            </p>
            <p className="text-xs text-foreground/60 text-center">
              Created and owned by{" "}
              <a
                href="https://discord.com/users/527166312095678475"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                b3amerr
              </a>
            </p>
            <p className="text-xs text-foreground/50 text-center">
              Icons by <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/70 transition-colors">Flaticon Uicons</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
