import type { Metadata, Viewport } from "next";
import { DM_Sans, Archivo } from "next/font/google";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { SiteMotion } from "@/components/site-motion";
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Funoon FZC | Corporate Branding, Printing & Merchandise in UAE",
    template: "%s | Funoon FZC",
  },
  description:
    "Corporate printing, packaging, gifts, apparel and merchandise. Funoon FZC helps UAE businesses bring their brand to life through thoughtful physical experiences.",
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Funoon FZC — Made to be seen.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  themeColor: "#101010",
  width: "device-width",
  initialScale: 1,
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.name,
  url: site.url,
  logo: `${site.url}/brand/funoon-wordmark-dark.svg`,
  description: site.positioning,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Block B - B47-009, Sharjah Research Technology and Innovation Park",
    addressLocality: "Sharjah",
    addressCountry: "AE",
  },
  areaServed: "AE",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${archivo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:p-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <SiteMotion />
      </body>
    </html>
  );
}
