/**
 * The four destinations. This is the whole site.
 *
 * `blurb` shows on the home tiles only. Keep it factual and short — no
 * marketing voice. See README.md.
 */
export const NAV = [
  { href: "/schedule", label: "Schedule", blurb: "Games and results" },
  { href: "/roster", label: "Roster", blurb: "Players and board" },
  { href: "/store", label: "Store", blurb: "Team merch" },
  { href: "/donate", label: "Donate", blurb: "Support the season" },
] as const;
