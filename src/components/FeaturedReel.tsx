"use client";

import { useRef, useState } from "react";
import site from "@/data/site.json";

/**
 * The full highlight reel, played WITH sound on tap. Loads only its poster
 * until the user chooses to play (preload="none"), so it costs nothing on
 * first paint. Distinct from VideoHero, which is the muted looping version.
 */
export default function FeaturedReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play();
    setPlaying(true);
  };

  return (
    <section className="rise py-8">
      <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
        Highlight reel
      </h2>

      <div
        className="relative mt-4 w-full overflow-hidden"
        style={{ aspectRatio: "16 / 9", background: "#05122a" }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          poster={site.assets.heroPoster}
          controls={playing}
          playsInline
          preload="none"
          onEnded={() => setPlaying(false)}
        >
          <source src={site.assets.heroVideo} type="video/mp4" />
        </video>

        {!playing && (
          <button
            type="button"
            onClick={start}
            aria-label="Play the highlight reel with sound"
            className="absolute inset-0 flex cursor-pointer items-center justify-center transition-colors duration-200"
            style={{ background: "rgba(5,18,42,0.45)" }}
          >
            <span
              className="flex items-center justify-center transition-transform duration-200"
              style={{
                width: 72,
                height: 72,
                border: "2px solid var(--gs-gold)",
                background: "rgba(5,18,42,0.55)",
              }}
            >
              {/* SVG play triangle — never an emoji */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--gs-white)" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
