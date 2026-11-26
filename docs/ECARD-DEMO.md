# Personal e-card builder

Route: /ecard-demo/create. The original personal builder is linked from the printed-to-digital demonstration at /ecard-demo. Main navigation, footer and business-card offering links lead to that demonstration; see [PRINT-DIGITAL-DEMO.md](PRINT-DIGITAL-DEMO.md).

One-question steps lead to a review and a private preview. Three styles (minimal, bold, classic), custom brand colour, contact links and a vCard download. No public profile URL is created. Draft values stay only in React memory and clear on reload.

## Submission storage

The existing production Resend configuration sends the complete validated submission to RESEND_TO (fallback: site.email). A JSON attachment provides a reusable record. Records include a reference, timestamp, design/colour, entered fields, boolean marketing choice, explicit opt-in/opt-out label, exact consent text and consent version. This is inbox storage, not a database or a CRM. No marketing campaign is sent automatically.

RESEND_API_KEY, RESEND_FROM and RESEND_TO follow the existing enquiry configuration. Missing configuration or provider failure never produces a saved confirmation; the demo stays visible and offers retry. Only an accepted provider message ID produces success. A honeypot and best-effort per-instance hourly rate limit reduce abuse; the rate limiter is not distributed.

## Consent

Marketing checkbox starts unchecked and is optional. Separate disclosure explains submission retention and e-card follow-up. No marketing opt-in is required to see the preview. Privacy page explains inbox delivery and withdrawal/deletion contact.

## Verification

Production build and unit tests cover validation, unsafe URL rejection, vCard escaping, opt-in/opt-out recording, provider failure and missing configuration. Browser checks use blocked POSTs to exercise the private demo without sending fabricated enquiries. Real delivery has not been tested with a customer message.
