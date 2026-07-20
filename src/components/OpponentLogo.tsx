import Image from "next/image";

/**
 * Opponent / conference logo, transparent background (no chip).
 *
 * Note: dark logos (Wake Forest, The Citadel, Kennesaw State, North Florida,
 * SCAD, the navy schools) have low contrast on the navy background this way.
 * If they need lifting, add a subtle frosted backdrop here rather than going
 * back to a solid white box. The logo is contained, never cropped/stretched.
 */
export default function OpponentLogo({
  src,
  name,
  size = 44,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  if (!src) return null;
  return (
    <span
      className="inline-flex flex-none items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </span>
  );
}
