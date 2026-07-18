/**
 * SVG icons — never emoji (see the UI/UX Pro Max rule `no-emoji-icons`).
 *
 * These are simplified geometric glyphs drawn by hand, not the official
 * brand paths. They read correctly at 24px, which is all they're used at.
 * If you need pixel-exact brand marks, replace the paths with the official
 * ones from https://simpleicons.org — the component API won't change.
 *
 * All use a fixed 24x24 viewBox and inherit `currentColor` so hover states
 * come from the parent.
 */

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function InstagramIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M15.2 8.2h-1.6a1.6 1.6 0 0 0-1.6 1.6V21" />
      <path d="M9.8 13.2h4.6" />
    </svg>
  );
}

export function TikTokIcon() {
  return (
    <svg {...base}>
      <path d="M14.2 3v11.4a3.4 3.4 0 1 1-3.4-3.4" />
      <path d="M14.2 3c.4 2.3 2 3.8 4.3 4v3c-1.7 0-3.2-.5-4.3-1.5" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg {...base} width={18} height={18}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
