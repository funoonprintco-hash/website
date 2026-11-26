# Printed card → e-card demonstration

## Direction contract
THESIS: Make a printed introduction visibly connect to a working employee contact card.
OWN-WORLD: Existing Archivo/DM Sans monochrome editorial system, original Funoon wordmark and exact six-bar symbol from the live e-card.
STORY: See the card, simulate a scan, try contact actions, enquire for a team.
FIRST VIEWPORT: Clear offer followed by printed card left, phone right; stacked on mobile. Primary action beside the printed card.
FORM: User-pinned composition; code-led extension of the existing website.
FINISH: Reviewed against the brief and the established design world; this document records the surface-specific decisions. Existing DESIGN.md remains authoritative and unchanged. No new raster assets ship.

## Implementation
/ecard-demo is the interactive product demonstration. The existing personal builder, inbox capture and optional marketing consent remain at /ecard-demo/create. Business-card and corporate-branding offerings link to the demonstration. Team CTA preselects Employee business cards + digital e-cards in the existing quote flow.

Reference: https://farzeel.funoonprintco.com/ (read-only). HTML card uses supplied details because the approved photograph contains placeholder contact information and a different QR. Original Logo component is reused. Preview preserves monochrome identity, name typography and signature, with a finite stagger of the exact live SVG bars. All six contact actions are real; no camera access, account permission or automatic-save claim.

## Surface and interaction

The Archivo/DM Sans page pairs a lightly tilted printed card with a framed, internally scrollable phone preview and connecting arrow. The card's restrained shadow and rounded phone frame represent physical objects; they do not change the site's flat editorial system. Below 700px the pair stacks, the arrow points down and benefits become a single column. Three benefits lead to a dark team-enquiry section, followed by the personal-builder link.

The QR button and “Try the experience” start an 850ms simulated scan, then reveal the contact card. Keyboard activation and reduced motion open it immediately. The contact heading receives focus, a status message explains the state, and Replay returns to the introduction. Save Contact downloads the vCard; the five other captioned actions use the supplied destinations. HTTPS destinations open securely in new tabs.

The reveal lasts 250ms; the six original bars enter once over 500ms with 60ms stagger. Reduced motion disables animation, transitions and tilt. Primary controls meet the 48px target requirement. Focus outlines are dark against light surfaces and white in the dark conversion section.

## Assets and verification

Assets: farzeel-qr.svg generated locally using node-qrcode, error correction M, four-module quiet zone, exact URL https://farzeel.funoonprintco.com/. No QR runtime dependency. Farzeel-Fazir.vcf copied from the live e-card without altering its fields. Mark geometry copied from the live page SVG symbol. No generated photography.

Validation: QR independently decoded using jsQR after SVG rasterization. vCard 3.0 fields checked. Production build and existing seven tests passed. Playwright desktop1440/mobile390 checks cover scan, replay, reduced motion, action destinations, vCard filename, no overflow and quote service preselection. The original live e-card is unchanged.

Finish review found focus contrast as the remaining issue; explicit outline colours corrected it and browser inspection confirmed dark-on-white and white-on-dark focus. No global design changes were warranted.
