"use client";
import { imageSize } from "@/lib/image-size";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const finishes = [
  {
    id: "matte",
    name: "Matte",
    headline: "Quiet. Tactile. Considered.",
    description:
      "A low-sheen surface keeps attention on the artwork. A useful starting point when you want a restrained, understated impression.",
    detail:
      "Discuss the paper stock and how the finished piece will be handled.",
  },
  {
    id: "uv",
    name: "Spot UV",
    headline: "Let the light find the detail.",
    description:
      "Selective gloss creates contrast against a matte surface. A logo, pattern or chosen detail catches the light as the piece moves.",
    detail:
      "Discuss which artwork areas should receive UV, and confirm the effect in a sample.",
  },
  {
    id: "foil",
    name: "Foil",
    headline: "A precise accent. A different presence.",
    description:
      "Reflective foil can bring emphasis to a wordmark or a small design detail. The effect depends on the foil, stock and artwork used.",
    detail:
      "Discuss foil availability and artwork suitability before agreeing the specification.",
  },
];
export function FinishExplorer() {
  const [active, setActive] = useState(0);
  const finish = finishes[active];
  return (
    <section className="finish-explorer dark-surface">
      <div className="shell finish-layout">
        <div className="finish-copy">
          <h2>
            Details you can feel.
            <br />
            Finishes you can see.
          </h2>
          <p>
            Explore how a surface can change the way a brand is experienced.
          </p>
          <div
            className="finish-controls"
            role="group"
            aria-label="Explore print finishes"
          >
            {finishes.map((f, i) => (
              <button
                type="button"
                key={f.id}
                aria-pressed={active === i}
                aria-controls="finish-description"
                onClick={() => setActive(i)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div
            id="finish-description"
            className="finish-description"
            aria-live="polite"
            aria-atomic="true"
          >
            <h3>{finish.headline}</h3>
            <p>{finish.description}</p>
            <p className="finish-detail">{finish.detail}</p>
          </div>
          <Link className="text-link" href="/quote?service=Business%20Cards">
            Discuss your finish
          </Link>
        </div>
        <div
          className={`finish-sample finish-sample-${finish.id}`}
          aria-label={`${finish.name} material illustration`}
        >
          <Image
            src="/work/quality-detail.png"
            alt="Illustrative close-up of paper texture"
            {...imageSize("/work/quality-detail.png")}
            sizes="(max-width:700px) 100vw, 45vw"
          />
          <div className="finish-light" aria-hidden="true" />
          <div className="finish-sample-label">
            <strong>{finish.name}</strong>
            <span>Material illustration · confirm with a sample</span>
          </div>
        </div>
      </div>
    </section>
  );
}
