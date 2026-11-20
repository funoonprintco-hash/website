"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement: server HTML and above-fold content always remain visible.
export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const elements: HTMLElement[] = [];
    const reveal = (element: HTMLElement) => {
      element.dataset.reveal = "visible";
      observer?.unobserve(element);
    };
    const setup = () => {
      observer?.disconnect();
      for (const element of elements) {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      }
      elements.length = 0;
      if (reduced.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        },
        { threshold: 0.08 },
      );
      const targets = document.querySelectorAll<HTMLElement>(
        ".brand-introduction, .section-heading, .solution-tile, .work-card, .detail-list article, .process-list li, .partnership-inner, .project-cta .shell, .solution-row, .catalogue-grid > a, .values-grid article, .page-intro h1, .split-editorial > div",
      );
      for (const element of targets) {
        if (element.getBoundingClientRect().top < window.innerHeight) continue;
        elements.push(element);
        const parent = element.parentElement;
        const stagger = parent?.matches(
          ".solution-grid,.process-list,.catalogue-grid,.values-grid,.work-pair",
        );
        const index = stagger
          ? Array.from(parent!.children).indexOf(element)
          : 0;
        element.style.setProperty("--reveal-delay", `${(index % 3) * 60}ms`);
        element.dataset.reveal = "waiting";
        observer.observe(element);
      }
    };
    const onFocus = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>(
        '[data-reveal="waiting"]',
      );
      if (element) reveal(element);
    };
    setup();
    reduced.addEventListener("change", setup);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      reduced.removeEventListener("change", setup);
      document.removeEventListener("focusin", onFocus);
      for (const element of elements) {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      }
    };
  }, [pathname]);
  return null;
}
