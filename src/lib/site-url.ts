/**
 * The site's canonical URL. Used for social-share tags, sitemap, and robots.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project settings once the real
 * domain is connected (e.g. https://gsueagleslax.com). Until then it falls
 * back to the Vercel preview URL, and finally to localhost for dev.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "http://localhost:3000";
