"use client";

import { useEffect, useState } from "react";

/**
 * "X days until <opponent>" — counts down to the next dated game. Computed on
 * the client so it's always accurate to the viewer's date without needing a
 * rebuild. Renders nothing once the date has passed or if there's no date.
 */
export default function Countdown({
  date,
  opponent,
}: {
  date: string;
  opponent: string;
}) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    if (!date) return;
    const target = new Date(`${date}T00:00:00`);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = Math.round(
      (target.getTime() - startOfToday.getTime()) / 86400000,
    );
    // Syncing to the viewer's clock (an external source) — the one case where
    // setting state from an effect is the correct pattern, not a cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(diff);
  }, [date]);

  if (days === null || days < 0) return null;

  const label = days === 0 ? "Today" : days === 1 ? "1 day" : `${days} days`;

  return (
    <span
      className="numeral inline-flex items-baseline gap-2"
      style={{ color: "var(--gs-gold)", fontSize: "0.8rem", letterSpacing: "0.06em" }}
    >
      <span className="ticker-live" style={{ background: "var(--gs-gold)" }} aria-hidden="true" />
      {days === 0 ? (
        <span className="display" style={{ letterSpacing: "0.12em" }}>
          Gameday
        </span>
      ) : (
        <>
          <span className="display" style={{ letterSpacing: "0.12em" }}>
            {label} until {opponent}
          </span>
        </>
      )}
    </span>
  );
}
