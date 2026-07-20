import Link from "next/link";
import site from "@/data/site.json";
import schedule from "@/data/schedule.json";
import { NAV } from "@/lib/nav";
import { ArrowIcon } from "@/components/icons";
import VideoHero from "@/components/VideoHero";
import FeaturedReel from "@/components/FeaturedReel";

type Game = {
  date: string;
  dateLabel?: string;
  opponent: string;
  home: boolean;
  location?: string;
  note?: string;
  season?: string;
  result?: string;
};

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

export default function Home() {
  const games = schedule as Game[];
  // Next fixture = the soonest DATED game without a result. Undated (TBD)
  // games are real but can't be "next", so they're excluded from this pick.
  const next = games
    .filter((g) => !g.result && g.date)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const played = games.filter((g) => g.result).slice(-6).reverse();

  return (
    <>
      {/* Full-bleed muted highlight reel behind the team name */}
      <VideoHero />

      <div className="shell">
        {/* ================= THE BOARD ================= */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr]"
          style={{ borderBottom: "1px solid var(--rule-faint)" }}
        >
          {/* Next fixture */}
          <div
            className="rise py-8 sm:py-12 lg:py-14 lg:pr-10"
            style={{ borderRight: "1px solid var(--rule-faint)" }}
          >
            <p className="kicker">Next fixture</p>
            {next ? (
              <>
                <h2 className="display mt-2.5" style={{ fontSize: "var(--step-title)" }}>
                  {next.opponent}
                </h2>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="numeral" style={{ fontSize: "var(--step-tile)" }}>
                    {fmt(next.date)}
                  </span>
                  <span
                    className="display"
                    style={{ fontSize: "0.78rem", letterSpacing: "0.14em", color: "var(--gs-gold)" }}
                  >
                    {next.home ? "Home" : "Away"}
                  </span>
                  {next.location && (
                    <span
                      className="display"
                      style={{ fontSize: "0.78rem", letterSpacing: "0.13em", color: "var(--text-muted)" }}
                    >
                      {next.location}
                    </span>
                  )}
                </div>
                {next.note && (
                  <p className="mt-2" style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {next.note}
                  </p>
                )}
              </>
            ) : (
              <>
                <h2 className="display mt-2.5" style={{ fontSize: "var(--step-title)" }}>
                  To be announced
                </h2>
                <p className="mt-3" style={{ color: "var(--text-muted)", maxWidth: "46ch" }}>
                  The schedule hasn&rsquo;t been released yet. It&rsquo;ll be posted here and on
                  Instagram as soon as it is.
                </p>
              </>
            )}
          </div>

          {/* Past scores — update after each game (see README) */}
          <aside className="rise py-6 lg:py-12 lg:pl-10">
            <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
              Past scores
            </h2>
            {played.length === 0 ? (
              <p className="pt-3" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                No results posted yet. Scores show up here after each game.
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

        {/* ================= DESTINATION STRIP (scattered photos) ========= */}
        <nav
          aria-label="Sections"
          className="grid grid-cols-2 lg:grid-cols-5"
          style={{ borderBottom: "1px solid var(--rule-faint)" }}
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="rise group relative flex min-h-[9rem] cursor-pointer flex-col justify-between overflow-hidden px-4 py-6 sm:min-h-[13rem]"
              style={{
                animationDelay: `${i * 45}ms`,
                borderRight: "1px solid var(--rule-faint)",
                borderBottom: "1px solid var(--rule-faint)",
              }}
            >
              {/* Scattered action photo, dimmed hard so text stays readable */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-500 group-hover:opacity-70 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.photo}')` }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,18,42,0.55) 0%, rgba(5,18,42,0.85) 100%)",
                }}
              />
              <span className="numeral relative" style={{ fontSize: "0.72rem", color: "var(--gs-gold)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative">
                <span
                  className="display block transition-colors duration-200 group-hover:text-[var(--gs-gold)]"
                  style={{ fontSize: "clamp(1.15rem, 3vw, 1.7rem)" }}
                >
                  {item.label}
                </span>
                <span style={{ color: "#cdd6e4", fontSize: "0.76rem" }}>{item.blurb}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* ================= FEATURED REEL (sound on tap) ================= */}
        <FeaturedReel />

        {/* ================= JOIN ================= */}
        <section className="rise flex flex-wrap items-center gap-5 py-8 sm:py-11">
          <p style={{ color: "var(--text-muted)", flex: 1, minWidth: "16rem", maxWidth: "46ch" }}>
            Open to all Georgia Southern students. Experience helps, but we take beginners.
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
    </>
  );
}
