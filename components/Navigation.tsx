"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/site-structure";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const isStaffApplicationOpen =
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

  const mainLinks = [
    { ...NAV.support },
    { ...NAV.status },
    { ...NAV.about },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="page-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/UnityLogo.svg"
              alt=""
              width={34}
              height={34}
              className="shrink-0"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Unity Vault
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-1.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setResourcesOpen((open) => !open);
                  setCommunityOpen(false);
                }}
                className="btn-ghost rounded-lg py-2"
                aria-expanded={resourcesOpen}
                aria-haspopup="menu"
              >
                {NAV.resources.label}
                <Icon
                  name="arrow-right"
                  className={`text-xs transition-transform ${resourcesOpen ? "rotate-90" : ""}`}
                />
              </button>
              {resourcesOpen && (
                <div
                  className="absolute left-0 top-full mt-3 w-60 rounded-xl border border-primary/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-2 shadow-2xl backdrop-blur-2xl supports-[backdrop-filter]:bg-card/90"
                  role="menu"
                >
                  <Link
                    href="/resources"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                    role="menuitem"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Resource Vault
                  </Link>
                  <Link
                    href="/community-guides"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                    role="menuitem"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Helpful Guides
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCommunityOpen((open) => !open);
                  setResourcesOpen(false);
                }}
                className="btn-ghost rounded-lg py-2"
                aria-expanded={communityOpen}
                aria-haspopup="menu"
              >
                Community
                <Icon
                  name="arrow-right"
                  className={`text-xs transition-transform ${communityOpen ? "rotate-90" : ""}`}
                />
              </button>
              {communityOpen && (
                <div
                  className="absolute left-0 top-full mt-3 w-60 rounded-xl border border-primary/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-2 shadow-2xl backdrop-blur-2xl supports-[backdrop-filter]:bg-card/90"
                  role="menu"
                >
                  {isStaffApplicationOpen && (
                    <Link
                      href={NAV.staffApplication.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                      role="menuitem"
                      onClick={() => setCommunityOpen(false)}
                    >
                      Staff Application
                    </Link>
                  )}
                  <Link
                    href="/resource-list-creator"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                    role="menuitem"
                    onClick={() => setCommunityOpen(false)}
                  >
                    Create Resource List
                  </Link>
                  <Link
                    href="/resource-list-creator#open-shared"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                    role="menuitem"
                    onClick={() => setCommunityOpen(false)}
                  >
                    Open Shared List
                  </Link>
                  <Link
                    href="/resource-suggestion"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-white/15"
                    role="menuitem"
                    onClick={() => setCommunityOpen(false)}
                  >
                    Submit a Suggestion
                  </Link>
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
              className="ml-2 btn-primary px-5 py-2.5"
            >
              Explore Resources
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-border/60 text-foreground hover:bg-white/5 transition-colors"
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
        <div className="lg:hidden border-t border-border/60 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/85 animate-in-fade">
          <div className="page-container space-y-1 py-5">
            <Link
              href="/resources"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Resource Vault
            </Link>
            <Link
              href="/community-guides"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Helpful Guides
            </Link>
            {isStaffApplicationOpen && (
              <Link
                href={NAV.staffApplication.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Staff Application
              </Link>
            )}
            <Link
              href="/resource-list-creator"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Create Resource List
            </Link>
            <Link
              href="/resource-list-creator#open-shared"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Open Shared List
            </Link>
            <Link
              href="/resource-suggestion"
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              Submit a Suggestion
            </Link>
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
              className="mt-2 block rounded-xl border border-primary/50 bg-gradient-to-r from-primary to-accent px-4 py-3 text-center text-base font-semibold text-white shadow-lg"
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
