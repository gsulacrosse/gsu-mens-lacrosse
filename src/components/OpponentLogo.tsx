import Image from "next/image";

/**
 * Opponent / conference logo shown on a white chip.
 *
 * The chip matters: many opponent logos are dark (Wake Forest black, UGA red,
 * the navy schools) and would vanish on our navy background. A white tile —
 * the way every sports schedule renders opponent marks — keeps them all
 * visible and uniform. Hard corners to match the site; the logo is contained,
 * never cropped or stretched.
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
  const pad = Math.round(size * 0.14);
  return (
    <span
      className="inline-flex flex-none items-center justify-center"
      style={{
        width: size,
        height: size,
        background: "#ffffff",
        border: "1px solid var(--rule-faint)",
        padding: pad,
      }}
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
