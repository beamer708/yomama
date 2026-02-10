import ComingSoonBanner from "@/components/ComingSoonBanner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ComingSoonBanner />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
