export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
        <p className="text-foreground/70">Loading...</p>
      </div>
    </div>
  );
}
