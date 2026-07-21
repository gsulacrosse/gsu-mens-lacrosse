"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

type Phase = "loading" | "armed" | "done";

/**
 * Home-page intro. Four beats:
 *
 *   1. LOADING  — a navy lacrosse loading screen covers everything while the
 *                 page and reel load, so nothing pops in awkwardly.
 *   2. ARMED    — the loader lifts, revealing the highlight reel filling the
 *                 ENTIRE screen. The page is scroll-locked, so the edit stays
 *                 put; the header and hero text are held hidden. A "Scroll"
 *                 nudge invites the one gesture.
 *   3. (fired)  — the first scroll drops the header (menu bar) down, then the
 *                 bar, wordmark, and GUS drop onto the edit (GUS bounces),
 *                 driven purely by the `.intro-fired` class + CSS. The edit
 *                 itself never moves.
 *   4. DONE     — the lock releases and the real site scrolls normally.
 *
 * Reduced motion skips all of it: no loader, no lock, the site is immediately
 * in its final resting state and fully scrollable.
 */
export default function IntroSequence() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [loaderLeaving, setLoaderLeaving] = useState(false);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Syncing to an external signal (the OS reduced-motion setting), which is
      // a legitimate effect-driven state set, not a render cascade.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }

    // Lock the page and hold the header + hero pieces hidden from frame one.
    // Clear any leftover `intro-fired` from a prior visit so re-entry re-arms.
    root.classList.remove("intro-fired");
    root.classList.add("intro-lock", "intro-armed");

    const timers: number[] = [];
    let revealed = false;
    let didFire = false;

    // The scroll gesture that fires the drop-in assembly.
    const fire = () => {
      if (didFire) return;
      didFire = true;
      setFired(true);
      teardownIntent();

      root.classList.remove("intro-armed");
      root.classList.add("intro-fired"); // header drops, then text + GUS drop

      // Release the scroll lock once the drops have settled (~1.7s of animation).
      timers.push(
        window.setTimeout(() => {
          root.classList.remove("intro-lock");
          setPhase("done");
        }, 1850),
      );
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) fire();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Spacebar", "End"].includes(e.key)) fire();
    };
    const onTouch = () => fire();
    const teardownIntent = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchmove", onTouch);
    };

    // Loading screen: hold a beat, then lift it to reveal the full-screen edit
    // and arm the scroll gesture.
    const revealEdit = () => {
      if (revealed) return;
      revealed = true;
      setLoaderLeaving(true);
      timers.push(
        window.setTimeout(() => {
          setPhase("armed");
          window.addEventListener("wheel", onWheel, { passive: true });
          window.addEventListener("keydown", onKey);
          window.addEventListener("touchmove", onTouch, { passive: true });
        }, 480),
      );
    };

    timers.push(window.setTimeout(revealEdit, 1100)); // minimum loader time
    timers.push(window.setTimeout(revealEdit, 3000)); // hard cap

    return () => {
      teardownIntent();
      timers.forEach((t) => window.clearTimeout(t));
      root.classList.remove("intro-lock", "intro-armed", "intro-fired");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {phase === "loading" && <Loader leaving={loaderLeaving} />}

      {phase === "armed" && !fired && <span className="intro-hint">Scroll</span>}
    </>
  );
}
