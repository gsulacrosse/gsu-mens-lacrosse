"use client";

/* eslint-disable react-hooks/set-state-in-effect --
   The loader is synchronized to page-load progress (an external signal), which
   is the legitimate case for setting state from an effect, not a cascade. */

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

/**
 * Shows the lacrosse loading screen on every page EXCEPT the home page (which
 * runs the fuller intro in IntroSequence). It covers the initial load and each
 * client navigation, then lifts once the page has settled — so anything that
 * takes a moment to load (images, the Instagram grid) comes in behind the
 * branded screen instead of popping in.
 */
export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (pathname === "/") {
      setLoading(false); // home page owns its own loader + intro
      return;
    }

    setLoading(true);
    setLeaving(false);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLeaving(true);
      window.setTimeout(() => setLoading(false), 420); // let the fade play out
    };

    // Hold a short beat, then lift as soon as the page has finished loading
    // (images and all), with a hard cap so it can never get stuck.
    const min = window.setTimeout(() => {
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    }, 600);
    const cap = window.setTimeout(finish, 3000);

    return () => {
      window.clearTimeout(min);
      window.clearTimeout(cap);
      window.removeEventListener("load", finish);
    };
  }, [pathname]);

  if (pathname === "/" || !loading) return null;
  return <Loader leaving={leaving} />;
}
