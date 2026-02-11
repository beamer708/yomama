import Link from "next/link";
import Icon from "@/components/Icon";

export default function StaffApplicationPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="page-container max-w-2xl">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 sm:p-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500">
            <Icon name="settings" className="text-3xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Staff Application Unavailable
          </h1>
          <p className="mt-4 text-foreground/80 max-w-md mx-auto">
            The staff application is currently closed for maintenance. Please check back later or join our Discord for updates.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/support" className="btn-ghost">
              <Icon name="arrow-right" className="text-base" />
              Back to Support
            </Link>
            <a
              href="https://discord.gg/rJECs3rpDh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Icon name="discord" className="text-lg" />
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
