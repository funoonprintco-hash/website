import Link from "next/link"
import { Logo } from "@/components/logo"
import { nav, site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" className="h-20 w-auto" />
            <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-background/60">
              {site.positioning}
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="mb-5 font-sans text-[11px] uppercase tracking-label text-background/40">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-background/80 transition-colors hover:text-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-5 font-sans text-[11px] uppercase tracking-label text-background/40">
              Contact
            </p>
            <ul className="flex flex-col gap-3 font-sans text-sm text-background/80">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-background">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="transition-colors hover:text-background">
                  {site.email}
                </a>
              </li>
              <li className="text-background/60">{site.location}</li>
            </ul>
            <div className="mt-6 flex gap-5">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-background/80 transition-colors hover:text-background"
              >
                Instagram
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-background/80 transition-colors hover:text-background"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="font-sans text-xs text-background/40">
            © 2026 Funoon Print Co. All rights reserved.
          </p>
          <p className="font-sans text-xs uppercase tracking-label text-background/40">
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
