// components/ui/page-card.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PageCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { y: 80 },
      {
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top 40%",
          scrub: 1,
        },
      }
    );

    const st = tween.scrollTrigger;
    return () => {
      tween.kill();
      st?.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 bg-background"
      style={{
        borderRadius: "40px 40px 0 0",
        boxShadow: "0 -40px 100px -20px rgba(0,0,0,0.18), 0 -2px 0 rgba(0,0,0,0.04)",
        marginTop: "-60px",
      }}
    >
      {children}
    </div>
  );
}
