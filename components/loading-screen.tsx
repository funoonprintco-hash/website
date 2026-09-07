"use client"

import { useEffect, useRef } from "react"

const CSS = `
  .ls {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: #F4EFE8;
    overflow: hidden;
    animation: ls-in .22s ease forwards, ls-out .9s ease 5.0s forwards;
  }

  /* Dot grid — suggests design-software workspace */
  .ls::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(140,130,120,.13) .5px, transparent .5px);
    background-size: 18px 18px;
    pointer-events: none;
  }

  /* SVG grain overlay */
  .ls-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    opacity: .038; mix-blend-mode: multiply; pointer-events: none;
  }

  /* ── Print marks ─────────────────────────────── */
  .ls-cm { position: absolute; pointer-events: none; opacity: 0; }
  .ls-cm-tl { top: 18px; left: 18px;  animation: ls-mfade .38s ease .18s forwards; }
  .ls-cm-tr { top: 18px; right: 18px; animation: ls-mfade .38s ease .22s forwards; }
  .ls-cm-bl { bottom: 18px; left: 18px;  animation: ls-mfade .38s ease .26s forwards; }
  .ls-cm-br { bottom: 18px; right: 18px; animation: ls-mfade .38s ease .30s forwards; }

  /* Registration mark — top center */
  .ls-reg {
    position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
    pointer-events: none; opacity: 0;
    animation: ls-mfade .38s ease .36s forwards;
  }

  /* CMYK swatches — bottom right */
  .ls-cmyk {
    position: absolute; bottom: 20px; right: 20px;
    display: flex; gap: 2px; align-items: center;
    pointer-events: none; opacity: 0;
    animation: ls-mfade .38s ease .5s forwards;
  }
  .ls-cmyk-sq { width: 7px; height: 7px; }

  /* Technical label — bottom left */
  .ls-tech {
    position: absolute; bottom: 21px; left: 21px;
    font-family: ui-monospace, monospace;
    font-size: 7px; letter-spacing: .16em;
    color: #B8B0A5; text-transform: uppercase;
    pointer-events: none; opacity: 0;
    animation: ls-mfade .38s ease .5s forwards;
    white-space: nowrap; user-select: none;
  }

  /* ── Logo reveal ─────────────────────────────── */
  .ls-logo-clip {
    position: relative; overflow: hidden;
    animation: ls-reveal 1.8s cubic-bezier(.4,0,.15,1) 1.0s both;
    clip-path: inset(0 100% 0 0);
  }
  .ls-logo-img {
    display: block; height: 84px; width: auto;
  }
  @media (max-width: 640px) { .ls-logo-img { height: 62px; } }

  /* Spot UV gloss shimmer */
  .ls-spot {
    position: absolute; inset: -30% -15%;
    background: linear-gradient(
      108deg,
      transparent 0%,
      transparent 26%,
      rgba(255,255,255,.08) 40%,
      rgba(255,255,255,.52) 50%,
      rgba(255,255,255,.08) 60%,
      transparent 74%,
      transparent 100%
    );
    transform: translateX(-130%) skewX(-6deg);
    animation: ls-spot 1.0s cubic-bezier(.4,0,.2,1) 3.2s forwards;
    pointer-events: none;
  }

  /* Tagline */
  .ls-tag-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    margin-top: 26px; opacity: 0;
    animation: ls-fup .75s ease 3.6s forwards;
  }
  .ls-rule {
    width: 30px; height: .5px;
    background: linear-gradient(to right, transparent, #A09890, transparent);
  }
  .ls-tag {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 9px; letter-spacing: .22em;
    color: #928880; text-transform: uppercase;
    font-weight: 400; margin: 0;
  }

  /* Sweep line */
  .ls-sweep {
    position: absolute; top: 0; bottom: 0; left: -3px; width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(28,20,12,.06) 20%,
      rgba(28,20,12,.22) 50%,
      rgba(28,20,12,.06) 80%,
      transparent 100%
    );
    animation: ls-sweep 1.8s cubic-bezier(.4,0,.15,1) 1.0s forwards;
    filter: blur(.4px); pointer-events: none;
  }

  /* ── Keyframes ───────────────────────────────── */
  @keyframes ls-in    { from { opacity: 0 } to { opacity: 1 } }
  @keyframes ls-out   { from { opacity: 1 } to { opacity: 0 } }
  @keyframes ls-mfade { from { opacity: 0 } to { opacity: 1 } }
  @keyframes ls-reveal {
    from { clip-path: inset(0 100% 0 0) }
    to   { clip-path: inset(0 0%   0 0) }
  }
  @keyframes ls-sweep {
    from { left: -3px }
    to   { left: calc(100% + 3px) }
  }
  @keyframes ls-spot {
    from { transform: translateX(-130%) skewX(-6deg) }
    to   { transform: translateX(170%)  skewX(-6deg) }
  }
  @keyframes ls-fup {
    from { opacity: 0; transform: translateY(5px) }
    to   { opacity: 1; transform: translateY(0)   }
  }

  /* ── Reduced motion ─────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .ls {
      animation: ls-in .3s ease forwards, ls-out .3s ease .45s forwards !important;
    }
    .ls .ls-logo-clip {
      animation: ls-in .3s ease .05s both !important;
      clip-path: none !important;
    }
    .ls .ls-sweep, .ls .ls-spot,
    .ls .ls-cm, .ls .ls-reg,
    .ls .ls-cmyk, .ls .ls-tech { display: none !important; }
    .ls::before { display: none !important; }
    .ls .ls-tag-wrap { animation: ls-in .3s ease .12s forwards !important; }
  }
`

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Remove pointer-events once the fade-out begins so the page is usable
    const tpe = setTimeout(
      () => { if (screenRef.current) screenRef.current.style.pointerEvents = "none" },
      reduced ? 440 : 5000,
    )
    const tdone = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("funoon:loaded"))
      onComplete()
    }, reduced ? 900 : 6100)

    return () => { clearTimeout(tpe); clearTimeout(tdone) }
  }, [onComplete])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        ref={screenRef}
        className="ls"
        role="status"
        aria-label="Loading Funoon Print Co."
        aria-live="polite"
      >
        {/* Paper grain */}
        <svg className="ls-grain" aria-hidden="true">
          <filter id="ls-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#ls-noise)"/>
        </svg>

        {/* Corner crop marks */}
        <div className="ls-cm ls-cm-tl" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <line x1="5" y1="5" x2="21" y2="5" stroke="#C0B8B0" strokeWidth=".75"/>
            <line x1="5" y1="5" x2="5" y2="21" stroke="#C0B8B0" strokeWidth=".75"/>
            <circle cx="5" cy="5" r="1.4" fill="none" stroke="#C0B8B0" strokeWidth=".75"/>
          </svg>
        </div>
        <div className="ls-cm ls-cm-tr" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <line x1="21" y1="5" x2="5" y2="5" stroke="#C0B8B0" strokeWidth=".75"/>
            <line x1="21" y1="5" x2="21" y2="21" stroke="#C0B8B0" strokeWidth=".75"/>
            <circle cx="21" cy="5" r="1.4" fill="none" stroke="#C0B8B0" strokeWidth=".75"/>
          </svg>
        </div>
        <div className="ls-cm ls-cm-bl" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <line x1="5" y1="21" x2="21" y2="21" stroke="#C0B8B0" strokeWidth=".75"/>
            <line x1="5" y1="21" x2="5" y2="5"  stroke="#C0B8B0" strokeWidth=".75"/>
            <circle cx="5" cy="21" r="1.4" fill="none" stroke="#C0B8B0" strokeWidth=".75"/>
          </svg>
        </div>
        <div className="ls-cm ls-cm-br" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <line x1="21" y1="21" x2="5"  y2="21" stroke="#C0B8B0" strokeWidth=".75"/>
            <line x1="21" y1="21" x2="21" y2="5"  stroke="#C0B8B0" strokeWidth=".75"/>
            <circle cx="21" cy="21" r="1.4" fill="none" stroke="#C0B8B0" strokeWidth=".75"/>
          </svg>
        </div>

        {/* Registration mark — top center */}
        <div className="ls-reg" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8"  stroke="#C0B8B0" strokeWidth=".75"/>
            <circle cx="10" cy="10" r="3"  stroke="#C0B8B0" strokeWidth=".75"/>
            <circle cx="10" cy="10" r=".9" fill="#C0B8B0"/>
            <line x1="0" y1="10" x2="20" y2="10" stroke="#C0B8B0" strokeWidth=".75"/>
            <line x1="10" y1="0"  x2="10" y2="20" stroke="#C0B8B0" strokeWidth=".75"/>
          </svg>
        </div>

        {/* CMYK colour bar */}
        <div className="ls-cmyk" aria-hidden="true">
          <div className="ls-cmyk-sq" style={{ background: "#00B4D8", opacity: .5 }}/>
          <div className="ls-cmyk-sq" style={{ background: "#E91E8C", opacity: .5 }}/>
          <div className="ls-cmyk-sq" style={{ background: "#F7C325", opacity: .5 }}/>
          <div className="ls-cmyk-sq" style={{ background: "#1A1A1A", opacity: .5 }}/>
        </div>

        {/* Technical label */}
        <div className="ls-tech" aria-hidden="true">CMYK · 300 DPI · Offset</div>

        {/* ── Centre stage ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Logo revealed by ink sweep */}
          <div className="ls-logo-clip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/funoon-logo-dark.svg"
              alt="Funoon Print Co."
              className="ls-logo-img"
            />
            {/* Spot UV gloss pass */}
            <div className="ls-spot" aria-hidden="true"/>
          </div>

          {/* Tagline */}
          <div className="ls-tag-wrap" aria-hidden="true">
            <div className="ls-rule"/>
            <p className="ls-tag">Premium Printing &amp; Corporate Branding</p>
          </div>
        </div>

        {/* Ink sweep line */}
        <div className="ls-sweep" aria-hidden="true"/>
      </div>
    </>
  )
}
