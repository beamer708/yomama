import Link from "next/link";
import Icon from "@/components/Icon";

export default function PartnersPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-12">
          <h1 className="section-heading">Partners &amp; Supported By</h1>
          <p className="section-subheading mt-3">
            Organizations and communities that support or partner with Unity Vault.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-8 sm:p-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Icon name="users" className="text-3xl" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Partner with Unity Vault
          </h2>
          <p className="mt-3 text-foreground/70 max-w-lg mx-auto">
            We’re open to partnerships with ERLC communities, tool providers, and creators who align with our mission: making quality resources accessible to everyone building ERLC servers.
          </p>
          <a
            href="https://discord.gg/3qpVpCBwj"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 btn-primary"
          >
            <Icon name="discord" className="text-lg" />
            Get in touch via Discord
          </a>
        </div>

        <div className="mt-12 rounded-xl border border-border/60 bg-card/30 p-6">
          <h3 className="font-semibold text-foreground">Supported by the community</h3>
          <p className="mt-2 text-sm text-foreground/70">
            Unity Vault is built for the ERLC community. Support comes from server owners, creators, and everyone who uses and shares the vault. If you’d like to be listed as a partner or supporter, reach out through Discord.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/about" className="btn-ghost">
            About Unity Vault
            <Icon name="arrow-right" className="text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
}
