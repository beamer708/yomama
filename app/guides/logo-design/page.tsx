import Link from "next/link";
import Icon from "@/components/Icon";
import { resources, getYouTubeThumbnail } from "@/lib/resources";

const SECTIONS = [
  {
    title: "Logo Design Fundamentals",
    description: "Core principles every logo designer should know.",
    ids: ["16", "17"],
  },
  {
    title: "Branding & Visual Identity",
    description: "Understand how your logo fits into a broader brand system.",
    ids: ["19", "21", "22"],
  },
  {
    title: "ERLC & Roleplay Server Logos",
    description: "Hands-on tutorials made specifically for ERLC and roleplay server logos.",
    ids: ["23", "24", "27"],
  },
];

function VideoCard({ id }: { id: string }) {
  const r = resources.find((res) => res.id === id);
  if (!r) return null;
  const thumbnail = r.thumbnailUrl || getYouTubeThumbnail(r.url);

  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card-hover"
    >
      {thumbnail && (
        <div className="shrink-0 w-28 sm:w-36 overflow-hidden rounded-lg bg-[#0d0d0d]">
          <img
            src={thumbnail}
            alt={r.title}
            className="h-full w-full object-cover aspect-video"
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {r.title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{r.channelName || r.creator}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
          Watch
          <Icon name="up-right-from-square" className="text-xs" />
        </span>
      </div>
    </a>
  );
}

export default function LogoDesignGuidePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        {/* Header */}
        <div className="mb-10 rounded-3xl border border-border/70 bg-card/75 p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="palette" className="text-2xl" />
          </div>
          <h1 className="section-heading">Guide: Logo Design</h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Resources to help you design a professional logo for your ERLC server — from design
            fundamentals to hands-on tutorials.
          </p>
        </div>

        {/* Quick steps */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/85 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="book" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">1. Learn the basics</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Understand logo principles, shapes, and composition.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/85 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="sparkles" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">2. Build your brand</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Learn how logos fit into a broader visual identity.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/85 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="video-camera" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">3. Make your logo</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Follow ERLC-specific tutorials to create your design.
            </p>
          </div>
        </div>

        {/* Video sections */}
        {SECTIONS.map((section) => (
          <div key={section.title} className="mb-6 rounded-2xl border border-border bg-card/85 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            <div className="mt-4 grid gap-3">
              {section.ids.map((id) => (
                <VideoCard key={id} id={id} />
              ))}
            </div>
          </div>
        ))}

        {/* Tip */}
        <div className="mb-8 rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-foreground/80">
          <p className="inline-flex items-center gap-2 font-medium text-foreground">
            <Icon name="info" className="text-sm text-primary" />
            Design tip
          </p>
          <p className="mt-1">
            Start simple — a strong logo works in black and white before adding color. Once your
            shape is solid, layer in your server&apos;s color palette.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <Link href="/community-guides" className="btn-ghost">
            <Icon name="arrow-right" className="text-base" />
            Back to guides
          </Link>
          <Link href="/resources" className="btn-primary">
            <Icon name="book" className="text-base" />
            Open Resource Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
