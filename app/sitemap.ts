import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { workItems } from "@/lib/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/solutions",
    "/products",
    "/work",
    "/case-studies",
    "/about",
    "/contact",
    "/quote",
    "/privacy",
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...services.map((s) => `/products/${s.slug}`),
    ...workItems.map((w) => `/work/${w.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
