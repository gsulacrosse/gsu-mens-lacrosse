import type { Metadata } from "next";
import Image from "next/image";
import site from "@/data/site.json";
import sponsorsData from "@/data/sponsors.json";
import { PageShell, Block } from "@/components/PageShell";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support Georgia Southern Men's Lacrosse — donate, or sponsor the club. Sponsorship packages from $100.",
};

type Sponsor = { name: string; tier?: string; url?: string; image?: string; note?: string };
type Pkg = { name: string; price: string; perks: string[]; featured?: boolean };

export default function SupportPage() {
  const sponsors = sponsorsData.sponsors as Sponsor[];
  const packages = sponsorsData.packages as Pkg[];

  return (
    <PageShell title="Support the team">
      {/* Donate */}
      <Block label="Donate">
        <p style={{ color: "var(--text-muted)", maxWidth: "54ch" }}>
          Club lacrosse is player-funded. Dues don&rsquo;t cover everything — league fees, referees,
          travel to conference games, and equipment all come out of what the team raises. Anything helps.
        </p>
        <a
          href={site.links.gofundme}
          target="_blank"
          rel="noopener noreferrer"
          className="display mt-5 inline-flex cursor-pointer items-center gap-2 px-6 transition-colors duration-200 hover:bg-[var(--gs-gold)]"
          style={{ minHeight: 48, background: "var(--gs-white)", color: "var(--text-on-light)", letterSpacing: "0.12em" }}
        >
          Donate on GoFundMe
          <ArrowIcon />
        </a>
      </Block>

      {/* Sponsorship packages */}
      <Block label="Sponsorship packages">
        <p className="mb-4" style={{ color: "var(--text-muted)", maxWidth: "54ch" }}>
          Put your business in front of the Georgia Southern community. Every level gets your name out;
          higher tiers land on the home-game banner, gameday graphics, and players&rsquo; helmets.
        </p>
        <div className="mb-5 grid grid-cols-1 gap-[var(--gap-panel)] sm:grid-cols-2">
          <Image
            src="/brand/photos/sponsor-interested.png"
            alt="Interested in sponsoring GSU Lacrosse?"
            width={761}
            height={760}
            className="h-auto w-full"
            style={{ border: "1px solid var(--rule-faint)" }}
          />
          <Image
            src="/brand/photos/sponsor-packages.png"
            alt="GSU Lacrosse sponsorship packages"
            width={811}
            height={805}
            className="h-auto w-full"
            style={{ border: "1px solid var(--rule-faint)" }}
          />
        </div>
        <div className="grid grid-cols-1 gap-[var(--gap-panel)] sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className="flex flex-col p-5"
              style={{
                border: p.featured ? "1px solid var(--rule-gold)" : "1px solid var(--rule-faint)",
                background: p.featured ? "rgba(168,140,92,0.08)" : "transparent",
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="display" style={{ fontSize: "var(--step-tile)" }}>
                  {p.name}
                </span>
                <span className="numeral" style={{ fontSize: "var(--step-tile)", color: "var(--gs-gold)" }}>
                  {p.price}
                </span>
              </div>
              <ul className="mt-3 flex flex-col gap-2">
                {p.perks.map((perk, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                    style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--gs-gold)" }}>
                      —
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-5" style={{ color: "var(--text-muted)", fontSize: "var(--step-small)", maxWidth: "60ch" }}>
          {sponsorsData.bannerDeadline}
        </p>

        <a
          href={`mailto:${site.email}?subject=GSU%20Lacrosse%20Sponsorship`}
          className="display mt-5 inline-flex cursor-pointer items-center gap-2 px-6 transition-colors duration-200 hover:bg-[var(--gs-gold)]"
          style={{ minHeight: 48, background: "var(--gs-white)", color: "var(--text-on-light)", letterSpacing: "0.12em" }}
        >
          Become a sponsor
          <ArrowIcon />
        </a>
      </Block>

      {/* Current sponsors */}
      {sponsors.length > 0 && (
        <Block label="Our sponsors">
          <div className="grid grid-cols-1 gap-[var(--gap-panel)] sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="flex flex-col"
                style={{ border: "1px solid var(--rule-faint)" }}
              >
                {s.image && (
                  <a href={s.url || undefined} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                    <Image
                      src={s.image}
                      alt={s.name}
                      width={657}
                      height={817}
                      className="h-auto w-full"
                    />
                  </a>
                )}
                <div className="p-4">
                  <p className="display" style={{ fontSize: "var(--step-tile)" }}>
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer transition-colors duration-200 hover:text-[var(--gs-gold)]"
                      >
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                  </p>
                  {s.note && (
                    <p className="mt-1" style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>
                      {s.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4" style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>
            Thank you to the businesses backing GS Lacrosse.
          </p>
        </Block>
      )}
    </PageShell>
  );
}
