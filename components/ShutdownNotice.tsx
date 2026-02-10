import Image from "next/image";

export default function ShutdownNotice() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <Image
          src="/UnityLogo.svg"
          alt="Unity Vault"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Website Temporarily Unavailable
        </h1>
        <p className="text-[#a3a3a3] leading-relaxed">
          Unity Vault is currently shut down while internal maintenance and improvements are in progress.
          The website will remain unavailable until further notice.
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
      </div>
    </div>
  );
}
