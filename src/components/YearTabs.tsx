"use client";

import { useState, type ReactNode } from "react";

/**
 * Season switcher used on the Schedule and Roster pages. Every panel is
 * rendered into the HTML up front (just hidden when inactive), so the content
 * is server-rendered and indexable — the tabs only toggle visibility.
 */
export default function YearTabs({
  tabs,
}: {
  tabs: { key: string; label: string; panel: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.key);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Season"
        className="mb-7 flex flex-wrap"
        style={{ borderBottom: "1px solid var(--rule-faint)" }}
      >
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(t.key)}
              className="display cursor-pointer whitespace-nowrap px-4 py-3 transition-colors duration-200"
              style={{
                fontSize: "1rem",
                letterSpacing: "0.06em",
                color: on ? "var(--gs-gold)" : "var(--text-muted)",
                borderBottom: `2px solid ${on ? "var(--gs-gold)" : "transparent"}`,
                marginBottom: "-1px",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t) => (
        <div key={t.key} role="tabpanel" hidden={t.key !== active}>
          {t.panel}
        </div>
      ))}
    </div>
  );
}
