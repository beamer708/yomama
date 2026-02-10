import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance in Progress | Unity Vault",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Maintenance in Progress
        </h1>
        <p className="text-[#a3a3a3] leading-relaxed">
          Unity Vault is currently undergoing maintenance.
          The website is temporarily unavailable while internal changes and improvements are made.
          Access will return once maintenance is complete.
        </p>
        <p className="text-sm">
          <a
            href="https://unityvaultstatus.betteruptime.com/maintenance/822811"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] font-medium transition-colors"
          >
            View status and updates
            <span aria-hidden>→</span>
          </a>
        </p>
        <p className="text-xs text-[#737373] pt-4">
          <a href="/maintenance-auth" className="text-[#525252] hover:text-[#a3a3a3] transition-colors">
            Staff access
          </a>
        </p>
      </div>
    </div>
  );
}
