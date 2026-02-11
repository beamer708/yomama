import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import ERLCLogo from "@/components/ERLCLogo";
import { NAV, SUPPORT_LINKS, STATUS_URL } from "@/lib/site-structure";

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-card/20">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        aria-hidden
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59, 130, 246, 0.06), transparent)",
        }}
      />
      <div className="relative page-container py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <Image
                src="/UnityLogo.svg"
                alt=""
                width={28}
                height={28}
              />
              <span className="text-lg font-semibold text-foreground">
                Unity Vault
              </span>
            </Link>
            <p className="text-sm text-foreground/70 max-w-xs mb-1 flex items-center gap-1.5 flex-wrap">
              The definitive <ERLCLogo size={18} inline alt="ERLC" /> resource platform. Curated knowledge for building successful communities.
            </p>
            <p className="text-xs text-foreground/50">
              We curate and organize. All credit belongs to original creators.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={NAV.resources.href}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  {NAV.resources.label}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Support &amp; Status
            </h4>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={STATUS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={NAV.about.href}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border/50">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <a
              href="https://discord.gg/rJECs3rpDh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Unity Vault Discord"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary transition-all hover:bg-primary/20 hover:scale-105"
            >
              <Icon name="discord" className="text-xl" />
            </a>
            <p className="text-xs text-foreground/60 text-center sm:text-left">
              Unity Vault is not affiliated with Roblox or ERLC. All external resources belong to their creators. Created by{" "}
              <a
                href="https://discord.com/users/527166312095678475"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                b3amerr
              </a>
              . Icons by{" "}
              <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 transition-colors">Flaticon</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
