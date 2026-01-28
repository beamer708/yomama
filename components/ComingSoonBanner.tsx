import Link from "next/link";

export default function ComingSoonBanner() {
  return (
    <div className="bg-card/50 border-b border-border py-2.5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="text-xs font-medium text-foreground/70">
            <span className="inline-flex items-center gap-2">
              Released
              <span className="text-foreground/50">•</span>
              <Link
                href="https://discord.gg/rJECs3rpDh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Join our Discord
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
