import Link from "next/link";
import UnityLogo from "@/components/UnityLogo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <UnityLogo
          size="md"
          className="mx-auto mb-6 block h-10 w-10 shrink-0 opacity-[0.12]"
          aria-hidden
        />
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
