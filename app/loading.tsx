import UnityLogo from "@/components/UnityLogo";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <UnityLogo
          size="lg"
          className="mx-auto mb-4 block h-12 w-12 shrink-0 animate-pulse opacity-20"
          aria-hidden
        />
        <p className="text-foreground/70">Loading...</p>
      </div>
    </div>
  );
}
