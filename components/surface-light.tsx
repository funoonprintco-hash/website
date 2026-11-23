"use client";
import { useEffect, useRef } from "react";
export function SurfaceLight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const light = root.querySelector<HTMLElement>(".surface-light-beam");
    if (!light) return;
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let x = 0;
    let y = 0;
    const move = (event: PointerEvent) => {
      if (!media.matches) return;
      const bounds = root.getBoundingClientRect();
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
      root.dataset.lit = "true";
      if (!frame)
        frame = requestAnimationFrame(() => {
          light.style.transform = `translate(${x - 180}px, ${y - 180}px)`;
          frame = 0;
        });
    };
    const leave = () => {
      delete root.dataset.lit;
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    media.addEventListener("change", leave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      media.removeEventListener("change", leave);
    };
  }, []);
  return (
    <div className={`surface-light ${className}`} ref={ref}>
      {children}
      <div className="surface-light-beam" aria-hidden="true" />
    </div>
  );
}
