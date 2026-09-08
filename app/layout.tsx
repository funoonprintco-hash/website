import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Archivo } from "next/font/google"
import { site } from "@/lib/site"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://funoonprintco.com"),
  title: {
    default: "Funoon Print Co. | Premium Printing & Corporate Branding in UAE",
    template: "%s | Funoon Print Co.",
  },
  description:
    "Funoon Print Co. provides premium printing and branded materials for businesses in Sharjah and across the UAE, including business cards, corporate gifts, brochures, packaging, apparel and more.",
  keywords: [
    "premium printing Sharjah",
    "printing company Sharjah",
    "corporate printing UAE",
    "business cards Sharjah",
    "corporate gifts UAE",
    "brochure printing UAE",
    "packaging printing UAE",
    "corporate apparel UAE",
  ],
  authors: [{ name: "Funoon Print Co." }],
  openGraph: {
    type: "website",
    locale: "en_AE",
    title: "Funoon Print Co. | Premium Printing & Corporate Branding in UAE",
    description:
      "Premium printing and branded materials for businesses that care about every detail. Sharjah, UAE.",
    siteName: "Funoon Print Co.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Funoon Print Co. — Premium Printing & Corporate Branding in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Funoon Print Co. | Premium Printing & Corporate Branding in UAE",
    description:
      "Premium printing and branded materials for businesses that care about every detail. Sharjah, UAE.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Funoon Print Co.",
  description: "Premium Printing & Corporate Branding",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sharjah",
    addressCountry: "AE",
  },
  areaServed: "AE",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${archivo.variable} bg-background`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-background focus:outline-none"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
