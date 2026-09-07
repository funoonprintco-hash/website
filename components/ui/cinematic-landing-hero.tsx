// components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
}

export function CinematicHero({
  tagline1 = "Print that speaks",
  tagline2 = "for itself.",
  className,
  ...props
}: CinematicHeroProps) {
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const textTrackRef = useRef<HTMLHeadingElement>(null);
  const textDaysRef = useRef<HTMLHeadingElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textTrack = textTrackRef.current;
    const textDays = textDaysRef.current;
    const textWrapper = textWrapperRef.current;
    const bgGrid = bgGridRef.current;
    const scrollWrap = scrollWrapRef.current;

    if (!textTrack || !textDays || !textWrapper || !bgGrid || !scrollWrap) return;

    gsap.set(textTrack, { opacity: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
    gsap.set(textDays, { opacity: 0, y: 20 });

    const introTl = gsap.timeline({ delay: 0.4 });
    introTl
      .to(textTrack, { duration: 1.8, opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
      .to(textDays, { duration: 1.4, opacity: 1, y: 0, ease: "power4.inOut" }, "-=1.0");

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollWrap,
        start: "top top",
        end: "+=600",
        scrub: 1,
      },
    });
    scrollTl.to([textWrapper, bgGrid], {
      scale: 1.05,
      filter: "blur(16px)",
      opacity: 0,
      ease: "power2.inOut",
    });

    const scrollST = scrollTl.scrollTrigger;

    return () => {
      introTl.kill();
      scrollTl.kill();
      scrollST?.kill();
    };
  }, []);

  return (
    <div
      ref={scrollWrapRef}
      style={{ height: "150svh" }}
      className={cn("relative bg-background", className)}
      {...props}
    >
      <div className="sticky top-0 z-20 w-screen h-svh overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased">
        <div className="film-grain" aria-hidden="true" />
        <div
          ref={bgGridRef}
          className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50"
          aria-hidden="true"
        />
        <div
          ref={textWrapperRef}
          className="absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4"
        >
          <h1
            ref={textTrackRef}
            className="text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2"
          >
            {tagline1}
          </h1>
          <h1
            ref={textDaysRef}
            className="text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter"
          >
            {tagline2}
          </h1>

        </div>

        {/* Scroll indicator — pinned to the bottom of the sticky viewport */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 scroll-hint">
          <span className="text-[11px] uppercase tracking-[0.22em] text-graphite-mid font-sans">Scroll</span>
          <div className="scroll-arrow text-graphite-mid">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
