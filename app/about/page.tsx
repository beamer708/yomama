import Link from "next/link";
import Icon from "@/components/Icon";
import ERLCLogo from "@/components/ERLCLogo";
import { NAV } from "@/lib/site-structure";

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-3xl">
        <div className="mb-12 rounded-3xl border border-border/70 bg-card/75 p-8 text-center sm:p-10">
          <div className="mx-auto mb-6 flex justify-center items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10">
              <Icon name="compass" className="text-3xl text-primary" />
            </div>
            <ERLCLogo size={48} />
          </div>
          <h1 className="section-heading">About Unity Vault</h1>
          <p className="section-subheading mt-3 mx-auto">
            Why we exist and what we do.
          </p>
        </div>

        <div className="space-y-8">
          <p className="text-lg leading-8 text-muted-foreground">
            Unity Vault exists to help ERLC communities stop overthinking growth. Everything successful servers learn comes from public resources. We organize those resources in one place so you can find what you need without spending hours searching.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            We curate the best ERLC resources already available on the web and present them clearly and professionally. Unity Vault does not create tutorials. We are a resource vault, not a tutorial creator. All credit stays with the original creators.
          </p>

          <div className="gradient-border gradient-card mt-12 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Ready to get started?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Explore the Resources page to get suggestions tailored to your goal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={NAV.resources.href} className="btn-primary">
                <Icon name="book" className="text-base" />
                Explore resources
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-border/50 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Created and owned by{" "}
              <a
                href="https://discord.com/users/527166312095678475"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                b3amerr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
