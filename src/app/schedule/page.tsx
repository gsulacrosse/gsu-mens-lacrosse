import type { Metadata } from "next";
import schedule from "@/data/schedule.json";
import site from "@/data/site.json";
import { SEASONS, CURRENT_SEASON, seasonLabel } from "@/lib/seasons";
import { PageShell, EmptyState, Block } from "@/components/PageShell";
import YearTabs from "@/components/YearTabs";
import OpponentLogo from "@/components/OpponentLogo";

export const metadata: Metadata = { title: "Schedule" };

type Game = {
  year?: string;
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
    weekday: "short",
    month: "short",
    day: "numeric",
  });

// Dates for the CURRENT season stay hidden ("TBD") until every one is
// confirmed (see site.json). Past seasons always show their real dates.
const dateText = (g: Game) => {
  const hide = !site.showScheduleDates && (g.year ?? CURRENT_SEASON) === CURRENT_SEASON;
  if (hide) return "TBD";
  return g.dateLabel || (g.date ? fmt(g.date) : "TBD");
};

function GameRow({ game, i }: { game: Game; i: number }) {
  return (
    <li
      key={`${game.date}-${game.opponent}-${i}`}
      className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4"
      style={{ borderBottom: "1px solid var(--rule-faint)" }}
    >
      <span
        className="numeral"
        style={{ fontSize: "var(--step-body)", minWidth: "7.5rem", color: "var(--text-muted)" }}
      >
        {dateText(game)}
      </span>
      <span
        className="display"
        style={{ fontSize: "0.72rem", letterSpacing: "0.13em", color: "var(--gs-gold)", minWidth: "3rem" }}
      >
        {game.home ? "Home" : "Away"}
      </span>
      <OpponentLogo src={game.logo} name={game.opponent} size={40} />
      <span className="display flex-1" style={{ fontSize: "var(--step-tile)", minWidth: "8rem" }}>
        {game.opponent}
      </span>
      {game.result && (
        <span
          className="numeral"
          style={{
            fontSize: "var(--step-body)",
            color: game.result.startsWith("W") ? "var(--gs-gold)" : "var(--text-muted)",
          }}
        >
          {game.result}
        </span>
      )}
      {(game.location || game.note) && (
        <span className="w-full" style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>
          {[game.location, game.note].filter(Boolean).join(" · ")}
        </span>
      )}
    </li>
  );
}

/** One season's games, grouped into the sub-seasons it uses (Fall / Spring). */
function SeasonPanel({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <EmptyState>
        Nothing posted for this season yet. Schedules and results show up here
        as they&rsquo;re confirmed.
      </EmptyState>
    );
  }
  const subs: string[] = [];
  for (const g of games) {
    const s = g.season || "Schedule";
    if (!subs.includes(s)) subs.push(s);
  }
  return (
    <>
      {subs.map((sub) => (
        <Block key={sub} label={sub}>
          <ul className="mt-1">
            {games
              .filter((g) => (g.season || "Schedule") === sub)
              .map((game, i) => (
                <GameRow key={`${game.date}-${game.opponent}-${i}`} game={game} i={i} />
              ))}
          </ul>
        </Block>
      ))}
    </>
  );
}

export default function SchedulePage() {
  const games = (schedule as Game[]).filter((g) => !g.hidden);

  const tabs = SEASONS.map((year) => ({
    key: year,
    label: seasonLabel(year),
    panel: <SeasonPanel games={games.filter((g) => (g.year ?? CURRENT_SEASON) === year)} />,
  }));

  return (
    <PageShell
      title="Schedule"
      intro={
        site.showScheduleDates
          ? "Fixtures and results by season."
          : "This season's opponents are set — dates are being finalized and will be posted here once confirmed. Past results are below by season."
      }
    >
      <YearTabs tabs={tabs} />
    </PageShell>
  );
}
