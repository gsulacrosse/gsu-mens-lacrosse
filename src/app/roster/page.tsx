import type { Metadata } from "next";
import Image from "next/image";
import rosterData from "@/data/roster.json";
import boardData from "@/data/board.json";
import { SEASONS, seasonLabel } from "@/lib/seasons";
import { PageShell, EmptyState, Block } from "@/components/PageShell";
import YearTabs from "@/components/YearTabs";

export const metadata: Metadata = { title: "Roster" };

type Player = {
  number?: number;
  name: string;
  position?: string;
  class?: string;
  year?: string;
  height?: string;
  weight?: string;
  hometown?: string;
  photo?: string;
};
type Officer = { role: string; name: string };

const rosters = rosterData as Record<string, Player[]>;
const boards = boardData as Record<string, Officer[]>;

// Season-specific officer group photo, shown above the board list when present.
const officerGraphic: Record<string, string> = {
  "2026-27": "/brand/photos/officers-2026.png",
};

function PlayerCard({ p }: { p: Player }) {
  return (
    <li className="flex flex-col" style={{ border: "1px solid var(--rule-faint)" }}>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1", background: "var(--gs-navy)" }}>
        {p.photo ? (
          <Image
            src={p.photo}
            alt={p.name}
            width={300}
            height={300}
            className="h-full w-full"
            style={{ objectFit: "cover", objectPosition: "center 22%" }}
          />
        ) : (
          <span className="numeral absolute inset-0 flex items-center justify-center" style={{ color: "var(--rule-faint)", fontSize: "2rem" }}>
            GS
          </span>
        )}
        {p.number != null && (
          <span
            className="numeral absolute left-0 top-0 flex items-center justify-center px-2 py-1"
            style={{ background: "var(--gs-gold)", color: "var(--gs-navy-deep)", fontSize: "1rem", minWidth: "2rem" }}
          >
            {p.number}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-3">
        <span className="display" style={{ fontSize: "1.15rem", lineHeight: 1.05 }}>
          {p.name}
        </span>
        <span className="display" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: "var(--gs-gold)" }}>
          {[p.position, p.class].filter(Boolean).join(" · ")}
        </span>
        {p.hometown && (
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{p.hometown}</span>
        )}
      </div>
    </li>
  );
}

function RosterPanel({ players, officers, graphic }: { players: Player[]; officers: Officer[]; graphic?: string }) {
  const nothing = players.length === 0 && officers.length === 0;
  if (nothing) {
    return <EmptyState>This season&rsquo;s roster hasn&rsquo;t been published yet.</EmptyState>;
  }
  return (
    <>
      {players.length > 0 && (
        <Block label={`Players · ${players.length}`}>
          <ul className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {players.map((p) => (
              <PlayerCard key={`${p.number ?? "x"}-${p.name}`} p={p} />
            ))}
          </ul>
        </Block>
      )}

      {players.length === 0 && officers.length > 0 && (
        <EmptyState>The player roster for this season hasn&rsquo;t been published yet.</EmptyState>
      )}

      {officers.length > 0 && (
        <Block label="Board">
          {graphic && (
            <Image
              src={graphic}
              alt="Georgia Southern Men's Lacrosse officers"
              width={812}
              height={807}
              className="mb-6 h-auto w-full max-w-[440px]"
              style={{ border: "1px solid var(--rule-faint)" }}
            />
          )}
          <ul>
            {officers.map((o) => (
              <li
                key={o.role + o.name}
                className="flex flex-wrap items-baseline justify-between gap-x-4 py-3.5"
                style={{ borderBottom: "1px solid var(--rule-faint)" }}
              >
                <span className="display" style={{ fontSize: "1.25rem" }}>
                  {o.name}
                </span>
                <span className="display" style={{ color: "var(--gs-gold)", fontSize: "0.9rem", letterSpacing: "0.1em" }}>
                  {o.role}
                </span>
              </li>
            ))}
          </ul>
        </Block>
      )}
    </>
  );
}

export default function RosterPage() {
  const tabs = SEASONS.map((year) => ({
    key: year,
    label: seasonLabel(year),
    panel: (
      <RosterPanel
        players={rosters[year] ?? []}
        officers={boards[year] ?? []}
        graphic={officerGraphic[year]}
      />
    ),
  }));

  return (
    <PageShell title="Roster" intro="Players and club board by season.">
      <YearTabs tabs={tabs} />
    </PageShell>
  );
}
