import type { Metadata } from "next";
import schedule from "@/data/schedule.json";
import { PageShell, EmptyState, Block } from "@/components/PageShell";

export const metadata: Metadata = { title: "Schedule" };

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
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const dateText = (g: Game) => g.dateLabel || (g.date ? fmt(g.date) : "TBD");

export default function SchedulePage() {
  const games = schedule as Game[];

  // Group into the seasons the team uses, preserving list order within each.
  const seasons: string[] = [];
  for (const g of games) {
    const s = g.season || "Schedule";
    if (!seasons.includes(s)) seasons.push(s);
  }

  return (
    <PageShell
      title="Schedule"
      intro="2026–27 season. Some dates are still being confirmed — check Instagram for the latest."
    >
      {games.length === 0 ? (
        <EmptyState>
          The schedule hasn&rsquo;t been published yet. Once it&rsquo;s set,
          it&rsquo;ll be posted here and on Instagram.
        </EmptyState>
      ) : (
        seasons.map((season) => (
          <Block key={season} label={season}>
            <ul className="mt-1">
              {games
                .filter((g) => (g.season || "Schedule") === season)
                .map((game, i) => (
                  <li
                    key={`${game.date}-${game.opponent}-${i}`}
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
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
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.13em",
                        color: "var(--gs-gold)",
                        minWidth: "3rem",
                      }}
                    >
                      {game.home ? "Home" : "Away"}
                    </span>
                    <span
                      className="display flex-1"
                      style={{ fontSize: "var(--step-tile)", minWidth: "10rem" }}
                    >
                      {game.opponent}
                    </span>
                    {game.result && (
                      <span className="numeral" style={{ fontSize: "var(--step-body)" }}>
                        {game.result}
                      </span>
                    )}
                    {(game.location || game.note) && (
                      <span
                        className="w-full"
                        style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}
                      >
                        {[game.location, game.note].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </Block>
        ))
      )}
    </PageShell>
  );
}
