import type { Metadata } from "next";
import Image from "next/image";
import site from "@/data/site.json";
import events from "@/data/events.json";
import { PageShell, Block } from "@/components/PageShell";
import { ArrowIcon } from "@/components/icons";

type EventItem = { title: string; date: string; time?: string; location?: string; detail?: string };
const fmtEvent = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export const metadata: Metadata = {
  title: "Join",
  description:
    "Play club lacrosse at Georgia Southern. Open to all students, no experience required. Dues, practice schedule, and how to join.",
};

const facts = [
  { label: "Who", value: "Open to all Georgia Southern students" },
  { label: "Experience", value: "None required — beginners welcome" },
  { label: "Practice", value: "Tuesday, Wednesday & Thursday · 7–9 PM" },
  { label: "Tryouts", value: "Held at the start of the season" },
];

const dues = [
  { who: "Returning players", price: "$1,200" },
  { who: "New players", price: "$1,600" },
];

const openings = [
  { role: "Head Coach", detail: "Lead the program on and off the field." },
  { role: "Assistant Coach", detail: "Support coaching and player development." },
  { role: "Media Team", detail: "In-game photo & video." },
];

export default function JoinPage() {
  return (
    <PageShell
      title="Join the team"
      intro="Georgia Southern Men's Lacrosse is open to every student — experienced players and total beginners alike."
    >
      {/* Interest meeting — highlighted at the top */}
      {(events.items as EventItem[]).slice(0, 1).map((e) => (
        <section
          key={e.title}
          className="rise p-6"
          style={{ border: "1px solid var(--rule-gold)", background: "rgba(168,140,92,0.08)" }}
        >
          <p className="kicker">Don&rsquo;t miss it</p>
          <h2 className="display mt-1" style={{ fontSize: "var(--step-title)" }}>
            {e.title}
          </h2>
          <p className="numeral mt-2" style={{ fontSize: "var(--step-tile)", color: "var(--gs-gold)" }}>
            {fmtEvent(e.date)}
            {e.time ? ` · ${e.time}` : ""}
          </p>
          {e.location && (
            <p className="mt-1" style={{ fontSize: "var(--step-body)" }}>
              {e.location}
            </p>
          )}
          {e.detail && (
            <p className="mt-2" style={{ color: "var(--text-muted)", maxWidth: "56ch" }}>
              {e.detail}
            </p>
          )}
        </section>
      ))}

      {/* Play */}
      <Block label="Play for GS">
        <div className="mt-1">
          <ul>
            {facts.map((f, i) => (
              <li
                key={f.label}
                className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
                style={{ borderBottom: "1px solid var(--rule-faint)", borderTop: i === 0 ? "none" : undefined }}
              >
                <span
                  className="display"
                  style={{ minWidth: "9rem", fontSize: "0.72rem", letterSpacing: "0.16em", color: "var(--gs-gold)" }}
                >
                  {f.label}
                </span>
                <span className="flex-1" style={{ fontSize: "var(--step-body)" }}>
                  {f.value}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={site.links.interestForm}
            target="_blank"
            rel="noopener noreferrer"
            className="display mt-6 inline-flex cursor-pointer items-center gap-2.5 px-7 transition-colors duration-200 hover:bg-[var(--gs-gold)]"
            style={{
              minHeight: 48,
              background: "var(--gs-white)",
              color: "var(--text-on-light)",
              letterSpacing: "0.14em",
            }}
          >
            Fill out the interest form
            <ArrowIcon />
          </a>
        </div>
      </Block>

      {/* Dues */}
      <Block label="Dues">
        <ul className="mt-1">
          {dues.map((d) => (
            <li
              key={d.who}
              className="flex items-baseline justify-between gap-4 py-3"
              style={{ borderBottom: "1px solid var(--rule-faint)" }}
            >
              <span className="display" style={{ fontSize: "var(--step-body)" }}>
                {d.who}
              </span>
              <span className="numeral" style={{ fontSize: "var(--step-title)", color: "var(--gs-gold)" }}>
                {d.price}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3" style={{ color: "var(--text-muted)", fontSize: "var(--step-small)", maxWidth: "56ch" }}>
          Dues cover league and conference fees, referees, travel, and equipment. Reach out if cost is a
          barrier — we want you on the field.
        </p>
      </Block>

      {/* Staff / media openings */}
      <Block label="We're hiring">
        <Image
          src="/brand/photos/hiring-in-search-of.png"
          alt="GSU Lacrosse in search of a Head Coach, Assistant Coach, and Media Team"
          width={805}
          height={807}
          className="mb-5 h-auto w-full max-w-[520px]"
          style={{ border: "1px solid var(--rule-faint)" }}
        />
        <p className="mt-1" style={{ color: "var(--text-muted)", maxWidth: "56ch" }}>
          The program is expanding its staff for the upcoming season. Interested? Send your name and
          résumé using any method below.
        </p>
        <ul className="mt-3">
          {openings.map((o) => (
            <li
              key={o.role}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
              style={{ borderBottom: "1px solid var(--rule-faint)" }}
            >
              <span className="display flex-1" style={{ fontSize: "var(--step-tile)", minWidth: "12rem" }}>
                {o.role}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>{o.detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col gap-1" style={{ fontSize: "var(--step-small)" }}>
          <span style={{ color: "var(--text-muted)" }}>
            DM{" "}
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer underline transition-colors duration-200 hover:text-[var(--gs-gold)]"
              style={{ color: "var(--text-primary)" }}
            >
              @gsueagleslax
            </a>{" "}
            · Text (678) 977-9886 · Email{" "}
            <a
              href={`mailto:${site.email}`}
              className="cursor-pointer underline transition-colors duration-200 hover:text-[var(--gs-gold)]"
              style={{ color: "var(--text-primary)" }}
            >
              {site.email}
            </a>
          </span>
        </div>
      </Block>
    </PageShell>
  );
}
