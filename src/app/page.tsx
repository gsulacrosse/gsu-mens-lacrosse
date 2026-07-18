import Link from "next/link";
import site from "@/data/site.json";
import schedule from "@/data/schedule.json";
import { NAV } from "@/lib/nav";
import { ArrowIcon } from "@/components/icons";

type Game = {
  date: string;
  opponent: string;
  home: boolean;
  location?: string;
  result?: string;
};

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export default function Home() {
  const games = schedule as Game[];

  // Split on whether a result has been recorded, not on today's date — a
  // played game without a posted score still belongs under "recent".
  const upcoming = games.filter((g) => !g.result);
  const played = games.filter((g) => g.result).slice(-4).reverse();
  const next = upcoming[0];

  return (
    <div className="shell">
      {/* ================= THE BOARD ================= */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr]"
        style={{ borderBottom: "1px solid var(--rule-faint)" }}
      >
        {/* Next fixture — the largest thing on the page */}
        <div
          className="rise py-8 sm:py-12 lg:py-16 lg:pr-10"
          style={{ borderRight: "1px solid var(--rule-faint)" }}
        >
          <p className="kicker">Next fixture</p>

          {next ? (
            <>
              <h1
                className="display mt-2.5"
                style={{ fontSize: "var(--step-hero)" }}
              >
                {next.opponent}
              </h1>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="numeral" style={{ fontSize: "var(--step-title)" }}>
                  {fmt(next.date)}
                </span>
                <span
                  className="display"
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.14em",
                    color: "var(--gs-gold)",
                  }}
                >
                  {next.home ? "Home" : "Away"}
                </span>
                {next.location && (
                  <span
                    className="display"
                    style={{
                      fontSize: "0.78rem",
                      letterSpacing: "0.13em",
                      color: "var(--text-muted)",
                    }}
                  >
                    {next.location}
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <h1
                className="display mt-2.5"
                style={{ fontSize: "var(--step-hero)" }}
              >
                To be announced
              </h1>
              <p className="mt-3" style={{ color: "var(--text-muted)", maxWidth: "46ch" }}>
                The schedule hasn&rsquo;t been released yet. It&rsquo;ll be
                posted here and on Instagram as soon as it is.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <span
                  className="display"
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.13em",
                    color: "var(--text-muted)",
                  }}
                >
                  {site.homeVenue}
                </span>
                <span
                  className="display"
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.13em",
                    color: "var(--text-muted)",
                  }}
                >
                  {site.city}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Recent results */}
        <aside className="rise py-6 lg:py-12 lg:pl-10">
          <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
            Recent results
          </h2>

          {played.length === 0 ? (
            <p
              className="pt-3"
              style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}
            >
              No results posted yet. They&rsquo;ll appear here once games are
              played.
            </p>
          ) : (
            <ul>
              {played.map((g) => (
                <li
                  key={`${g.date}-${g.opponent}`}
                  className="flex items-baseline gap-3 py-2.5"
                  style={{ borderBottom: "1px solid var(--rule-faint)" }}
                >
                  <span
                    className="numeral"
                    style={{ minWidth: "3.4rem", color: "var(--text-muted)", fontSize: "0.85rem" }}
                  >
                    {fmt(g.date)}
                  </span>
                  <span className="display flex-1" style={{ fontSize: "0.98rem" }}>
                    {g.opponent}
                  </span>
                  <span className="numeral" style={{ fontSize: "0.92rem" }}>
                    {g.result}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>

      {/* ================= DESTINATION STRIP ================= */}
      <nav
        aria-label="Sections"
        className="grid grid-cols-2 lg:grid-cols-4"
        style={{ borderBottom: "1px solid var(--rule-faint)" }}
      >
        {NAV.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="rise group flex cursor-pointer flex-col gap-1.5 px-4 py-7 transition-colors duration-200 sm:py-9"
            style={{
              animationDelay: `${i * 45}ms`,
              borderRight: "1px solid var(--rule-faint)",
              borderBottom: "1px solid var(--rule-faint)",
            }}
          >
            <span className="numeral" style={{ fontSize: "0.72rem", color: "var(--gs-gold)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="display transition-colors duration-200 group-hover:text-[var(--gs-gold)]"
              style={{ fontSize: "clamp(1.25rem, 3.6vw, 1.85rem)" }}
            >
              {item.label}
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
              {item.blurb}
            </span>
          </Link>
        ))}
      </nav>

      {/* ================= JOIN ================= */}
      <section className="rise flex flex-wrap items-center gap-5 py-8 sm:py-11">
        <p style={{ color: "var(--text-muted)", flex: 1, minWidth: "16rem", maxWidth: "46ch" }}>
          Open to all Georgia Southern students. Experience helps, but we take
          beginners.
        </p>
        <a
          href={site.links.interestForm}
          target="_blank"
          rel="noopener noreferrer"
          className="display inline-flex cursor-pointer items-center gap-2.5 px-7 transition-colors duration-200 hover:bg-[var(--gs-gold)]"
          style={{
            minHeight: 48,
            background: "var(--gs-white)",
            color: "var(--text-on-light)",
            letterSpacing: "0.14em",
          }}
        >
          Interest form
          <ArrowIcon />
        </a>
      </section>
    </div>
  );
}
