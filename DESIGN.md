---
name: Funoon FZC
description: Monochrome corporate editorial design, led by physical work.
colors:
  ink: "#111"
  dark-surface: "#101010"
  white: "#fff"
  graphite: "#333"
  muted: "#666"
  border: "#dedede"
  offwhite: "#f5f5f5"
  paper: "#f3f3f1"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.8rem, 6.8vw, 6rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
rounded:
  control: "2px"
  photo: "6px"
  hero-photo: "8px"
spacing:
  small: "8px"
  medium: "16px"
  regular: "24px"
  large: "32px"
components:
  button-black:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-outline-white:
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
---

# Design System: Funoon FZC

## Overview

**Creative North Star: "Corporate editorial"**

The user-pinned direction pairs a high-impact black opening with white editorial sections, restrained monochrome typography and product-led compositions. Contrast, whitespace and physical work establish confidence. Preserve the official six-bar symbol and wordmark with the approved FZC suffix treatment.

**Key Characteristics:**
- Monochrome surfaces and graphite text.
- Compact display typography with generous editorial space.
- Straight controls and softly finished photographic frames.
- Sequenced entrances and restrained interactive feedback.

## Colors

Ink and white carry the primary contrast; graphite shades establish hierarchy. Offwhite and paper separate supporting sections without ornamental containers. Photography carries its own subject colours.

**The Monochrome Rule.** Keep the brand interface monochrome; do not introduce decorative colour accents.

## Typography

Archivo supplies balanced display headings; DM Sans supplies body copy and controls. Retain this pairing unless licensed Etna is supplied and an explicit change is approved. General heading roles follow the frontmatter; paragraphs cap at 70ch. Supporting card descriptions currently use 14–15px, while primary prose starts at 16px.

The homepage hero is a deliberate display variant: 700 weight, 0.99 line height, and a desktop clamp from 3.5rem to 6rem. Its mobile clamp is 2.65rem to 4rem. It uses three clipped lines with the middle line muted. Do not turn this exact composition into a requirement for every page.

## Layout

The main shell caps at 1440px, with 56px side gutters on large screens, 32px below 1100px and 20px at 700px and below. Standard section spacing steps from 110px to 80px to 60px at those breakpoints. Paired editorial layouts become stacked mobile sections; portfolio photography remains prominent.

The current homepage category composition uses two lead panels, three smaller panels and a full-width custom-merchandise row on large screens. On mobile the lead panels span the width and the remaining categories use two columns. This is a homepage composition, not a universal grid requirement.

## Elevation & Depth

The system is flat. Tonal section backgrounds, fine separators, image scale and generous space establish hierarchy. There are no elevated card shadows. A restrained text shadow supports captions over the hero photograph only.

## Shapes

**The Architectural Edge Rule.** Keep layout and controls straight; soften photographs rather than entire sections.

Buttons have minimal control rounding. Product and portfolio image frames use the photo radius; the hero uses the larger photo radius on desktop and the smaller radius on mobile. Fields are square. The circular marquee pause control is a functional exception, not a general pill-button style.

## Components

Buttons use solid black, solid white or fine outlined variants, a 52px minimum height and 14px medium text. Hover changes tone in 180ms; press scales to 0.97 in 160ms. Text links use a single underline that shortens on fine-pointer hover. Keyboard focus uses a 2px current-colour outline offset by 5px.

Cards pair photographs with unboxed captions. Portfolio and product-detail imagery is contained; the homepage hero and category images use cover cropping. Concepts carry visible concept labels; approved Maxline work carries completed-work labels. The hero currently uses a temporary packaging concept pending the user's own business-card photograph; replace source, alt text and caption together.

Form fields use white fill, a fine grey border, 14px padding and a 52px minimum height. Textareas allow vertical resizing. Focus darkens the border; invalid fields are identified by a message and an invalid state.

The sticky dark header uses quiet links with a white current-page underline. Below 1100px, native full-screen dialog navigation replaces desktop links. Its opacity and 12px vertical entrance transition take 250ms. FAQs use native disclosures with fine separators.

**The Progressive Motion Rule.** Reveal content once without making access depend on animation or JavaScript.

The header settles over 500ms, then hero lines rise over 1000ms with an 80ms stagger. Supporting hero copy fades from 800ms and the image settles over 1200ms. Below-fold content reveals over 700ms from 28px below; grouped cards use 60ms steps, capped at 120ms. Initially visible content stays available, and keyboard focus immediately reveals a waiting target. Product photographs scale to 1.04 on fine-pointer hover over 650ms.

The category marquee travels over 38s, with a labelled pause/play control and hover pause. Reduced motion disables animation and transitions, restores visible content, and displays one static, wrapped category sequence. The shared expressive easing is cubic-bezier(0.23, 1, 0.32, 1).

## Do's and Don'ts

### Do:
- Do preserve the official mark and approved FZC treatment.
- Do distinguish product concepts from approved completed work.
- Do retain visible keyboard focus and reduced-motion support.
- Do use whitespace, typography and photography to establish hierarchy.

### Don't:
- Don't introduce decorative glass, gradients or background grids.
- Don't invent clients, results, testimonials or production specifications.
- Don't generalize the temporary hero image into a permanent brand requirement.
