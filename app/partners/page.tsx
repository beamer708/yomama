import Link from "next/link";
import Icon from "@/components/Icon";

export default function PartnersPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-10 rounded-2xl border border-border bg-card p-7 text-center sm:p-9">
          <h1 className="section-heading">Partners</h1>
          <p className="section-subheading mt-3 mx-auto">
            Partnership requests are coming soon.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card-hover mb-6">
            <Icon name="users" className="text-3xl" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Coming soon
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            This page will include a form for requesting partnerships with Unity Vault.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/about" className="btn-ghost">
            About Unity Vault
            <Icon name="arrow-right" className="text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
}
