import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import type { CSSProperties } from "react";
import { Analytics } from "@vercel/analytics/next";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/site-url";
import CrestHeader from "@/components/CrestHeader";
import SiteFooter from "@/components/SiteFooter";
import ScrollProgress from "@/components/ScrollProgress";
import RouteLoader from "@/components/RouteLoader";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description = `${site.league} club lacrosse at Georgia Southern University. ${site.conference}, established ${site.established}. Home games at the ${site.homeVenue} in ${site.city}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.teamName,
    template: `%s — ${site.shortName}`,
  },
  description,
  keywords: [
    "Georgia Southern lacrosse",
    "GSU lacrosse",
    "GS Eagles lacrosse",
    "MCLA",
    "SELC",
    "club lacrosse",
    "Statesboro",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.teamName,
    description: `${site.league} · ${site.conference} · Est. ${site.established}`,
    type: "website",
    siteName: site.teamName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.teamName,
    description: `${site.league} · ${site.conference} · Est. ${site.established}`,
  },
};

/*
  Structured data (schema.org SportsTeam). Helps Google understand the site
  is *this specific club* — its sport, league, home, and social accounts — so
  it can index it as an entity and show a richer result. Built from site.json
  so it never drifts from the rest of the site.
*/
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: site.teamName,
  alternateName: ["GSU Lacrosse", "Georgia Southern Eagles Lacrosse", "GS Men's Lacrosse"],
  sport: "Lacrosse",
  url: SITE_URL,
  logo: `${SITE_URL}${site.assets.crestMark}`,
  foundingDate: String(site.established),
  email: site.email,
  memberOf: [
    { "@type": "SportsOrganization", name: "Men's Collegiate Lacrosse Association (MCLA)" },
    { "@type": "SportsOrganization", name: "Southeastern Lacrosse Conference (SELC)" },
  ],
  location: {
    "@type": "Place",
    name: site.homeVenue,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Statesboro",
      addressRegion: "GA",
      addressCountry: "US",
    },
  },
  sameAs: [site.links.instagram, site.links.facebook, site.links.linktree].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlow.variable} h-full antialiased`}
    >
      {/*
        suppressHydrationWarning: browser extensions (Grammarly, etc.) inject
        data-* attributes into <body> before React hydrates, which trips a
        false hydration warning. This suppresses only <body>'s own attribute
        noise — real mismatches in the tree still surface normally.
      */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/*
          The fixed field layer. Rendered once here so it persists across
          route changes — navigating between pages doesn't reload or jump the
          photo. See globals.css for why this is a fixed element rather than
          `background-attachment: fixed` (that rule is broken on iOS Safari).
        */}
        <div
          className="field-layer"
          style={
            {
              "--field-image": `url('${site.assets.fieldPhoto}')`,
            } as CSSProperties
          }
          aria-hidden="true"
        />

        <RouteLoader />
        <CrestHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ScrollProgress />
        <Analytics />
      </body>
    </html>
  );
}
