import achievements from "@/data/achievements.json";

type Title = { label: string; years: number[] };
type Postseason = { label: string; years: number[]; note?: string };
type Honoree = { name: string; pos?: string; team?: string };
type AllConfYear = { year: number; honorees: Honoree[] };
type Award = { label: string; recipients: { year: number; name: string }[] };

/**
 * Program honors — every item here is verified against an official MCLA
 * source (see _sources in achievements.json). Nothing invented: no title or
 * award appears unless it's in the record. Empty categories render nothing.
 */
export default function Honors() {
  const titles = (achievements.titles as Title[]).filter((t) => t.years.length > 0);
  const postseason = achievements.postseason as Postseason | undefined;
  const hasPostseason = !!postseason && postseason.years.length > 0;
  const allConf = (achievements.allConference as AllConfYear[]).filter(
    (y) => y.honorees.length > 0,
  );
  // Award recipients are hidden until a name is filled in.
  const awards = (achievements.awards as Award[])
    .map((a) => ({ ...a, recipients: a.recipients.filter((r) => r.name.trim()) }))
    .filter((a) => a.recipients.length > 0);

  if (
    titles.length === 0 &&
    !hasPostseason &&
    allConf.length === 0 &&
    awards.length === 0
  )
    return null;

  const yearRow = (years: number[]) => (
    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
      {years
        .slice()
        .sort((a, b) => b - a)
        .map((y) => (
          <span
            key={y}
            className="numeral"
            style={{ fontSize: "var(--step-title)", color: "var(--gs-gold)" }}
          >
            {y}
          </span>
        ))}
    </div>
  );

  const label = (text: string) => (
    <p
      className="display"
      style={{ fontSize: "0.82rem", letterSpacing: "0.14em", color: "var(--text-muted)" }}
    >
      {text}
    </p>
  );

  return (
    <section className="rise py-8">
      <h2 className="kicker pb-2.5" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
        Program honors
      </h2>

      <div className="mt-5 flex flex-col gap-8">
        {/* Championships (hidden until one exists) */}
        {titles.map((t) => (
          <div key={t.label}>
            {label(t.label)}
            {yearRow(t.years)}
          </div>
        ))}

        {/* Awards (e.g. Coach of the Year) */}
        {awards.map((a) => (
          <div key={a.label}>
            {label(a.label)}
            <ul className="mt-2 flex flex-col gap-1.5">
              {a.recipients
                .slice()
                .sort((x, y) => y.year - x.year)
                .map((r) => (
                  <li key={`${r.year}-${r.name}`} className="flex items-baseline gap-4">
                    <span
                      className="numeral"
                      style={{ fontSize: "var(--step-title)", color: "var(--gs-gold)", minWidth: "4.5rem" }}
                    >
                      {r.year}
                    </span>
                    <span className="display" style={{ fontSize: "var(--step-body)" }}>
                      {r.name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        {/* Postseason run */}
        {hasPostseason && (
          <div>
            {label(postseason!.label)}
            {yearRow(postseason!.years)}
            {postseason!.note && (
              <p className="mt-2" style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>
                {postseason!.note}
              </p>
            )}
          </div>
        )}

        {/* All-Conference honorees */}
        {allConf.length > 0 && (
          <div>
            {label("All-Conference Honorees")}
            <div className="mt-2 flex flex-col gap-5">
              {allConf
                .slice()
                .sort((a, b) => b.year - a.year)
                .map((yr) => (
                  <div key={yr.year}>
                    <p
                      className="numeral"
                      style={{ fontSize: "var(--step-body)", color: "var(--gs-gold)" }}
                    >
                      {yr.year}
                    </p>
                    <ul className="mt-1 flex flex-col gap-1">
                      {yr.honorees.map((h) => (
                        <li
                          key={h.name}
                          className="flex flex-wrap items-baseline gap-x-3"
                          style={{ fontSize: "0.95rem" }}
                        >
                          <span className="display">{h.name}</span>
                          {h.pos && (
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                              {h.pos}
                            </span>
                          )}
                          {h.team && (
                            <span
                              className="display"
                              style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: "var(--gs-gold)" }}
                            >
                              {h.team}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
