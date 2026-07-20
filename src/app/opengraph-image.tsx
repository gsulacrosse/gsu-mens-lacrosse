import { ImageResponse } from "next/og";
import site from "@/data/site.json";

/**
 * Social-share card — what shows when the site link is dropped in the
 * Instagram bio, texted, or posted. Typographic and navy/gold on purpose:
 * it renders identically everywhere with no external font or image fetch,
 * so it can never break. Matches the site's matchday-program look.
 */
export const alt = `${site.teamName} — ${site.league}, ${site.conference}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a1f44 0%, #05122a 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#b5a16b",
            fontWeight: 700,
          }}
        >
          Est. {site.established} · {site.league} · {site.conference}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              color: "#ffffff",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Georgia Southern
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 800,
              color: "#b5a16b",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Men&rsquo;s Lacrosse
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "3px solid #b5a16b",
            paddingTop: 24,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#b9c4d6",
            fontWeight: 600,
          }}
        >
          {site.homeVenue} · {site.city}
        </div>
      </div>
    ),
    { ...size },
  );
}
