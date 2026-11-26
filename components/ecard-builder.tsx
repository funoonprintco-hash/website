"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  emptyCard,
  designs,
  safeWeb,
  validateCard,
  vCard,
  consentText,
  type ECard,
} from "@/lib/ecard";
import { saveECard, type SaveResult } from "@/app/ecard-demo/actions";
const steps: {
  key: keyof ECard;
  title: string;
  hint: string;
  type?: string;
  optional?: boolean;
}[] = [
  {
    key: "name",
    title: "What’s your name?",
    hint: "Use the name you want people to see.",
  },
  {
    key: "phone",
    title: "What’s your phone number?",
    hint: "Include your country code, for example +971.",
    type: "tel",
  },
  {
    key: "website",
    title: "What’s your website?",
    hint: "A company or personal website. You can skip this.",
    optional: true,
  },
  {
    key: "color",
    title: "Which colour feels like you?",
    hint: "Choose a preset or pick your own brand colour.",
  },
  {
    key: "email",
    title: "What’s your email address?",
    hint: "This will appear as a contact link on your demo.",
    type: "email",
  },
  {
    key: "design",
    title: "Choose your card design.",
    hint: "Three different layouts, personalised with your details.",
  },
  {
    key: "company",
    title: "Which company do you represent?",
    hint: "Leave this blank if you’re creating a personal card.",
    optional: true,
  },
  {
    key: "role",
    title: "What’s your role?",
    hint: "Your job title or a short description of what you do.",
    optional: true,
  },
  {
    key: "whatsapp",
    title: "Add a WhatsApp number?",
    hint: "Include the country code. This can differ from your phone number.",
    type: "tel",
    optional: true,
  },
  {
    key: "linkedin",
    title: "Add your LinkedIn profile?",
    hint: "Paste the full link to your profile.",
    optional: true,
  },
  {
    key: "instagram",
    title: "Add your Instagram profile?",
    hint: "Paste the full link to your profile.",
    optional: true,
  },
  {
    key: "address",
    title: "Where can people find you?",
    hint: "Your business address or city. Avoid sharing a private home address.",
    optional: true,
  },
  {
    key: "bio",
    title: "What would you like people to know?",
    hint: "Add a short introduction, services or opening hours.",
    optional: true,
  },
  {
    key: "extraLinks",
    title: "Any other links to include?",
    hint: "Add up to five links, one per line: a booking page, portfolio, catalogue or another social profile.",
    optional: true,
  },
];
const swatches = [
  "#2563eb",
  "#111111",
  "#166534",
  "#7c3aed",
  "#9f1239",
  "#b45309",
];
function Preview({ card }: { card: ECard }) {
  const rgb = card.color.match(/\w\w/g)?.map((v) => parseInt(v, 16)) ?? [
    0, 0, 0,
  ];
  const luminance = rgb
    .map((v) => {
      const c = v / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const style = {
    "--card-color": card.color,
    "--card-contrast": luminance > 0.179 ? "#111" : "#fff",
  } as CSSProperties;
  const links = [
    ...(card.website ? [{ label: "Website", url: safeWeb(card.website) }] : []),
    ...(card.linkedin
      ? [{ label: "LinkedIn", url: safeWeb(card.linkedin) }]
      : []),
    ...(card.instagram
      ? [{ label: "Instagram", url: safeWeb(card.instagram) }]
      : []),
    ...card.extraLinks
      .split("\n")
      .filter((s) => s.trim())
      .map((s) => ({
        label: safeWeb(s).replace(/^https?:\/\//, ""),
        url: safeWeb(s),
      })),
  ].filter((l) => l.url);
  function download() {
    const url = URL.createObjectURL(
      new Blob([vCard(card)], { type: "text/vcard;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <article
      className={`ecard-preview ecard-${card.design}`}
      style={style}
      aria-label="Your e-card preview"
    >
      <header className="ecard-identity">
        <div className="ecard-initials" aria-hidden="true">
          {card.name
            .split(/\s+/)
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>
        <h2>{card.name}</h2>
        {card.role && <p>{card.role}</p>}
        {card.company && <strong>{card.company}</strong>}
      </header>
      <div className="ecard-content">
        {card.bio && <p className="ecard-bio">{card.bio}</p>}
        <div className="ecard-contact-links">
          <a href={`tel:${card.phone.replace(/[^+\d]/g, "")}`}>
            Call <span>{card.phone}</span>
          </a>
          <a href={`mailto:${card.email}`}>
            Email <span>{card.email}</span>
          </a>
          {card.whatsapp && (
            <a
              href={`https://wa.me/${card.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          )}
          {links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        {card.address && <p className="ecard-address">{card.address}</p>}
        <button type="button" className="ecard-save" onClick={download}>
          Save contact
        </button>
        <p className="ecard-small">
          Downloads a contact card for you to review and add to your phone.
        </p>
      </div>
    </article>
  );
}
export function ECardBuilder() {
  const [card, setCard] = useState<ECard>({ ...emptyCard });
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SaveResult | null>(null);
  const [trap, setTrap] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, [step, preview]);
  const current = steps[step];
  const review = step === steps.length;
  function change(key: keyof ECard, value: string | boolean) {
    setCard((c) => ({ ...c, [key]: value }));
    setError("");
    setResult(null);
  }
  function next() {
    const checked = validateCard(card);
    if (current && checked.errors[current.key]) {
      setError(checked.errors[current.key]);
      return;
    }
    setError("");
    setStep((s) => s + 1);
  }
  async function submit() {
    if (busy) return;
    const checked = validateCard(card);
    const first = steps.findIndex((s) => checked.errors[s.key]);
    if (first >= 0) {
      setStep(first);
      setError(checked.errors[steps[first].key]);
      return;
    }
    setCard(checked.card);
    setBusy(true);
    setPreview(true);
    setResult(null);
    try {
      setResult(await saveECard(checked.card, trap));
    } catch {
      setResult({
        status: "error",
        message:
          "Your demo is ready, but your details were not saved. Please retry.",
      });
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="ecard-builder">
      <div className="ecard-page-heading">
        <h1>Make your next introduction digital.</h1>
        <p>A few details. Your colours. An e-card that feels like you.</p>
      </div>
      {preview ? (
        <div className="ecard-result">
          <div className="ecard-result-copy">
            <h2 tabIndex={-1} ref={heading}>
              Your e-card demo.
            </h2>
            <p>
              This is a private preview, not a published profile. Your details
              are not added to a public directory.
            </p>
            <p role="status">
              {busy ? "Saving your details to Funoon…" : result?.message}
            </p>
            {result?.reference && <p>Reference: {result.reference}</p>}
            {result?.status === "error" && (
              <button
                className="button button-black"
                onClick={submit}
                disabled={busy}
              >
                Retry saving details
              </button>
            )}
            <button
              className="text-link"
              disabled={busy}
              onClick={() => {
                setPreview(false);
                setStep(steps.length);
              }}
            >
              Edit my details
            </button>
            <Link className="text-link" href="/quote?service=Business%20Cards">
              Discuss my printed and digital cards
            </Link>
          </div>
          <Preview card={card} />
        </div>
      ) : (
        <form
          className="ecard-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (review) void submit();
            else next();
          }}
        >
          <div className="ecard-progress">
            <span>
              Step {step + 1} of {steps.length + 1}
            </span>
            <progress
              value={step + 1}
              max={steps.length + 1}
              aria-label="E-card setup progress"
            />
          </div>
          <div className="ecard-question" key={step}>
            <h2 tabIndex={-1} ref={heading}>
              {review ? "Ready to see your card?" : current.title}
            </h2>
            {!review && (
              <p id="ecard-hint">
                {current.hint} {current.optional && <span>(Optional)</span>}
              </p>
            )}
            {review ? (
              <>
                <dl className="ecard-review">
                  {steps
                    .filter((s) => card[s.key])
                    .map((s) => (
                      <div key={s.key}>
                        <dt>
                          {(
                            {
                              extraLinks: "Other links",
                              color: "Colour",
                              bio: "Introduction",
                            } as Record<string, string>
                          )[s.key] ?? s.key}
                        </dt>
                        <dd>{String(card[s.key])}</dd>
                        <button
                          type="button"
                          className="text-link"
                          onClick={() => setStep(steps.indexOf(s))}
                        >
                          Edit <span className="sr-only">{s.key}</span>
                        </button>
                      </div>
                    ))}
                </dl>
                <p className="ecard-disclosure">
                  Selecting “Show my demo” sends these details, your design
                  choices and consent preference to Funoon FZC’s enquiry inbox
                  so we can retain your request and respond about your e-card.
                  This does not subscribe you to marketing.{" "}
                  <Link href="/privacy">Privacy information</Link>.
                </p>
                <label className="ecard-consent">
                  <input
                    type="checkbox"
                    checked={card.marketing}
                    onChange={(e) => change("marketing", e.target.checked)}
                  />
                  <span>{consentText}</span>
                </label>
              </>
            ) : current.key === "color" ? (
              <div className="ecard-colours">
                <div className="ecard-swatches">
                  {swatches.map((color) => (
                    <button
                      type="button"
                      key={color}
                      style={{ background: color }}
                      aria-label={`Choose colour ${color}`}
                      aria-pressed={card.color === color}
                      onClick={() => change("color", color)}
                    >
                      {card.color === color ? "✓" : ""}
                    </button>
                  ))}
                </div>
                <label htmlFor="ecard-color">Custom colour</label>
                <input
                  id="ecard-color"
                  type="color"
                  value={card.color}
                  onChange={(e) => change("color", e.target.value)}
                />
                <span>{card.color}</span>
              </div>
            ) : current.key === "design" ? (
              <div className="ecard-designs">
                {designs.map((d) => (
                  <button
                    type="button"
                    key={d}
                    aria-pressed={card.design === d}
                    onClick={() => change("design", d)}
                  >
                    <span
                      className={`ecard-design-mini mini-${d}`}
                      style={{ "--card-color": card.color } as CSSProperties}
                    >
                      <span />
                      <i />
                      <i />
                    </span>
                    <strong>{d}</strong>
                    <span>
                      {d === "minimal"
                        ? "Clean and understated"
                        : d === "bold"
                          ? "A confident colour header"
                          : "A traditional, centred layout"}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <label className="sr-only" htmlFor={`ecard-${current.key}`}>
                  {current.title}
                </label>
                {["bio", "extraLinks", "address"].includes(current.key) ? (
                  <textarea
                    id={`ecard-${current.key}`}
                    value={String(card[current.key])}
                    maxLength={current.key === "address" ? 300 : 1000}
                    rows={4}
                    onChange={(e) => change(current.key, e.target.value)}
                    aria-describedby="ecard-hint ecard-error"
                  />
                ) : (
                  <input
                    id={`ecard-${current.key}`}
                    type={current.type ?? "text"}
                    value={String(card[current.key])}
                    maxLength={200}
                    required={!current.optional}
                    autoComplete={
                      current.key === "name"
                        ? "name"
                        : current.key === "phone"
                          ? "tel"
                          : current.key === "email"
                            ? "email"
                            : "off"
                    }
                    onChange={(e) => change(current.key, e.target.value)}
                    aria-describedby="ecard-hint ecard-error"
                    aria-invalid={!!error}
                  />
                )}
              </>
            )}
            <p id="ecard-error" role="alert" className="ecard-error">
              {error}
            </p>
          </div>
          <div className="ecard-trap" aria-hidden="true">
            <label>
              Leave blank
              <input
                tabIndex={-1}
                autoComplete="off"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
              />
            </label>
          </div>
          <div className="ecard-controls">
            {step > 0 && (
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setStep((s) => s - 1);
                  setError("");
                }}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="button button-black"
              disabled={busy}
            >
              {review
                ? "Show my demo"
                : current.optional && !card[current.key]
                  ? "Skip for now"
                  : "Next"}
            </button>
          </div>
          <p className="ecard-small">
            Details are sent only when you select “Show my demo”. Closing or
            refreshing clears this unsaved session.
          </p>
        </form>
      )}
      <noscript>
        Please enable JavaScript to build your e-card demo, or contact us for
        assistance.
      </noscript>
    </div>
  );
}
