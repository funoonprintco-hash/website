import type { Metadata } from "next";
import { site } from "@/lib/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: title.includes(site.name) ? title : `${title} | ${site.name}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Funoon FZC — Made to be seen.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
