"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import site from "@/data/site.json";

/**
 * The slanted athletic wordmark with GUS leaning on the end of it. Everything
 * scales from `fontSize`, so the same lockup is used big in the hero and small
 * in the header — one source of truth. GUS's height is matched in JS to the
 * stacked wordmark. `heading` renders the word as an <h1> (hero, for SEO);
 * otherwise a <span> (header). `animate` plays the entrance.
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
  const wordRef = useRef<HTMLElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fit = () => {
      const w = wordRef.current;
      const m = mascotRef.current;
      if (w && m) m.style.height = `${w.getBoundingClientRect().height}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, [fontSize]);

  const wordInner = (
    <>
      <span aria-hidden="true">Georgia&nbsp;Southern</span>
      <small aria-hidden="true">Men&rsquo;s&nbsp;Lacrosse</small>
    </>
  );

  return (
    <span className="wm-lockup" style={{ fontSize }}>
      {heading ? (
        <h1
          className={`wm-word ${animate ? "hero-word-anim" : ""}`}
          ref={wordRef as React.RefObject<HTMLHeadingElement>}
          aria-label={site.teamName}
        >
          {wordInner}
        </h1>
      ) : (
        <span
          className={`wm-word ${animate ? "hero-word-anim" : ""}`}
          ref={wordRef as React.RefObject<HTMLSpanElement>}
          aria-label={site.teamName}
          role="img"
        >
          {wordInner}
        </span>
      )}
      <Image
        ref={mascotRef}
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
