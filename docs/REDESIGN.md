# Funoon FZC redesign

## Scope and content
- Replaced live company-name copy, accessible names, metadata and structured data with Funoon FZC. Domain and approved email are unchanged.
- Kept the exact official six-bar paths and Funoon wordmark, removing only the old PRINT CO. suffix from new derived SVG assets. Original files are retained as source assets, not used by the redesigned pages.
- Rebuilt homepage, header, footer, About, Contact, Quote, portfolio and product pages in the existing Next.js stack.
- Added six corporate solution pages, eleven product pages, two approved Maxline project pages, privacy information, sitemap, robots and a new Open Graph image.
- Redirected /services and existing service detail URLs to /products.
- Maxline work is approved by the user. Other existing photographs are labelled concepts. No invented materials, results, testimonials, client history or certifications.
- Hero uses a temporary labelled packaging concept until the user supplies Funoon business-card photography. Swap the hero image source, alt text and caption in app/page.tsx together.
- Archivo and DM Sans remain in use; licensed Etna files were not supplied.

## Design and motion
See DESIGN.md. Following feedback, added staggered headline entry, a hero image entrance, progressive scroll reveals, image hover treatments, press feedback, mobile menu transitions and a pausable category marquee. Reduced motion removes animation, and page content remains available without JavaScript. Buttons and layout stay straight; image frames have 6–8px corners.

## Enquiry architecture
components/quote-form.tsx submits to app/actions.ts. lib/enquiry.ts is a transport-independent validated enquiry shape for future CRM integration. Existing Resend configuration is reused (RESEND_API_KEY, RESEND_FROM, RESEND_TO); secrets remain in environment configuration. No client portal or CRM is advertised as available.

Required fields: company, contact, email, phone, category, description and delivery location. Quantity and date can be omitted while a brief is being developed. Includes additional notes, source-project reference and one PDF/JPG/PNG up to 3 MB. Server validates lengths, dates, quantity, file signature and extension. Raster files are re-encoded, metadata stripped and pixel count limited. PDFs are treated as untrusted email attachments, never publicly hosted. Files exist in memory for delivery, not in a public uploads directory.

Spam controls: honeypot, framework same-origin action checks, size limits and a bounded per-instance rate limiter. Rate limiting is best-effort on serverless instances; use a durable shared limiter or approved challenge provider if stronger protection is needed. Production email configuration must use an approved sender; existing environment values are preserved.

## Verification
- Production build and strict TypeScript checking enabled (removed ignoreBuildErrors).
- node --test tests/enquiry.test.cjs covers required fields, bounded values, date validation, file signature checking, rejected uploads, provider failures, missing configuration and successful delivery responses with a mocked email provider. No live test messages are sent.
- Browser checks cover desktop and mobile routes, one h1 per page, canonical URLs, overflow, images, mobile dialog and Escape, work filters, category prefill, required form fields, upload size rejection and legacy redirects.
- Motion checked for completed entrances, reveal state, pause control, reduced motion and JavaScript-disabled readability.
- Live email delivery is not proven by mocked tests. A real end-to-end delivery check remains for launch review with an approved test recipient.

## Publication
Preview only. Production domain release requires user review and approval. No production deployment or merge is authorized by this redesign brief.
