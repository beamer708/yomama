import Link from "next/link";

export default function ComingSoonBanner() {
  return (
    <div className="bg-primary/10 border-b border-primary/20 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="text-sm font-medium text-foreground/90">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Coming Soon
              <span className="text-foreground/70">•</span>
              <Link 
                href="https://discord.gg/rJECs3rpDh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline underline-offset-2"
              >
                Stay updated through Discord
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
