export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-xl border-2 border-primary/30 border-t-primary" />
        <p className="mt-4 text-sm text-foreground/70">Loading...</p>
      </div>
    </div>
  );
}
