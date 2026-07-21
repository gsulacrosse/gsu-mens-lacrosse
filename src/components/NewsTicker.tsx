import Link from "next/link";
import news from "@/data/news.json";

type Item = { text: string; href?: string };

/**
 * Broadcast-style news crawl. Items scroll right-to-left and loop seamlessly
 * (the list is duplicated so there's no gap at the wrap). Pauses on hover.
 * Reduced-motion users get a static, wrapping list instead of a crawl.
 *
 * Content lives in src/data/news.json.
 */
export default function NewsTicker() {
  const items = news.items as Item[];
  if (items.length === 0) return null;

  const Piece = ({ item }: { item: Item }) => {
    const body = <span className="ticker-text">{item.text}</span>;
    return (
      <span className="ticker-item">
        {item.href ? (
          <Link href={item.href} className="ticker-link">
            {body}
          </Link>
        ) : (
          body
        )}
        <span className="ticker-sep" aria-hidden="true">
          ◆
        </span>
      </span>
    );
  };

  return (
    <section className="ticker" aria-label="Latest news">
      <span className="ticker-tag">
        <span className="ticker-live" aria-hidden="true" />
        News
      </span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {items.map((it, i) => (
            <Piece key={`a-${i}`} item={it} />
          ))}
          {/* duplicate for a seamless loop */}
          {items.map((it, i) => (
            <Piece key={`b-${i}`} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
