import Image from "next/image";
import site from "@/data/site.json";

/**
 * The lacrosse loading screen — crest + a ball bouncing along a gold rail.
 * Presentational only; callers control when it shows and when it leaves
 * (pass `leaving` to play the fade-out). Used by the home intro and the
 * per-route loader so every page loads behind the same branded screen.
 */
export default function Loader({ leaving = false }: { leaving?: boolean }) {
  return (
    <div
      className={`loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <Image
        className="loader-crest"
        src={site.assets.crestMark}
        alt=""
        width={128}
        height={128}
        priority
      />
      <div className="loader-rail" aria-hidden="true">
        <span className="loader-ball" />
      </div>
      <span className="loader-word">Georgia Southern Lacrosse</span>
    </div>
  );
}
