/**
 * The seasons shown as tabs on the Schedule and Roster pages, newest first.
 * The first entry is the default/active tab. To add a new season, add it to
 * the FRONT of this list and add matching data (a `year` on games in
 * schedule.json, and a `"<year>": [...]` key in roster.json / board.json).
 *
 * Keys are plain hyphens so they match the JSON data keys exactly; the tab
 * label is rendered with an en-dash for looks (see `seasonLabel`).
 */
export const SEASONS = ["2026-27", "2025-26"] as const;

export type Season = (typeof SEASONS)[number];

/** The current season — the one everything defaults to. */
export const CURRENT_SEASON: Season = SEASONS[0];

/** Pretty label for a season key, e.g. "2026-27" → "2026–27 Season". */
export const seasonLabel = (s: string) => `${s.replace("-", "–")} Season`;
