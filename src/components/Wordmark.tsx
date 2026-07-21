import Image from "next/image";
import site from "@/data/site.json";

/**
 * The slanted athletic wordmark with GUS leaning on the end of it. Everything
 * scales from `fontSize`, so the same lockup is used big in the hero and small
 * in the header — one source of truth. GUS's height is set in CSS (em-based,
 * see `.wm-mascot`) so he is his final size from the very first frame — no
 * JS measuring, no growing on load. `heading` renders the word as an <h1>
 * (hero, for SEO); otherwise a <span>. `animate` tags the intro drop hooks.
 */
export default function Wordmark({
  fontSize,
  animate = false,
  heading = false,
}: {
  fontSize: string;
  animate?: boolean;
  heading?: boolean;
}) {
  const wordInner = (
    <>
      <span aria-hidden="true">Georgia&nbsp;Southern</span>
      <small aria-hidden="true">Men&rsquo;s&nbsp;Lacrosse</small>
    </>
  );

  return (
    <span className="wm-lockup" style={{ fontSize }}>
      {heading ? (
        <h1 className={`wm-word ${animate ? "hero-word-anim" : ""}`} aria-label={site.teamName}>
          {wordInner}
        </h1>
      ) : (
        <span
          className={`wm-word ${animate ? "hero-word-anim" : ""}`}
          aria-label={site.teamName}
          role="img"
        >
          {wordInner}
        </span>
      )}
      <Image
        className={`wm-mascot ${animate ? "hero-mascot-anim" : ""}`}
        src="/brand/mascot-gus.png"
        alt=""
        width={317}
        height={468}
        priority
      />
    </span>
  );
}
