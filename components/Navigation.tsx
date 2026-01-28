"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import UnityLogo from "@/components/UnityLogo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: "home" as const },
    { href: "/resources", label: "Resources Vault", icon: "book" as const },
    { href: "/community-guides", label: "Community Guides", icon: "file" as const },
    { href: "/about", label: "About", icon: "info" as const },
    { href: "/legal", label: "Legal", icon: "document" as const },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Unity Vault – Home">
            <UnityLogo size="md" className="h-8 w-8 shrink-0" />
            <span className="text-xl font-semibold text-foreground">Unity Vault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <Icon name="cross" className="text-2xl" />
            ) : (
              <Icon name="menu-burger" className="text-2xl" />
            )}
          </button>
        </div>
      </div>

          {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-card-hover rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
