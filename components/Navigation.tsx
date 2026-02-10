"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/site-structure";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const mainLinks = [
    { ...NAV.listCreator },
    { ...NAV.support },
    { ...NAV.status },
    { ...NAV.partners },
    { ...NAV.about },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/UnityLogo.svg"
              alt=""
              width={32}
              height={32}
              className="shrink-0"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Unity Vault
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <div
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <Link
                href={NAV.resources.href}
                className="btn-ghost rounded-lg py-2"
              >
                {NAV.resources.label}
                <Icon
                  name="arrow-right"
                  className={`text-base transition-transform ${resourcesOpen ? "rotate-90" : ""}`}
                />
              </Link>
              {resourcesOpen && (
                <div className="absolute left-0 top-full pt-1 animate-in-fade">
                  <div className="min-w-[260px] rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur-xl py-2">
                    {NAV.resources.groups.map((g) => (
                      <Link
                        key={g.href}
                        href={g.href}
                        className="block px-4 py-3 text-sm text-foreground/90 hover:bg-white/5 hover:text-foreground transition-colors"
                      >
                        <span className="font-medium">{g.label}</span>
                        <span className="mt-0.5 block text-xs text-foreground/60">
                          {g.description}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={NAV.resources.href}
                      className="mx-2 mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary/10 py-2.5 text-sm font-medium text-primary hover:bg-primary/20"
                    >
                      View all
                      <Icon name="arrow-right" className="text-sm" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="btn-ghost rounded-lg py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={NAV.resources.href}
              className="ml-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Explore Resources
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <Icon name="cross" className="text-xl" />
            ) : (
              <Icon name="menu-burger" className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/98 backdrop-blur-xl animate-in-fade">
          <div className="page-container space-y-1 py-4">
            <div className="rounded-lg border border-border/50 bg-card/50 p-2">
              <p className="px-3 py-1.5 text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                Resources
              </p>
              {NAV.resources.groups.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {g.label}
                </Link>
              ))}
              <Link
                href={NAV.resources.href}
                className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium text-primary"
                onClick={() => setMobileOpen(false)}
              >
                View all resources
              </Link>
            </div>
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={NAV.resources.href}
              className="mt-2 block rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-center text-base font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Explore Resources
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
