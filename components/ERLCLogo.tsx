import Image from "next/image";
import erlcLogo from "@/Media/ERLCLogo.png";

interface ERLCLogoProps {
  /** Size in pixels (width and height). Default 32. */
  size?: number;
  className?: string;
  /** Prefer inline layout (e.g. in a sentence). */
  inline?: boolean;
  alt?: string;
}

/**
 * ERLC logo used wherever ERLC is mentioned.
 */
export default function ERLCLogo({
  size = 32,
  className = "",
  inline,
  alt = "ERLC",
}: ERLCLogoProps) {
  const style = inline ? { display: "inline-block", verticalAlign: "middle" } : undefined;
  return (
    <Image
      src={erlcLogo}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={style}
      unoptimized
    />
  );
}
