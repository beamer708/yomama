import Link from "next/link";
import Icon from "@/components/Icon";

export default function ComingSoonBanner() {
  return (
    <div className="bg-card/50 border-b border-border py-2.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="text-xs font-medium text-foreground/70">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              Coming Soon
              <span className="text-foreground/50">•</span>
              <Link
                href="https://discord.gg/rJECs3rpDh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Icon name="discord" className="text-xs" />
                Stay updated through Discord
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
