"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"
import { BrandButton } from "@/components/brand-button"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          aria-label="Funoon Print Co. home"
          className={cn("flex items-center transition-all duration-500", scrolled ? "py-3" : "py-5")}
        >
          <Logo variant="dark" priority className={cn("w-auto transition-all duration-500", scrolled ? "h-9" : "h-11")} />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-sans text-[13px] uppercase tracking-[0.14em] transition-colors duration-300",
                  active ? "text-ink" : "text-graphite-mid hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <BrandButton href="/quote" variant="primary" className="px-6 py-3">
            Request a Quote
          </BrandButton>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-ink transition-all duration-300",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-ink transition-all duration-300",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-1 flex-col justify-center gap-2 px-6">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-5xl font-semibold tracking-[-0.02em] text-ink transition-transform duration-500"
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-border px-6 py-8">
          <BrandButton href="/quote" variant="primary" className="mb-6 w-full">
            Request a Quote
          </BrandButton>
          <div className="flex flex-col gap-3 font-sans text-sm text-graphite">
            <a href={site.phoneHref} className="hover:text-ink">
              Call {site.phone}
            </a>
            <a href={site.whatsappHref} className="hover:text-ink">
              WhatsApp
            </a>
            <a href={site.emailHref} className="hover:text-ink">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
