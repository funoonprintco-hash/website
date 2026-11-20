"use client"

import Script from "next/script"
import type React from "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        "auto-rotate"?: boolean | string
        "camera-controls"?: boolean | string
        "shadow-intensity"?: string
        "camera-orbit"?: string
        "field-of-view"?: string
        exposure?: string
        "rotation-per-second"?: string
        style?: React.CSSProperties
        ar?: boolean | string
      }
    }
  }
}

export function Logo3D() {
  return (
    <>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        type="module"
        strategy="lazyOnload"
      />
      <model-viewer
        src="/funoon-business-card.glb"
        alt="Funoon FZC business card 3D"
        auto-rotate
        camera-controls
        shadow-intensity="1.5"
        exposure="1.5"
        rotation-per-second="20deg"
        camera-orbit="180deg 80deg 105%"
        field-of-view="45deg"
        style={{ width: "100%", height: "500px", background: "transparent" }}
      />
    </>
  )
}
