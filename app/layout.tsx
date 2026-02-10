import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Unity Vault | ERLC Community Resource Vault",
  description: "A curated vault of knowledge for building successful ERLC communities. Resources, frameworks, and guidance organized for growth.",
  keywords: ["ERLC", "Roblox", "roleplay", "community", "resources", "guides"],
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
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
