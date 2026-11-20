"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
export function BrandMarquee() {
  const [paused, setPaused] = useState(false);
  const words = ["Print.", "Packaging.", "Gifts.", "Apparel.", "Merchandise."];
  return (
    <div
      className="brand-marquee"
      aria-label="Print, packaging, gifts, apparel and merchandise"
    >
      <div className="marquee-window" aria-hidden="true">
        <div
          className="marquee-track"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {[0, 1].map((copy) => (
            <div className="marquee-copy" key={copy}>
              {words.map((word, i) => (
                <span className={i % 2 ? "marquee-outline" : ""} key={word}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="marquee-control"
        aria-label={paused ? "Play moving text" : "Pause moving text"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </div>
  );
}
