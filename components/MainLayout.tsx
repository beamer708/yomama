"use client";

import { usePathname } from "next/navigation";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMaintenanceRoute = pathname === "/maintenance" || pathname === "/maintenance-auth";

  if (isMaintenanceRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ComingSoonBanner />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
