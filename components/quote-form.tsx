"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { serviceOptions } from "@/lib/services";
import { solutions } from "@/lib/solutions";
import { MAX_ARTWORK_BYTES } from "@/lib/enquiry";
import { site } from "@/lib/site";
const initialState: EnquiryState = { status: "idle" };
export function QuoteForm({
  defaultService,
  referenceProject,
}: {
  defaultService?: string;
  referenceProject?: string;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initialState);
  const [fileError, setFileError] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);
  const options = Array.from(
    new Set([
      ...serviceOptions,
      ...solutions.map((s) => s.fullName),
      "Corporate Partnership",
      "Repeat Order",
      ...(defaultService ? [defaultService] : []),
    ]),
  );
  if (state.status === "success")
    return (
      <div className="form-success" ref={statusRef} tabIndex={-1} role="status">
        <Check size={28} />
        <h2>Enquiry sent.</h2>
        <p>{state.message}</p>
        <p>
          Your reference: <strong>{state.reference}</strong>
        </p>
        <a href={site.whatsappHref} className="text-link">
          Continue on WhatsApp
        </a>
      </div>
    );
  const field = (
    name: string,
    label: string,
    type = "text",
    required = true,
    placeholder = "",
    maxLength = 160,
  ) => (
    <div className="form-field">
      <label htmlFor={`enquiry-${name}`}>
        {label}
        {!required && <span> (optional)</span>}
      </label>
      <input
        id={`enquiry-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={
          (
            {
              company: "organization",
              name: "name",
              email: "email",
              phone: "tel",
            } as Record<string, string>
          )[name]
        }
        min={type === "number" ? 1 : undefined}
        max={type === "number" ? 10000000 : undefined}
        step={type === "number" ? 1 : undefined}
        aria-invalid={!!state.errors?.[name]}
        aria-describedby={state.errors?.[name] ? `${name}-error` : undefined}
      />
      {state.errors?.[name] && (
        <p id={`${name}-error`} className="field-error">
          {state.errors[name]}
        </p>
      )}
    </div>
  );
  return (
    <form
      ref={formRef}
      action={action}
      className="quote-form"
      aria-busy={pending}
      onSubmit={(event) => {
        if (pending || fileError) {
          event.preventDefault();
          return;
        }
        // React resets uncontrolled forms after an action. Retain entered values on server errors.
        const form = event.currentTarget;
        for (const control of Array.from(form.elements)) {
          if (control instanceof HTMLInputElement && control.type !== "file")
            control.defaultValue = control.value;
          else if (control instanceof HTMLTextAreaElement)
            control.defaultValue = control.value;
          else if (control instanceof HTMLSelectElement)
            for (const option of control.options)
              option.defaultSelected = option.selected;
        }
      }}
    >
      <div className="trap-field" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          id="company-website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="reference" value={referenceProject ?? ""} />
      {referenceProject && (
        <p className="form-status">Project reference: {referenceProject}</p>
      )}
      <p className="field-hint">
        All fields are required unless marked optional.
      </p>
      <div className="form-row">
        {field("company", "Company name", "text", true, "Your company")}
        {field("name", "Contact person", "text", true, "Your name", 100)}
      </div>
      <div className="form-row">
        {field("email", "Work email", "email", true, "you@company.com", 254)}
        {field("phone", "Phone / WhatsApp", "tel", true, "+971", 40)}
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-service">Product category</label>
        <div className="form-select">
          <select
            id="enquiry-service"
            name="service"
            required
            defaultValue={defaultService ?? ""}
            aria-invalid={!!state.errors?.service}
            aria-describedby={
              state.errors?.service ? "service-error" : undefined
            }
          >
            <option value="" disabled>
              Select a category
            </option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
        {state.errors?.service && (
          <p id="service-error" className="field-error">
            {state.errors.service}
          </p>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-message">Product description</label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          maxLength={5000}
          rows={4}
          placeholder="What would you like to create? Include dimensions, materials or finishes if known."
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="field-error">
            {state.errors.message}
          </p>
        )}
      </div>
      <div className="form-row">
        {field(
          "quantity",
          "Estimated quantity",
          "number",
          false,
          "e.g. 250",
          12,
        )}
        {field("deliveryDate", "Required delivery date", "date", false, "", 10)}
      </div>
      {field(
        "location",
        "Delivery location",
        "text",
        true,
        "Emirate, area or delivery address",
        300,
      )}
      <div className="form-field">
        <label htmlFor="enquiry-artwork">
          Artwork or reference <span>(optional)</span>
        </label>
        <input
          id="enquiry-artwork"
          type="file"
          name="artwork"
          accept=".pdf,.png,.jpg,.jpeg"
          aria-describedby="artwork-hint artwork-error"
          aria-invalid={!!(fileError || state.errors?.artwork)}
          onChange={(event) => {
            const file = event.target.files?.[0];
            setFileError(
              file && file.size > MAX_ARTWORK_BYTES
                ? "Choose a file of 3 MB or less."
                : "",
            );
          }}
        />
        <p id="artwork-hint" className="field-hint">
          One PDF, JPG or PNG, up to 3 MB. For larger artwork, send the enquiry
          first and we’ll arrange a suitable transfer. Reattach your file if a
          submission needs correcting.
        </p>
        <p id="artwork-error" className="field-error">
          {fileError || state.errors?.artwork}
        </p>
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-additional">
          Additional requirements <span>(optional)</span>
        </label>
        <textarea
          id="enquiry-additional"
          name="additional"
          rows={3}
          maxLength={3000}
          placeholder="Budget guidance, packaging needs, previous order reference or anything else we should know."
          aria-invalid={!!state.errors?.additional}
          aria-describedby={
            state.errors?.additional ? "additional-error" : undefined
          }
        />
        {state.errors?.additional && (
          <p className="field-error" id="additional-error">
            {state.errors.additional}
          </p>
        )}
      </div>
      <p className="privacy-note">
        We use these details to respond to your enquiry and discuss your
        project. <Link href="/privacy">How we handle your information</Link>.
      </p>
      {state.status === "error" && (
        <div className="form-status" ref={statusRef} tabIndex={-1} role="alert">
          {state.message ?? "Please check the highlighted fields."}{" "}
          <a href={site.emailHref} className="text-link">
            Email us directly
          </a>
        </div>
      )}
      <button
        className="button button-black"
        type="submit"
        disabled={pending || !!fileError}
      >
        {pending ? "Sending your enquiry…" : "Send Enquiry"}
      </button>
    </form>
  );
}
