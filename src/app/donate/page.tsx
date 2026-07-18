import type { Metadata } from "next";
import site from "@/data/site.json";
import sponsors from "@/data/sponsors.json";
import { PageShell } from "@/components/PageShell";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Donate" };

type Sponsor = { name: string; url?: string };

export default function DonatePage() {
  const list = sponsors as Sponsor[];

  return (
    <PageShell title="Support the team">
      <section
        className="rise py-8"
        style={{ borderBottom: "1px solid var(--rule-faint)" }}
      >
        <p style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>
          Club lacrosse is player-funded. Dues don&rsquo;t cover everything —
          league fees, referees, travel to conference games, and equipment all
          come out of what the team raises. Anything helps.
        </p>

        <a
          href={site.links.gofundme}
          target="_blank"
          rel="noopener noreferrer"
          className="display mt-6 inline-flex cursor-pointer items-center gap-2 px-6 transition-colors duration-200 hover:bg-[var(--gs-gold)]"
          style={{
            minHeight: 48,
            background: "var(--gs-white)",
            color: "var(--text-on-light)",
            letterSpacing: "0.1em",
          }}
        >
          Donate on GoFundMe
          <ArrowIcon />
        </a>
      </section>

      <section
        className="rise py-8"
        style={{ borderBottom: "1px solid var(--rule-faint)" }}
      >
        <h2 className="display" style={{ fontSize: "var(--step-body)" }}>
          Sponsor the club
        </h2>
        <p className="mt-2" style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>
          Businesses interested in sponsoring the team can reach the board at{" "}
          <a
            href={`mailto:${site.email}`}
            className="cursor-pointer underline transition-colors duration-200 hover:text-[var(--gs-gold)]"
            style={{ color: "var(--text-primary)" }}
          >
            {site.email}
          </a>
          .
        </p>

        {list.length > 0 && (
          <ul className="rule-gold mt-6 flex flex-wrap gap-x-6 gap-y-2 pt-4">
            {list.map((s) => (
              <li key={s.name} className="display" style={{ fontSize: "var(--step-small)" }}>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-colors duration-200 hover:text-[var(--gs-gold)]"
                  >
                    {s.name}
                  </a>
                ) : (
                  s.name
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
