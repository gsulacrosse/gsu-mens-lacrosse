# What to get from the team

Everything below is currently a placeholder or missing. Nothing here was
guessed or invented — where a fact wasn't verifiable, the site says so rather
than filling in something plausible.

Roughly in order of how much difference it makes.

---

## 1. The team photo — biggest visual impact

Right now this is a flat navy rectangle reading "TEAM PHOTO PLACEHOLDER." The
entire design sits on this photo, so it does more for how the site looks than
anything else on this list.

**Ask for:**
- Landscape orientation, at least 2000px wide (2400px+ preferred).
- The team positioned in the **middle band** of the frame — the top ~15% sits
  under the header and the bottom is covered by content.
- Bright and well-lit. A dark navy wash goes over it, so a moody shot gets
  muddy fast.

The Facebook cover photo (full team in navy/white on the field) is the right
shot — but the version on Facebook is screen resolution. Ask whoever posted it
for the original from their camera roll.

**Install:** save as `public/brand/team-photo.jpg`, then change
`assets.fieldPhoto` in `src/data/site.json` to `/brand/team-photo.jpg`.

---

## 2. The real crest — DONE (vector still nice-to-have)

The real crest is in place (`public/brand/crest.png`, transparent background)
and drives the header, favicon, and the site's navy/gold.

Still worth chasing only if easy: the **vector** original (`.svg`, `.ai`,
`.eps`, `.pdf`). It would render razor-sharp at any size. The PNG is good for
web; vector is just the belt-and-suspenders version. Not urgent.

---

## 3. Exact brand colors

The navy and gold in `src/app/tokens.css` are marked `UNCONFIRMED` and are
placeholders. They have **not** been checked against Georgia Southern's brand
guide or the club's logo files.

**Ask for:** the hex codes, from the designer or whoever holds the logo files.
Georgia Southern athletics publishes official brand colors; the club's gold
accent may or may not match the university's exactly.

**Install:** replace the three values marked `UNCONFIRMED` in `tokens.css`.
Nothing else needs to change.

---

## 4. Schedule

Currently empty, so the site honestly says "To be announced."

**Ask for:** dates, opponents, home/away, locations. A spreadsheet or even a
text message works — it's five fields per game.

**Install:** `src/data/schedule.json` (format in README).

---

## 5. Roster and board

Both empty. The club has an Instagram highlight titled "2025–26 BOARD" — but
story screenshots are low-res and often out of date, so ask directly.

**Ask for:** jersey number, name, position, year for players; role and name for
board members.

**Install:** `src/data/roster.json` and `src/data/board.json`.

---

## 6. Merch store

The old Capelli Sport store had one product (a fleece hoodie). The club has a
new designer and a new vendor, so the store page ships empty rather than
pointing at something being replaced.

**Ask for:** the new vendor's storefront URL once live, and per-product name,
price, and checkout link.

**Install:** `src/data/products.json`. The page is vendor-agnostic — each
product just links out, so any vendor works.

---

## 7. Sponsors

There's a "Sponsors" Instagram highlight. Ask the board for the current list
and logo files before publishing anything — a sponsor listed incorrectly, or
one whose agreement has lapsed, is worse than an empty section.

**Install:** `src/data/sponsors.json`.

---

## 8. TikTok handle

`site.json` has `tiktok: ""`, which hides the link. The Linktree references a
TikTok but the exact handle wasn't confirmed, so it's left empty rather than
guessed at.

---

## Still undecided

**Domain.** Nothing is hardcoded. Worth checking availability on variations of
`gsueagleslax` (matching their Instagram) or `gsmenslacrosse`. Whatever gets
picked, it goes in the hosting settings, not the code.
