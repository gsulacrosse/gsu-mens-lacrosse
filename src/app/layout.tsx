import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import type { CSSProperties } from "react";
import site from "@/data/site.json";
import CrestHeader from "@/components/CrestHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: site.teamName,
    template: `%s — ${site.shortName}`,
  },
  description: `${site.league} club lacrosse at Georgia Southern University. ${site.conference}, established ${site.established}. Home games at the ${site.homeVenue} in ${site.city}.`,
  openGraph: {
    title: site.teamName,
    description: `${site.league} · ${site.conference} · Est. ${site.established}`,
    type: "website",
  },
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
      <body className="min-h-full flex flex-col">
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

        <CrestHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
