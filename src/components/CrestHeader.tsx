"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/data/site.json";
import { NAV } from "@/lib/nav";
import Wordmark from "@/components/Wordmark";

/**
 * Fixture-board header: crest and wordmark locked left, sections right,
 * gold rule underneath. Deliberately static — no shrink-on-scroll. The
 * board layout wants a stable masthead, the way a results page does.
 */
export default function CrestHeader() {
  const pathname = usePathname();

  return (
    <header
      className="crest-header sticky top-0 w-full"
      style={{
        zIndex: "var(--z-header)",
        background: "rgba(5, 18, 42, 0.86)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "2px solid var(--rule-gold)",
      }}
    >
      <div className="shell flex items-center gap-3 py-2.5">
        <Link
          href="/"
          aria-label={`${site.teamName} — home`}
          className="flex cursor-pointer items-center gap-3"
        >
          <Image
            src={site.assets.crestMark}
            alt=""
            width={128}
            height={128}
            priority
            className="h-[48px] w-[48px] sm:h-[58px] sm:w-[58px]"
          />
          {/* Same slanted wordmark + GUS as the hero, just small */}
          <span className="hidden sm:block">
            <Wordmark fontSize="clamp(1rem, 2.4vw, 1.4rem)" />
          </span>
        </Link>

        <span className="hidden flex-1 sm:block" />

        {/*
          Horizontally scrollable on narrow phones so five items never break
          the layout or force a wrap. On wider screens it just sits inline.
        */}
        <nav
          aria-label="Main"
          className="flex min-w-0 flex-1 justify-end overflow-x-auto sm:flex-none"
          style={{ scrollbarWidth: "none" }}
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="nav-link flex flex-none cursor-pointer items-center justify-center whitespace-nowrap px-2.5 transition-colors duration-200 sm:px-3.5"
                style={{
                  minHeight: 44,
                  color: active ? "var(--gs-gold)" : "var(--text-primary)",
                  borderBottom: `2px solid ${active ? "var(--gs-gold)" : "transparent"}`,
                }}
              >
                <span className="nav-link-text">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
