import type { ReactNode } from "react";

/**
 * Fixture-board page frame: masthead block separated from content by a gold
 * rule, everything else divided with hairlines. No cards anywhere.
 */
export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="shell">
      <section
        className="rise py-8 sm:py-11"
        style={{ borderBottom: "1px solid var(--rule-gold)" }}
      >
        <h1 className="display" style={{ fontSize: "var(--step-title)" }}>
          {title}
        </h1>
        {intro && (
          <p className="mt-2" style={{ color: "var(--text-muted)", maxWidth: "58ch" }}>
            {intro}
          </p>
        )}
      </section>
      {children}
    </div>
  );
}

/**
 * Shown wherever real data hasn't arrived yet.
 *
 * The rule for this whole site: never fabricate a game, a player, a sponsor,
 * or a price to fill space. An honest "not published yet" is better than a
 * plausible-looking invention someone might believe.
 */
export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <section
      className="rise py-8"
      style={{ borderBottom: "1px solid var(--rule-faint)" }}
    >
      <p style={{ color: "var(--text-muted)", maxWidth: "56ch" }}>{children}</p>
    </section>
  );
}

/** A titled block within a page — kicker label, gold rule, then content. */
export function Block({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="rise py-8">
      <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
        {label}
      </h2>
      {children}
    </section>
  );
}
