import Link from "next/link";
import Icon from "@/components/Icon";

const ICON_SITES = [
  {
    title: "Flaticon - Interface Icons",
    url: "https://www.flaticon.com/uicons/interface-icons",
    note: "Static icons that are ideal for clean Discord emoji sets.",
  },
  {
    title: "Flaticon - Static Interface Icons for Discord",
    url: "https://www.flaticon.com/uicons/interface-icons",
    note: "Discord-friendly static icon source from the Resources vault.",
  },
  {
    title: "Flaticon - Animated Icons for Discord",
    url: "https://www.flaticon.com/animated-icons",
    note: "Animated icon options for motion-based emoji ideas.",
  },
  {
    title: "Iconify - Open Source Icon Sets",
    url: "https://icon-sets.iconify.design",
    note: "Large open-source SVG icon library with many styles.",
  },
];

export default function EmojiGuidePage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="page-container max-w-4xl">
        <div className="mb-10 rounded-3xl border border-border bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon name="sparkles" className="text-2xl" />
          </div>
          <h1 className="section-heading">Guide: Create Discord Emojis</h1>
          <p className="mt-3 text-base text-foreground/80 sm:text-lg">
            Build sharp custom Discord emojis from icon sites in a few steps: choose icon, download SVG,
            recolor in an editor, set to 32x32, and upload.
          </p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="file" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">1. Pick an icon</h2>
            <p className="mt-1 text-xs text-foreground/70">Select a clean icon and download SVG format.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="palette" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">2. Style it</h2>
            <p className="mt-1 text-xs text-foreground/70">Recolor and fit canvas/artboard to 32x32.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon name="discord" className="text-base" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">3. Upload to Discord</h2>
            <p className="mt-1 text-xs text-foreground/70">Add emoji in server settings and test readability.</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Icon sites from Resources</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ICON_SITES.map((site) => (
              <a
                key={site.title}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-card-hover"
              >
                <p className="font-medium text-foreground inline-flex items-center gap-1.5">
                  {site.title}
                  <Icon name="up-right-from-square" className="text-xs" />
                </p>
                <p className="mt-1 text-xs text-foreground/70">{site.note}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Emoji workflow (detailed)</h2>
          <ol className="mt-4 space-y-4 text-sm text-foreground/80">
            <li>
              <span className="font-semibold text-foreground">1) Choose your icon style.</span> Pick icons with bold
              shapes so they remain visible at small sizes.
            </li>
            <li>
              <span className="font-semibold text-foreground">2) Download as SVG.</span> SVG keeps edges sharp and
              is easier to recolor than raster files.
            </li>
            <li>
              <span className="font-semibold text-foreground">3) Open in any design editor.</span> Use Figma, Photopea,
              Illustrator, or another editor to recolor for your server theme.
            </li>
            <li>
              <span className="font-semibold text-foreground">4) Resize to 32x32.</span> Set canvas/artboard to{" "}
              <span className="font-semibold text-foreground">32x32</span> for consistent Discord emoji sizing.
            </li>
            <li>
              <span className="font-semibold text-foreground">5) Export and upload.</span> Export your final emoji, then
              upload in Discord server settings.
            </li>
            <li>
              <span className="font-semibold text-foreground">6) Test in chat.</span> Check contrast in dark mode and
              light backgrounds. If it looks blurry or thin, increase line weight and re-export.
            </li>
          </ol>

          <div className="mt-6 rounded-xl border border-primary/25 bg-primary/10 p-4 text-sm text-foreground/80">
            <p className="inline-flex items-center gap-2 font-medium text-foreground">
              <Icon name="info" className="text-sm text-primary" />
              Emoji quality tip
            </p>
            <p className="mt-1">
              Avoid overly detailed icons. Simple high-contrast shapes are much easier to read at Discord emoji size.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
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
    </div>
  );
}

