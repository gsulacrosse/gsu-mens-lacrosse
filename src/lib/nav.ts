/**
 * The site's destinations.
 *
 * `blurb` shows on the home tiles. `photo` is the action shot that sits
 * behind each home tile (scattered team photos). Keep blurbs factual and
 * short — no marketing voice. See README.md.
 */
export const NAV = [
  {
    href: "/schedule",
    label: "Schedule",
    blurb: "Games and results",
    photo: "/brand/photos/shot-11-tampa.jpg",
  },
  {
    href: "/roster",
    label: "Roster",
    blurb: "Players and board",
    photo: "/brand/photos/action-southern-26.jpg",
  },
  {
    href: "/photos",
    label: "Photos",
    blurb: "Game gallery",
    photo: "/brand/photos/celebration-night.jpg",
  },
  {
    href: "/store",
    label: "Store",
    blurb: "Team merch",
    photo: "/brand/photos/action-43-shot.jpg",
  },
  {
    href: "/donate",
    label: "Donate",
    blurb: "Support the season",
    photo: "/brand/photos/action-southern-1.jpg",
  },
] as const;
