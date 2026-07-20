"use client";

import { useEffect, useRef } from "react";
import site from "@/data/site.json";

/**
 * Homepage hero with the highlight reel playing muted and looping behind the
 * team name. The poster (huddle photo) shows instantly and stays visible if
 * autoplay is blocked or the user prefers reduced motion — so the hero is
 * never blank and never forces motion on anyone.
 *
 * `muted` is set imperatively via ref because React can drop the muted
 * attribute on first render, and browsers refuse to autoplay unmuted video.
 */
export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave the poster showing, don't autoplay

    v.muted = true;
    v.play().catch(() => {
      /* autoplay blocked — poster stays, no error surfaced to the user */
    });
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(24rem, 74vh, 44rem)" }}
      aria-label={`${site.teamName} highlights`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={site.assets.heroPoster}
        loop
        playsInline
        muted
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={site.assets.heroVideo} type="video/mp4" />
      </video>

      {/* Legibility scrim — navy, bottom-weighted so the title reads clearly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,18,42,0.35) 0%, rgba(5,18,42,0.35) 45%, rgba(5,18,42,0.9) 100%)",
        }}
      />

      <div className="shell relative flex h-full flex-col justify-end pb-8 sm:pb-12">
        <h1
          className="display"
          style={{ fontSize: "var(--step-hero)", textShadow: "0 2px 40px rgba(5,18,42,0.75)" }}
        >
          Georgia Southern
          <br />
          <span style={{ color: "var(--gs-gold)" }}>Men&rsquo;s Lacrosse</span>
        </h1>
        <div
          className="mt-4 flex flex-wrap gap-x-3 gap-y-1"
          style={{
            fontSize: "0.74rem",
            letterSpacing: "0.16em",
            color: "#e6ebf3",
          }}
        >
          {["Est. " + site.established, site.league, site.conference, site.homeVenue].map(
            (t, i) => (
              <span key={t} className="display flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" style={{ color: "var(--gs-gold)" }}>/</span>}
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
