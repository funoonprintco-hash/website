import { ImageResponse } from "next/og";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Funoon FZC — Your brand. Made to be seen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logoSource = await readFile(
    join(process.cwd(), "public/brand/funoon-wordmark-light.svg"),
  );
  const logo = (await sharp(logoSource).resize(260).png().toBuffer()).toString("base64");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "60px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={`data:image/png;base64,${logo}`}
          width={130}
          height={79}
          alt=""
        />
        <div style={{ fontSize: 24 }}>FUNOON FZC</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.05,
          marginTop: 50,
        }}
      >
        <span>YOUR BRAND.</span>
        <span>MADE TO BE SEEN.</span>
      </div>
      <div style={{ fontSize: 23, color: "#bbb", marginTop: 40 }}>
        Corporate branding · Print · Packaging · Merchandise
      </div>
    </div>,
    size,
  );
}
