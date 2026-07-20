import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { NAV } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...NAV.map((n) => n.href)];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
