"use server";
import { Resend } from "resend";
import sharp from "sharp";
import { headers } from "next/headers";
import { createHash, randomUUID } from "node:crypto";
import {
  validateEnquiry,
  identifyArtwork,
  MAX_ARTWORK_BYTES,
} from "@/lib/enquiry";
import { site } from "@/lib/site";
export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  reference?: string;
};
// Best-effort abuse guard per server instance, in addition to the honeypot and framework origin checks.
// A shared rate-limit adapter can replace this when a durable store is configured.
const attempts = new Map<string, { count: number; expires: number }>();
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  if (formData.get("company_website"))
    return {
      status: "error",
      message: "We couldn’t submit this form. Please contact us directly.",
    };
  const { values, errors } = validateEnquiry(formData);
  const upload = formData.get("artwork");
  const file = upload instanceof File && upload.size > 0 ? upload : null;
  if (file && file.size > MAX_ARTWORK_BYTES)
    errors.artwork = "Choose a PDF, JPG or PNG of 3 MB or less.";
  if (Object.keys(errors).length)
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  const h = await headers();
  const ip =
    h.get("x-vercel-forwarded-for") ?? h.get("x-forwarded-for") ?? "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const now = Date.now();
  for (const [id, record] of attempts)
    if (record.expires < now) attempts.delete(id);
  const record = attempts.get(key);
  if (record && record.count >= 5)
    return {
      status: "error",
      message:
        "Too many attempts. Please try again in an hour or contact us directly.",
    };
  if (attempts.size > 2000) attempts.delete(attempts.keys().next().value!);
  attempts.set(key, {
    count: (record?.count ?? 0) + 1,
    expires: record?.expires ?? now + 3600000,
  });
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file) {
    try {
      const bytes = Buffer.from(await file.arrayBuffer());
      const kind = identifyArtwork(bytes);
      const extension = file.name.split(".").pop()?.toLowerCase();
      const allowed =
        kind === "pdf"
          ? extension === "pdf"
          : kind === "png"
            ? extension === "png"
            : kind === "jpeg"
              ? ["jpg", "jpeg"].includes(extension ?? "")
              : false;
      if (!allowed)
        return {
          status: "error",
          errors: {
            artwork: "The file contents must match a PDF, JPG or PNG file.",
          },
          message: "Please choose a supported reference file.",
        };
      // Re-encode raster references, strip metadata and enforce a pixel limit. PDFs remain attachments only.
      const content =
        kind === "pdf"
          ? bytes
          : await sharp(bytes, { limitInputPixels: 25000000 })
              .rotate()
              .resize({
                width: 3000,
                height: 3000,
                fit: "inside",
                withoutEnlargement: true,
              })
              .png()
              .toBuffer();
      if (content.length > MAX_ARTWORK_BYTES)
        return {
          status: "error",
          errors: {
            artwork:
              "This image is too large after processing. Please choose a smaller reference.",
          },
        };
      attachment = {
        filename:
          kind === "pdf" ? "project-reference.pdf" : "project-reference.png",
        content,
      };
    } catch {
      return {
        status: "error",
        errors: {
          artwork:
            "We couldn’t read this file. Please use a valid PDF, JPG or PNG.",
        },
        message: "Please check your attachment.",
      };
    }
  }
  if (!process.env.RESEND_API_KEY)
    return {
      status: "error",
      message:
        "The enquiry service is temporarily unavailable. Please email us or contact us on WhatsApp.",
    };
  const reference = `FZC-${randomUUID().slice(0, 8).toUpperCase()}`;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: process.env.RESEND_TO ?? site.email,
      replyTo: values.email,
      subject: `${reference} — Corporate enquiry — ${values.service.replace(/[\r\n]/g, " ")}`,
      text: [
        `Reference: ${reference}`,
        ...Object.entries(values).map(
          ([k, v]) => `${k}: ${v || "Not specified"}`,
        ),
      ].join("\n"),
      ...(attachment ? { attachments: [attachment] } : {}),
    });
    if (error || !data?.id)
      return {
        status: "error",
        message:
          "Your enquiry could not be sent. Please try again, email us or contact us on WhatsApp.",
      };
    return {
      status: "success",
      reference,
      message:
        "Your enquiry has been sent to our team. We’ll review your requirements and contact you to discuss the next steps.",
    };
  } catch {
    return {
      status: "error",
      message:
        "We couldn’t send your enquiry. Please try again or contact us directly.",
    };
  }
}
