"use client";

import Link from "next/link";
import Icon from "@/components/Icon";

export default function ResourceListCreatorPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-7 text-center sm:p-9">
          <h1 className="section-heading">Resource Selection</h1>
          <p className="section-subheading mx-auto">
            Choose a preset goal to view relevant resources from the vault.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/85 p-7 text-center sm:p-9">
          <p className="text-muted-foreground">
            This page now uses the same preset-based selection experience as the Resources page.
          </p>
          <div className="mt-6">
            <Link href="/resources" className="btn-primary">
              Open preset goals
              <Icon name="arrow-right" className="text-base" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
