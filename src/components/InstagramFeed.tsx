import site from "@/data/site.json";
import { InstagramIcon, ArrowIcon } from "./icons";

type Sized = { mediaUrl: string };
type BeholdPost = {
  id: string;
  permalink: string;
  prunedCaption?: string;
  caption?: string;
  mediaType: string;
  sizes?: { small?: Sized; medium?: Sized; large?: Sized; full?: Sized };
  mediaUrl?: string;
};
type BeholdFeed = {
  username?: string;
  followersCount?: number;
  posts?: BeholdPost[];
};

/**
 * Live Instagram grid, rendered from Behold's JSON feed (behold.so, connected
 * to @gsueagleslax). Server-fetched and revalidated hourly, so it stays fresh
 * without a rebuild and ships as plain HTML — no third-party script on the
 * page. If the feed is unset or unreachable, the whole section just hides.
 */
export default async function InstagramFeed() {
  const feedId = site.links.beholdFeedId;
  if (!feedId) return null;

  let feed: BeholdFeed | null = null;
  try {
    const res = await fetch(`https://feeds.behold.so/${feedId}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) feed = (await res.json()) as BeholdFeed;
  } catch {
    /* network hiccup — section simply doesn't render */
  }

  const posts = feed?.posts?.slice(0, 6) ?? [];
  if (posts.length === 0) return null;

  const imgOf = (p: BeholdPost) =>
    p.sizes?.medium?.mediaUrl ||
    p.sizes?.small?.mediaUrl ||
    p.sizes?.large?.mediaUrl ||
    p.mediaUrl ||
    "";

  return (
    <section className="rise py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3" style={{ borderBottom: "1px solid var(--rule-gold)" }}>
        <h2 className="kicker" style={{ borderBottom: "none", paddingBottom: 0 }}>
          From Instagram
        </h2>
        <a
          href={site.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="display inline-flex cursor-pointer items-center gap-2 transition-colors duration-200 hover:text-[var(--gs-gold)]"
          style={{ fontSize: "0.8rem", letterSpacing: "0.1em" }}
        >
          <InstagramIcon />
          @{feed?.username ?? "gsueagleslax"}
          {feed?.followersCount ? (
            <span style={{ color: "var(--gs-gold)" }}>
              · {feed.followersCount.toLocaleString()} followers
            </span>
          ) : null}
          <ArrowIcon />
        </a>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-[var(--gap-panel)] sm:grid-cols-3 lg:grid-cols-6">
        {posts.map((p) => {
          const src = imgOf(p);
          if (!src) return null;
          return (
            <a
              key={p.id}
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden"
              style={{ aspectRatio: "1 / 1", border: "1px solid var(--rule-faint)" }}
              aria-label={p.prunedCaption ? p.prunedCaption.slice(0, 80) : "Instagram post"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={p.prunedCaption ? p.prunedCaption.slice(0, 80) : "Instagram post"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: "rgba(1,20,44,0.35)" }}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
