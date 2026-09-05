import sharp from "sharp"

// Convert a solid-background logo into a transparent-artwork PNG.
// mode "dark": keep dark artwork (for light backgrounds), drop white bg.
// mode "light": keep light artwork (for dark backgrounds), drop black bg.
async function process(src, out, mode) {
  const trimmed = await sharp(src).trim({ threshold: 20 }).toBuffer()
  const img = sharp(trimmed)
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const px = Buffer.from(data)
  for (let i = 0; i < px.length; i += channels) {
    const r = px[i]
    const g = px[i + 1]
    const b = px[i + 2]
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    if (mode === "dark") {
      // black artwork on white -> alpha from darkness
      px[i] = 0
      px[i + 1] = 0
      px[i + 2] = 0
      px[i + 3] = Math.round(255 - lum)
    } else {
      // white artwork on black -> alpha from brightness
      px[i] = 255
      px[i + 1] = 255
      px[i + 2] = 255
      px[i + 3] = Math.round(lum)
    }
  }

  await sharp(px, { raw: { width, height, channels } })
    .png()
    .toFile(out)
  console.log("wrote", out, width, "x", height)
}

await process("public/brand/funoon-black-src.png", "public/brand/funoon-logo-dark.png", "dark")
await process("public/brand/funoon-white-src.png", "public/brand/funoon-logo-light.png", "light")
