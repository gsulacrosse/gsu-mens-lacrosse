import type { Metadata } from "next";
import schedule from "@/data/schedule.json";
import { PageShell, EmptyState } from "@/components/PageShell";

export const metadata: Metadata = { title: "Schedule" };

type Game = {
  date: string;
  opponent: string;
  home: boolean;
  location?: string;
  result?: string;
};

export default function SchedulePage() {
  const games = schedule as Game[];

  return (
    <PageShell
      title="Schedule"
      intro="Games and results for the current season."
    >
      {games.length === 0 ? (
        <EmptyState>
          The schedule hasn&rsquo;t been published yet. Once it&rsquo;s set,
          it&rsquo;ll be posted here and on Instagram.
        </EmptyState>
      ) : (
        <section className="rise py-2">
          <ul>
            {games.map((game) => (
              <li
                key={`${game.date}-${game.opponent}`}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
                style={{ borderBottom: "1px solid var(--rule-faint)" }}
              >
                <span
                  className="numeral"
                  style={{ fontSize: "var(--step-body)", minWidth: "6.5rem" }}
                >
                  {new Date(`${game.date}T12:00:00`).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span
                  className="display"
                  style={{ fontSize: "var(--step-small)", color: "var(--gs-gold)", minWidth: "3rem" }}
                >
                  {game.home ? "Home" : "Away"}
                </span>
                <span className="display flex-1" style={{ fontSize: "var(--step-tile)" }}>
                  {game.opponent}
                </span>
                {game.result && (
                  <span className="numeral" style={{ fontSize: "var(--step-body)" }}>
                    {game.result}
                  </span>
                )}
                {game.location && (
                  <span
                    className="w-full"
                    style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}
                  >
                    {game.location}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
