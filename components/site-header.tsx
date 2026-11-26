"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { nav, site } from "@/lib/site";
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (open) {
      menuRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      menuRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1250px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  const active = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(href)) ||
    (href === "/products" && pathname.startsWith("/services"));
  return (
    <>
      <header className="site-header site-nav-intro">
        <div className="shell header-inner">
          <Link href="/" aria-label="Funoon FZC home">
            <Logo variant="light" priority />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="button button-white header-quote" href="/quote">
              Request a Quote
            </Link>
            <button
              ref={triggerRef}
              className="menu-toggle"
              aria-label="Open navigation"
              aria-controls="mobile-navigation"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={menuRef}
        id="mobile-navigation"
        className="mobile-menu"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
        aria-label="Navigation"
      >
        <div className="mobile-menu-top">
          <Logo variant="light" />
          <button
            className="menu-close"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <X size={28} />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/quote"
          className="button button-white"
          onClick={() => setOpen(false)}
        >
          Request a Quote
        </Link>
        <a className="mobile-phone" href={site.phoneHref}>
          {site.phone}
        </a>
      </dialog>
    </>
  );
}
