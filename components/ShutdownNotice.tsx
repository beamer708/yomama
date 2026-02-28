import Image from "next/image";
import Icon from "@/components/Icon";
import uLogo from "@/Media/ULogo.svg";

export default function ShutdownNotice() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-4 text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center py-14">
        <div className="relative w-full rounded-3xl border border-border bg-card p-8 sm:p-10">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Scheduled maintenance
            </span>
            <Image
              src={uLogo}
              alt="Unity Vault"
              width={86}
              height={86}
              className="mx-auto mt-5 opacity-95"
              priority
            />
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Website Temporarily Unavailable
            </h1>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Unity Vault is temporarily offline while scheduled maintenance and platform improvements are completed.
              Access will be restored as soon as updates are finalized.
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-border/70 bg-background/55 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              For live maintenance progress and announcements, use the links below.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://discord.gg/3qpVpCBwj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              <Icon name="discord" className="text-base" />
              Join Discord
            </a>
            <a
              href="https://unityvaultstatus.betteruptime.com/maintenance"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              View status
              <Icon name="up-right-from-square" className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
