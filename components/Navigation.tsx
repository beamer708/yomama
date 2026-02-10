"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/Icon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/community-guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <Image
              src="/UnityLogo.svg"
              alt="Unity Vault"
              width={32}
              height={32}
              className="shrink-0"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Unity Vault
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="btn-ghost rounded-lg py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resources"
              className="ml-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              Explore Resources
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <Icon name="cross" className="text-xl" />
            ) : (
              <Icon name="menu-burger" className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-in-fade">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground/90 hover:bg-white/5 hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resources"
              className="mt-2 block rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-center text-base font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Explore Resources
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
