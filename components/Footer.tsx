import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { NAV, STATUS_URL } from "@/lib/site-structure";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-border/60 bg-background">
      <div className="page-container py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/UnityLogo.svg" alt="" width={24} height={24} />
            <span className="text-base font-semibold text-foreground">Unity Vault</span>
          </Link>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={NAV.resources.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Resources
            </Link>
            <Link href={NAV.support.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Support
            </Link>
            <Link href={NAV.about.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <a href={STATUS_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Status
            </a>
            <a
              href="https://discord.gg/3qpVpCBwj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              <Icon name="discord" className="text-base" />
              Discord
            </a>
          </div>
        </div>

        <p className="mt-6 border-t border-border/60 pt-5 text-xs text-muted-foreground">
          Unity Vault is not affiliated with Roblox or ERLC. All external resources belong to their creators. Created by{" "}
          <a
            href="https://discord.com/users/527166312095678475"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-primary"
          >
            b3amerr
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
