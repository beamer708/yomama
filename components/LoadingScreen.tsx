"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import uLogo from "@/Media/ULogo.svg";

export default function LoadingScreen() {
  const [logoVisible, setLogoVisible] = useState(false);
  const [screenOut, setScreenOut] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const t = setTimeout(() => setMounted(false), 100);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setLogoVisible(true), 50);
    const t2 = setTimeout(() => setLogoVisible(false), 1000);
    const t3 = setTimeout(() => setScreenOut(true), 1300);
    const t4 = setTimeout(() => setMounted(false), 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`loading-screen${screenOut ? " loading-screen--out" : ""}`}
      aria-hidden="true"
    >
      <div className={`loading-logo${logoVisible ? " loading-logo--visible" : ""}`}>
        <Image src={uLogo} alt="" width={64} height={64} priority />
      </div>
    </div>
  );
}
