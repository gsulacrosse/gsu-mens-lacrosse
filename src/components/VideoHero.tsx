"use client";

import Image from "next/image";
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
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  // Match GUS's height to the stacked wordmark so he's exactly as tall as the
  // two text lines, at every screen size.
  useEffect(() => {
    const fit = () => {
      const w = wordmarkRef.current;
      const m = mascotRef.current;
      if (w && m) m.style.height = `${w.getBoundingClientRect().height}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    // Re-fit once fonts are ready (wordmark height depends on the loaded font)
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

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
            "linear-gradient(180deg, rgba(5,18,42,0.30) 0%, rgba(5,18,42,0.40) 40%, rgba(5,18,42,0.97) 100%)",
        }}
      />

      <div className="shell relative flex h-full flex-col justify-end pb-8 sm:pb-12">
        {/* Gold accent bar — a small mark that anchors the title */}
        <span
          aria-hidden="true"
          className="mb-4 block"
          style={{ width: 68, height: 5, background: "var(--gs-gold)" }}
        />

        {/* Slanted athletic wordmark with GUS leaning on the end of it */}
        <div className="hero-lockup">
          <h1 className="hero-wordmark" ref={wordmarkRef} aria-label={site.teamName}>
            <span aria-hidden="true">Georgia&nbsp;Southern</span>
            <small aria-hidden="true">Men&rsquo;s&nbsp;Lacrosse</small>
          </h1>
          <Image
            ref={mascotRef}
            className="hero-mascot"
            src="/brand/mascot-gus.png"
            alt=""
            width={317}
            height={468}
            priority
          />
        </div>

        <div
          className="mt-5 flex flex-wrap gap-x-3 gap-y-1"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.16em",
            color: "#eef2f8",
            textShadow: "0 1px 12px rgba(5,18,42,0.9)",
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
