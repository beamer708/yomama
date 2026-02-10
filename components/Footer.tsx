import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

const resourceGroups = [
  {
    title: "Graphic Design & Branding",
    links: [
      { href: "/resources?category=Graphic%20Design%20and%20Branding", label: "Branding & Identity" },
      { href: "/resources?category=Graphic%20Design%20Tools", label: "Tools & Utilities" },
      { href: "/resources?category=Fonts%20and%20Typography", label: "Fonts & Typography" },
      { href: "/resources?category=Design%20Inspiration", label: "Design Inspiration" },
    ],
  },
  {
    title: "Server & Community",
    links: [
      { href: "/resources?category=Discord%20Server%20Visuals", label: "Discord Visuals" },
      { href: "/resources?category=Discord%20Utilities", label: "Discord Utilities" },
      { href: "/resources?category=Automation%20and%20Systems", label: "Automation" },
      { href: "/resource-matcher", label: "Resource Matcher" },
    ],
  },
  {
    title: "Community & Support",
    links: [
      { href: "/community-guides", label: "Community Guides" },
      { href: "/about", label: "About" },
      { href: "/staff-application", label: "Staff Application" },
      { href: "https://discord.gg/rJECs3rpDh", label: "Discord", external: true },
      { href: "https://unityvaultstatus.betteruptime.com", label: "Status", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-card/30">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(59,130,246,0.03)_50%,transparent_100%)] pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/UnityLogo.svg"
                alt="Unity Vault"
                width={28}
                height={28}
              />
              <span className="text-lg font-semibold text-foreground">Unity Vault</span>
            </Link>
            <p className="text-sm text-foreground/70 mb-4 max-w-xs">
              The definitive ERLC resource platform. Curated knowledge for building successful communities.
            </p>
            <p className="text-xs text-foreground/50">
              We curate and organize. All credit belongs to original creators.
            </p>
          </div>

          {resourceGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-border/50">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/rJECs3rpDh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join Unity Vault Discord"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary transition-all hover:bg-primary/20 hover:scale-105"
              >
                <Icon name="discord" className="text-xl" />
              </a>
            </div>
            <p className="text-xs text-foreground/60 text-center sm:text-left">
              Unity Vault is not affiliated with Roblox or ERLC. All external resources belong to their creators. Created by{" "}
              <a
                href="https://discord.com/users/527166312095678475"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary-hover transition-colors"
              >
                b3amerr
              </a>
              . Icons by{" "}
              <a href="https://www.flaticon.com/uicons" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 transition-colors">Flaticon</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
