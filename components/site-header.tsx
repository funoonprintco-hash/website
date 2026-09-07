"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, LayoutGroup, AnimatePresence } from "motion/react"
import { Logo } from "@/components/logo"
import { BrandButton } from "@/components/brand-button"
import { nav, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[200] transition-all duration-500",
          scrolled
            ? "border-b border-border bg-background/90 backdrop-blur-md"
            : "border-b border-transparent bg-background/0",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            aria-label="Funoon Print Co. home"
            className={cn("flex items-center transition-all duration-500", scrolled ? "py-3" : "py-4")}
          >
            <Logo
              variant="dark"
              priority
              className={cn("w-auto transition-all duration-500", scrolled ? "h-12" : "h-16")}
            />
          </Link>

          {/* Desktop nav — spring-animated active pill */}
          <LayoutGroup>
            <nav
              className="hidden items-center gap-0.5 lg:flex rounded-full border border-border bg-background px-1.5 py-1.5"
              aria-label="Primary"
            >
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-5 py-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.9 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 font-sans text-[13px] uppercase tracking-[0.14em] transition-colors duration-200",
                        active ? "text-background" : "text-graphite-mid hover:text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                )
              })}
              <BrandButton href="/quote" variant="primary" className="ml-2 px-6 py-2">
                Request a Quote
              </BrandButton>
            </nav>
          </LayoutGroup>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-px w-6 bg-ink origin-center"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-px w-6 bg-ink origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu portal */}
      {mounted && createPortal(
        <div
          aria-hidden={!open}
          className={cn(
            "fixed inset-0 flex flex-col bg-background transition-opacity duration-300 lg:hidden",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          style={{ zIndex: 100 }}
        >
          {/* Nav links — spring stagger */}
          <div className="flex flex-1 flex-col justify-center gap-1 px-8">
            <AnimatePresence>
              {open && nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 28,
                    delay: i * 0.07,
                  }}
                >
                  <Link
                    href={item.href}
                    className="block font-display text-5xl font-semibold tracking-[-0.02em] text-ink py-1.5"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer strip — slides up */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, delay: 0.28 }}
            className="border-t border-border px-8 py-8"
          >
            <BrandButton href="/quote" variant="primary" className="mb-6 w-full">
              Request a Quote
            </BrandButton>
            <div className="flex flex-col gap-3 font-sans text-sm text-graphite">
              <a href={site.phoneHref} className="hover:text-ink">Call {site.phone}</a>
              <a href={site.whatsappHref} className="hover:text-ink">WhatsApp</a>
              <a href={site.emailHref} className="hover:text-ink">{site.email}</a>
            </div>
          </motion.div>
        </div>,
        document.body,
      )}
    </>
  )
}
