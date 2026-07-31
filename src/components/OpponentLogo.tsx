import Image from "next/image";

/**
 * Opponent / conference logo.
 *
 * Bare mark on the navy background — no chip, no backdrop, no box. A frosted
 * panel was tried to lift the dark marks (The Citadel, Wake Forest, Kennesaw
 * State) and rejected: it reads as a card and breaks the hairline system. If
 * those need lifting later, do it in the source PNG, not with a container.
 * The logo is contained, never cropped/stretched.
 */
export default function OpponentLogo({
  src,
  name,
  size = 56,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  if (!src) return null;
  // Landscape box: several marks are much wider than tall (Jacksonville, The
  // Citadel, Wake Forest). In a square box those scale to fit the WIDTH and end
  // up tiny. Extra width lets them fill the height like the square marks do,
  // while the fixed box keeps the opponent-name column aligned down the page.
  // No background fill — bare logo, per the hairline system.
  return (
    <span
      className="inline-flex flex-none items-center justify-center"
      style={{ width: Math.round(size * 1.5), height: size }}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={Math.round(size * 1.5)}
        height={size}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </span>
  );
}
