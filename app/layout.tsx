import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import MainLayout from "@/components/MainLayout";
import ShutdownNotice from "@/components/ShutdownNotice";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Unity Vault | ERLC Community Resource Vault",
  description: "A curated vault of knowledge for building successful ERLC communities. Resources, frameworks, and guidance organized for growth.",
  keywords: ["ERLC", "Roblox", "roleplay", "community", "resources", "guides"],
  icons: {
    icon: "/ULogo.svg",
    shortcut: "/ULogo.svg",
    apple: "/ULogo.svg",
  },
  openGraph: {
    title: "Unity Vault | ERLC Community Resource Vault",
    description: "A curated vault of knowledge for building successful ERLC communities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isShutdown = process.env.NEXT_PUBLIC_SITE_SHUTDOWN === "true" || process.env.NEXT_PUBLIC_SITE_SHUTDOWN === "1";
  const shouldTrackAnalytics = process.env.NODE_ENV === "production";

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" />
      </head>
      <body className="antialiased">
        {isShutdown ? <ShutdownNotice /> : <MainLayout>{children}</MainLayout>}
        {!isShutdown && shouldTrackAnalytics ? (
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
