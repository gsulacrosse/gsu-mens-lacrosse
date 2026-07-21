import type { Metadata } from "next";
import Image from "next/image";
import roster from "@/data/roster.json";
import board from "@/data/board.json";
import { PageShell, EmptyState, Block } from "@/components/PageShell";

export const metadata: Metadata = { title: "Roster" };

type Player = { number?: number; name: string; position?: string; year?: string };
type Officer = { role: string; name: string };

export default function RosterPage() {
  const players = roster as Player[];
  const officers = board as Officer[];

  return (
    <PageShell title="Roster" intro="Players and club board for the current season.">
      {players.length === 0 ? (
        <EmptyState>The roster hasn&rsquo;t been published yet.</EmptyState>
      ) : (
        <Block label="Players">
          <ul>
            {players.map((p) => (
              <li
                key={`${p.number ?? "x"}-${p.name}`}
                className="flex items-baseline gap-4 py-3"
                style={{ borderBottom: "1px solid var(--rule-faint)" }}
              >
                <span
                  className="numeral"
                  style={{
                    fontSize: "var(--step-tile)",
                    color: "var(--gs-gold)",
                    minWidth: "2.75rem",
                  }}
                >
                  {p.number ?? "—"}
                </span>
                <span className="display flex-1" style={{ fontSize: "var(--step-body)" }}>
                  {p.name}
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>
                  {[p.position, p.year].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {officers.length > 0 && (
        <Block label="2026–27 Board">
          <Image
            src="/brand/photos/officers-2026.png"
            alt="Georgia Southern Men's Lacrosse 2026–27 officers"
            width={812}
            height={807}
            className="mb-6 h-auto w-full max-w-[440px]"
            style={{ border: "1px solid var(--rule-faint)" }}
          />
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
                <span
                  className="display"
                  style={{ color: "var(--gs-gold)", fontSize: "0.9rem", letterSpacing: "0.1em" }}
                >
                  {o.role}
                </span>
              </li>
            ))}
          </ul>
        </Block>
      )}
    </PageShell>
  );
}
