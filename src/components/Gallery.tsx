import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  caption?: string;
  w: number;
  h: number;
};

/**
 * Masonry-ish columns via CSS columns, so portrait and landscape shots pack
 * without cropping. Each photo keeps its real aspect ratio. Framing (thin
 * navy inset + gold hairline on hover) is what makes a full-colour photo set
 * feel "on theme" — the photos themselves are never recoloured.
 */
export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <div
      style={{
        columnGap: "var(--gap-panel)",
        columnWidth: "clamp(14rem, 30vw, 20rem)",
      }}
    >
      {photos.map((p) => (
        <figure
          key={p.src}
          className="group mb-[var(--gap-panel)] break-inside-avoid"
          style={{ breakInside: "avoid" }}
        >
          <div
            className="relative overflow-hidden"
            style={{ border: "1px solid var(--rule-faint)" }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ height: "auto", display: "block" }}
            />
            <span
              className="pointer-events-none absolute inset-0 transition-colors duration-300"
              style={{ boxShadow: "inset 0 0 0 0 var(--gs-gold)" }}
            />
          </div>
          {p.caption && (
            <figcaption
              className="display pt-1.5"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                color: "var(--gs-gold)",
              }}
            >
              {p.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
