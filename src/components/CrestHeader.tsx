"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@/data/site.json";
import { NAV } from "@/lib/nav";

/**
 * Fixture-board header: crest and wordmark locked left, sections right,
 * gold rule underneath. Deliberately static — no shrink-on-scroll. The
 * board layout wants a stable masthead, the way a results page does.
 */
export default function CrestHeader() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 w-full"
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
            src={site.assets.crest}
            alt=""
            width={96}
            height={96}
            priority
            style={{ width: 46, height: 46 }}
          />
          <span className="hidden sm:block">
            <span
              className="display block"
              style={{ fontSize: "clamp(0.95rem, 2.6vw, 1.45rem)" }}
            >
              {site.teamName}
            </span>
            <span
              className="display block"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: "var(--gs-gold)",
                marginTop: 2,
              }}
            >
              Est. {site.established} · MCLA DII · {site.conference}
            </span>
          </span>
        </Link>

        <span className="flex-1" />

        <nav aria-label="Main" className="flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="display flex cursor-pointer items-center justify-center px-2.5 transition-colors duration-200 sm:px-3"
                style={{
                  minHeight: 44,
                  fontSize: "0.72rem",
                  letterSpacing: "0.13em",
                  color: active ? "var(--gs-gold)" : "var(--text-primary)",
                  borderBottom: `2px solid ${active ? "var(--gs-gold)" : "transparent"}`,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
