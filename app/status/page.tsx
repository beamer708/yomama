import Link from "next/link";
import Icon from "@/components/Icon";
import { STATUS_URL } from "@/lib/site-structure";

export default function StatusPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-12">
          <h1 className="section-heading">Status</h1>
          <p className="section-subheading mt-3">
            Service status and maintenance.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="settings" className="text-2xl" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Live status</h2>
                <p className="mt-1 text-sm text-foreground/70">
                  Our status page shows real-time uptime and incident history for Unity Vault services.
                </p>
                <a
                  href={STATUS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Open status page
                  <Icon name="up-right-from-square" className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border/60 bg-card/30 p-6 sm:p-8">
          <h3 className="font-semibold text-foreground">Updates</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Major product updates and announcements are shared in our Discord and on the homepage. For technical status and downtime, use the status page above.
          </p>
          <Link
            href="https://discord.gg/3qpVpCBwj"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            <Icon name="discord" className="text-lg" />
            Join Discord for updates
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/support" className="btn-ghost">
            Back to Support
            <Icon name="arrow-right" className="text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
}
