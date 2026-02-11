"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/Icon";
import { NAV } from "@/lib/site-structure";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isStaffApplicationOpen =
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "true" ||
    process.env.NEXT_PUBLIC_STAFF_APPLICATION_OPEN === "1";

  const mainLinks = [
    { ...NAV.support },
    { ...NAV.status },
    ...(isStaffApplicationOpen ? [{ ...NAV.staffApplication }] : []),
    { ...NAV.about },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/35 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/25">
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
            <Link
              href={NAV.resources.href}
              className="btn-ghost rounded-lg py-2"
            >
              {NAV.resources.label}
            </Link>
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
        <div className="lg:hidden bg-background/55 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/45 animate-in-fade">
          <div className="page-container space-y-1 py-4">
            <Link
              href={NAV.resources.href}
              className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {NAV.resources.label}
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
