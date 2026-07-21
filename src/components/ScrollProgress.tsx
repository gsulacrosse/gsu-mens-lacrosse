"use client";

import { useEffect, useRef } from "react";

/**
 * A lacrosse ball that rides a thin gold rail down the right edge of the page,
 * marking scroll position. Scroll-linked (not autonomous motion), so it's fine
 * for reduced-motion users. Purely decorative — hidden from assistive tech.
 */
export default function ScrollProgress() {
  const ballRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (ballRef.current) ballRef.current.style.top = `${pct * 100}%`;
      if (fillRef.current) fillRef.current.style.height = `${pct * 100}%`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-fill" ref={fillRef} />
      <div className="scroll-ball" ref={ballRef} />
    </div>
  );
}
