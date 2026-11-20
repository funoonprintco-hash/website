import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, site } from "@/lib/site";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Logo variant="light" />
            <p className="footer-tagline">
              Made to be seen.
              <br />
              Made to represent you.
            </p>
          </div>
          <div className="footer-links">
            <h2>Explore</h2>
            {nav
              .filter((n) => n.href !== "/")
              .map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
          </div>
          <div className="footer-contact">
            <h2>Let’s talk.</h2>
            <a href={site.emailHref}>{site.email}</a>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.whatsappHref}>WhatsApp</a>
            <address>{site.address}</address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <span>Sharjah, UAE · Serving businesses across the Emirates</span>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
