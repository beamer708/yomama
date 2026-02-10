import Link from "next/link";
import Icon from "@/components/Icon";

export default function CommunityGuidesPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-2xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10">
            <Icon name="file" className="text-3xl text-primary" />
          </div>
          <h1 className="section-heading">Community guides</h1>
          <p className="section-subheading mt-3 mx-auto">
            High-level guidance for ERLC communities. Frameworks and perspectives to help you think through common challenges and opportunities.
          </p>
        </div>

        <div className="gradient-border rounded-2xl p-10 sm:p-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-foreground/40">
            <Icon name="clock" className="text-4xl" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Guides coming soon
          </h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            Community guides are in the works. In the meantime, explore the Resources Vault for curated content to help you build your community.
          </p>
          <Link href="/resources" className="btn-primary">
            <Icon name="book" className="text-base" />
            Explore resources vault
          </Link>
        </div>
      </div>
    </div>
  );
}
