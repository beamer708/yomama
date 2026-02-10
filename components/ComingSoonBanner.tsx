import Link from "next/link";
import Icon from "@/components/Icon";

export default function ComingSoonBanner() {
  return (
    <div className="border-b border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/90">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Coming soon
          </span>
          <span className="text-foreground/50 hidden sm:inline">·</span>
          <Link
            href="https://discord.gg/rJECs3rpDh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary transition-colors underline underline-offset-2"
          >
            <Icon name="discord" className="text-base" />
            Stay updated on Discord
          </Link>
        </div>
      </div>
    </div>
  );
}
