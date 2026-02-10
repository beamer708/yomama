import Link from "next/link";
import Icon from "@/components/Icon";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="book" className="text-lg text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Unity Vault</h3>
            </div>
            <p className="text-sm text-foreground/70 mb-4">
              A curated vault of knowledge for building successful ERLC communities.
            </p>
            <p className="text-xs text-foreground/60">
              Unity Vault curates and organizes resources. All credit belongs to original creators.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="book" className="text-base text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
                  <Icon name="book" className="text-sm" />
                  Resources Vault
                </Link>
              </li>
              <li>
                <Link href="/community-guides" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
                  <Icon name="file" className="text-sm" />
                  Community Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="info" className="text-base text-primary" />
              <h4 className="text-sm font-semibold text-foreground">About</h4>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
                  <Icon name="info" className="text-sm" />
                  About Unity Vault
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://discord.gg/rJECs3rpDh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the Unity Vault Discord"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-primary hover:text-white hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 hover:scale-105"
            >
              <Icon name="discord" className="text-xl" />
            </a>
            <p className="text-xs text-foreground/60 text-center">
              <a
                href="https://unityvaultstatus.betteruptime.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Website status
              </a>
              {" · "}
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
