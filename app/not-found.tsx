import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-card-hover">
          <Icon name="navigation" className="text-4xl text-primary" />
        </div>
        <h1 className="text-6xl font-bold tracking-tight text-foreground mb-2">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">Page not found</h2>
        <p className="text-foreground/70 mb-8 max-w-sm mx-auto">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <Icon name="home" className="text-base" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
