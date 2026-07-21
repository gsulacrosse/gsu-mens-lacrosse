import Link from "next/link";
import schedule from "@/data/schedule.json";
import site from "@/data/site.json";
import events from "@/data/events.json";
import { NAV } from "@/lib/nav";
import { ArrowIcon } from "@/components/icons";
import VideoHero from "@/components/VideoHero";
import FeaturedReel from "@/components/FeaturedReel";
import OpponentLogo from "@/components/OpponentLogo";
import Honors from "@/components/Honors";
import NewsTicker from "@/components/NewsTicker";
import Countdown from "@/components/Countdown";
import InstagramFeed from "@/components/InstagramFeed";
import IntroSequence from "@/components/IntroSequence";

type Game = {
  date: string;
  dateLabel?: string;
  opponent: string;
  home: boolean;
  location?: string;
  note?: string;
  logo?: string;
  season?: string;
  result?: string;
  hidden?: boolean;
};

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const fmtFull = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

type EventItem = {
  title: string;
  date: string;
  time?: string;
  location?: string;
  detail?: string;
};

export default function Home() {
  const games = (schedule as Game[]).filter((g) => !g.hidden);
  // Next fixture = the soonest DATED game without a result. While dates are
  // hidden (unconfirmed — see site.json), nothing is picked so the board shows
  // "To be announced" rather than implying a confirmed date.
  const next = site.showScheduleDates
    ? games
        .filter((g) => !g.result && g.date)
        .sort((a, b) => a.date.localeCompare(b.date))[0]
    : undefined;
  const played = games.filter((g) => g.result).slice(-6).reverse();

  return (
    <>
      {/* Full-screen reel intro → header + hero drop in. Plays every load. */}
      <IntroSequence />

      {/* Full-bleed muted highlight reel behind the team name */}
      <VideoHero />

      {/* Broadcast-style news crawl */}
      <NewsTicker />

      <div className="shell">
        {/* ================= INSTAGRAM (live, right below the news) ======= */}
        <InstagramFeed />

        {/* ================= THE BOARD ================= */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_0.8fr]"
          style={{ borderBottom: "1px solid var(--rule-faint)" }}
        >
          {/* Next fixture */}
          <div
            className="rise board-col py-8 sm:py-12 lg:py-14 lg:pr-9"
            style={{ borderRight: "1px solid var(--rule-faint)" }}
          >
            <p className="kicker">Next fixture</p>
            {next ? (
              <>
                <div className="mt-2.5 flex items-center gap-4">
                  <OpponentLogo src={next.logo} name={next.opponent} size={64} />
                  <h2 className="display" style={{ fontSize: "var(--step-title)" }}>
                    {next.opponent}
                  </h2>
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="numeral" style={{ fontSize: "var(--step-tile)" }}>
                    {fmt(next.date)}
                  </span>
                  <span
                    className="display"
                    style={{ fontSize: "0.9rem", letterSpacing: "0.14em", color: "var(--gs-gold)" }}
                  >
                    {next.home ? "Home" : "Away"}
                  </span>
                  {next.location && (
                    <span
                      className="display"
                      style={{ fontSize: "0.9rem", letterSpacing: "0.1em", color: "var(--text-muted)" }}
                    >
                      {next.location}
                    </span>
                  )}
                </div>
                {next.note && (
                  <p className="mt-2" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    {next.note}
                  </p>
                )}
                <div className="mt-4">
                  <Countdown date={next.date} opponent={next.opponent} />
                </div>
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

          {/* Upcoming events (non-game) — next to the fixture */}
          <div
            className="rise board-col py-6 lg:py-14 lg:px-9"
            style={{ borderRight: "1px solid var(--rule-faint)" }}
          >
            <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
              Upcoming
            </h2>
            {(events.items as EventItem[]).length === 0 ? (
              <p className="pt-3" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Nothing scheduled right now.
              </p>
            ) : (
              <ul className="mt-3 flex flex-col gap-5">
                {(events.items as EventItem[]).map((e) => (
                  <li key={e.title + e.date}>
                    <p className="display" style={{ fontSize: "var(--step-tile)" }}>
                      {e.title}
                    </p>
                    <p className="numeral mt-1" style={{ fontSize: "1.05rem", color: "var(--gs-gold)" }}>
                      {fmtFull(e.date)}
                      {e.time ? ` · ${e.time}` : ""}
                    </p>
                    {e.location && (
                      <p style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}>{e.location}</p>
                    )}
                    {e.detail && (
                      <p className="mt-1" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        {e.detail}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Past scores — update after each game (see README) */}
          <aside className="rise board-col py-6 lg:py-14 lg:pl-9">
            <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
              Past scores
            </h2>
            {played.length === 0 ? (
              <p className="pt-3" style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                No results posted yet. Scores show up here after each game.
              </p>
            ) : (
              <ul>
                {played.map((g) => (
                  <li
                    key={`${g.date}-${g.opponent}`}
                    className="flex items-center gap-3 py-2.5"
                    style={{ borderBottom: "1px solid var(--rule-faint)" }}
                  >
                    <span
                      className="numeral"
                      style={{ minWidth: "3.4rem", color: "var(--text-muted)", fontSize: "0.9rem" }}
                    >
                      {fmt(g.date)}
                    </span>
                    <OpponentLogo src={g.logo} name={g.opponent} size={28} />
                    <span className="display flex-1" style={{ fontSize: "1.05rem" }}>
                      {g.opponent}
                    </span>
                    <span className="numeral" style={{ fontSize: "1rem" }}>
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
          className="grid grid-cols-2 lg:grid-cols-3"
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
                  style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.1rem)" }}
                >
                  {item.label}
                </span>
                <span style={{ color: "#dbe2ee", fontSize: "0.95rem" }}>{item.blurb}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* ================= HONORS (hidden until real data) ============== */}
        <Honors />

        {/* ================= FEATURED REEL (sound on tap) ================= */}
        <FeaturedReel />

        {/* ================= AFFILIATIONS ================= */}
        <section
          className="rise flex flex-wrap items-center gap-x-5 gap-y-3 py-7"
          style={{ borderTop: "1px solid var(--rule-faint)" }}
        >
          <p className="kicker">Affiliations</p>
          <div className="flex items-center gap-3">
            <OpponentLogo src="/brand/logos/selc.png" name="SELC" size={44} />
            <span className="display" style={{ fontSize: "0.9rem", letterSpacing: "0.08em" }}>
              SELC North
            </span>
          </div>
          <span
            className="display"
            style={{ fontSize: "0.9rem", letterSpacing: "0.08em", color: "var(--text-muted)" }}
          >
            MCLA Division II
          </span>
        </section>

        {/* ================= JOIN ================= */}
        <section className="rise flex flex-wrap items-center gap-5 py-8 sm:py-11">
          <p style={{ color: "var(--text-muted)", flex: 1, minWidth: "16rem", maxWidth: "46ch" }}>
            Open to all Georgia Southern students. Experience helps, but we take beginners — dues,
            practice times, and how to join are on the Join page.
          </p>
          <Link
            href="/join"
            className="display inline-flex cursor-pointer items-center gap-2.5 px-7 transition-colors duration-200 hover:bg-[var(--gs-gold)]"
            style={{
              minHeight: 48,
              background: "var(--gs-white)",
              color: "var(--text-on-light)",
              letterSpacing: "0.14em",
            }}
          >
            Join the team
            <ArrowIcon />
          </Link>
        </section>
      </div>
    </>
  );
}
