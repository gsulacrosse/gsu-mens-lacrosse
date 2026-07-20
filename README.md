# Georgia Southern Men's Lacrosse — Website

Site for the GS Men's Lacrosse Club (MCLA DII, SELC North, est. 1993).

**You do not need to know how to code to update this site.** Everything the
club changes week to week lives in five text files. Instructions below.

---

## Updating the site

All content lives in `src/data/`. Edit these on GitHub — click the file, click
the pencil icon, make your change, click "Commit changes" at the bottom. The
site rebuilds itself within about a minute.

The files use a format called JSON. Two rules cover almost every mistake:

- Every item needs a comma after it **except the last one**.
- Text goes in `"double quotes"`. Numbers don't.

If you break something, GitHub keeps every past version — nothing is ever lost.

### `schedule.json` — games and results

The home page automatically shows the **first game with no `result`** as the
next fixture. You don't set that separately.

```json
[
  {
    "date": "2026-09-12",
    "opponent": "Kennesaw State",
    "home": true,
    "location": "Georgia Southern RAC",
    "result": "W 12-8"
  }
]
```

- `date` — always `YYYY-MM-DD`. **Leave it empty (`""`) for a TBD game** and
  add `"dateLabel": "TBD"` so it still shows.
- `home` — `true` for home games, `false` for away.
- `location` — optional (e.g. `"Athens, GA"`).
- `season` — optional label the games are grouped under on the Schedule page
  (e.g. `"Fall 2026"`, `"Spring 2027"`).
- `note` — optional short note shown under the game (e.g. `"Pending confirmation"`).
- `result` — **leave this out entirely until the game is played.** Once you add
  it (e.g. `"W 14-8"`), the game shows up under "Past scores" on the home page.

The home page automatically highlights the soonest game that has a real date
and no result. TBD games never become the "next fixture."

Empty schedule? Leave it as `[]` and the site says "To be announced."

### `roster.json` — players

```json
[
  { "number": 24, "name": "First Last", "position": "Attack", "year": "Junior" }
]
```

Every field except `name` is optional.

### `board.json` — club officers

```json
[{ "role": "President", "name": "First Last" }]
```

### `products.json` — merch

```json
[
  {
    "name": "Team Hoodie",
    "price": "$55",
    "checkoutUrl": "https://your-vendor.com/product/hoodie",
    "note": "Navy, unisex sizing"
  }
]
```

`checkoutUrl` can point anywhere — the vendor's own store, Shopify, a Stripe
link. The site doesn't care which vendor you use, so switching vendors later
means changing these links and nothing else.

### `site.json` — contact info and links

Email, social links, interest form, GoFundMe. Change a URL here and it updates
everywhere on the site.

Leave a social link as `""` (empty) to hide it rather than link somewhere dead.

---

## Swapping in the real logo and team photo

The site ships with obvious placeholders. To replace them:

1. Put the real files in `public/brand/`.
2. If your photo is a `.jpg`, open `src/data/site.json` and change
   `"fieldPhoto": "/brand/team-photo.svg"` to `"/brand/team-photo.jpg"`.

That's it. See `ASSETS-NEEDED.md` for exactly what to ask the team for.

---

## For developers

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

**Stack:** Next.js 16 (App Router), Tailwind v4, TypeScript. All five routes
prerender as static HTML.

### Design system

The site follows **Direction 03 — Fixture Board**, chosen from three explored
directions. Source mockups are in `design/`, mirrored to the team's Claude
Design project under `gsu-lacrosse/`.

The rules that make it that direction rather than a generic dark site:

- **Hairlines, not cards.** Content is separated by 1px rules like a printed
  results table. No floating panels with background fills anywhere. To group
  things, use a rule.
- **Gold is a highlight, never a fill.** Thin accents and hairlines only.
- **Hard corners.** `--radius` is `0px` and should stay that way.
- **Condensed type does the work.** Barlow Condensed for headings and all
  numerals (tabular, so columns align), Barlow for body.
- **Motion is one short upward translate.** That's the entire vocabulary.

All colors, type sizes, and spacing live in `src/app/tokens.css`. Restyling the
whole site means editing that one file.

### Two things not to break

**1. The fixed background.** `background-attachment: fixed` is broken on iOS
Safari — it silently falls back to scrolling, with no error. Since most
visitors arrive from the Instagram bio on an iPhone, the background is built as
a separate `position: fixed` element in `globals.css` (`.field-layer`). Don't
"simplify" it back into a background-attachment rule.

**2. Never invent data.** No made-up games, players, sponsors, or prices, even
as filler. Every list has an honest empty state. A plausible-looking invention
is worse than a blank, because someone will believe it.
