"use client";

/**
 * Official Unity Vault logo. Use exclusively as the primary brand mark.
 * Do not recolor, distort, stretch, or add effects. Maintain aspect ratio.
 */
interface UnityLogoProps {
  className?: string;
  /** Optional: "sm" | "md" | "lg" for preset sizes. Overridden by className. */
  size?: "sm" | "md" | "lg";
  /** Use true when logo is decorative (e.g. loading, empty state). */
  "aria-hidden"?: boolean;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

export default function UnityLogo({
  className = "",
  size,
  "aria-hidden": ariaHidden = false,
}: UnityLogoProps) {
  const sizeClass = size ? sizeClasses[size] : "";
  const combined = `${sizeClass} ${className}`.trim();

  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={combined}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : "img"}
      aria-label={ariaHidden ? undefined : "Unity Vault"}
    >
      <path
        fill="#2463eb"
        d="M622.6,783.42c-72.03,20.48-147.91,19.59-223.53-3.59l403.1-261.42c2.59,130.06-56.32,229.97-179.57,265Z"
      />
      <path
        fill="#2463eb"
        d="M803.06,225.96l-.72,233.48c-.13,15.46-7.37,25.4-19.81,32.8l-201.2,131.77-217.11,139.43c-11.67-5.46-22.02-8.16-30.6-18.59,81.61-62.71,155.07-129.4,226.66-201.57,26.13-19.33,45.6-42.55,53.1-74.79l.2-242.39,189.49-.13Z"
      />
      <path
        fill="#2463eb"
        d="M505.23,564.98l-199.76,159.62c-58.55-46.51-85.29-118.82-78.66-191.69,26.29,28.24,103.21,67.24,136.09,61.86-45.06-21.63-83.67-51.73-121.29-85.18-14.18-16.5-21.69-36.48-20.56-58.86l.05-224.78,180.5.45.44,219.77c-2.19,29.73,11.99,53.5,33.87,72.13,19.98,19.14,44.15,30.52,69.31,46.68Z"
      />
    </svg>
  );
}
