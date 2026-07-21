import Image from "next/image";
import site from "@/data/site.json";
import { InstagramIcon, FacebookIcon, TikTokIcon, MailIcon } from "./icons";

/**
 * Socials are filtered on `url` being non-empty, so an unconfirmed handle
 * (TikTok) simply doesn't render rather than shipping a dead link.
 */
export default function SiteFooter() {
  const socials = [
    { name: "Instagram", url: site.links.instagram, Icon: InstagramIcon },
    { name: "Facebook", url: site.links.facebook, Icon: FacebookIcon },
    { name: "TikTok", url: site.links.tiktok, Icon: TikTokIcon },
  ].filter((s) => s.url);

  return (
    <footer style={{ zIndex: "var(--z-content)" }}>
      <div
        className="shell py-8"
        style={{ borderTop: "1px solid var(--rule-gold)" }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Image
              src="/brand/wordmark-eagle.png"
              alt={site.teamName}
              width={220}
              height={130}
              className="mb-3 h-auto w-[150px]"
            />
            <p style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>
              Est. {site.established} · {site.league} · {site.conference}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}>
              {site.homeVenue} · {site.city}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${site.email}`}
              className="flex cursor-pointer items-center gap-2 transition-colors duration-200 hover:text-[var(--gs-gold)]"
              style={{ minHeight: 44 }}
            >
              <MailIcon />
              <span style={{ fontSize: "var(--step-small)" }}>{site.email}</span>
            </a>

            <div className="flex gap-2">
              {socials.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.shortName} on ${name}`}
                  className="flex cursor-pointer items-center justify-center transition-colors duration-200 hover:text-[var(--gs-gold)]"
                  style={{
                    minWidth: 44,
                    minHeight: 44,
                    border: "1px solid var(--rule-faint)",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p
          className="rule-gold mt-6 pt-4"
          style={{ color: "var(--text-muted)", fontSize: "var(--step-small)" }}
        >
          Georgia Southern University · Statesboro, Georgia
        </p>
      </div>
    </footer>
  );
}
