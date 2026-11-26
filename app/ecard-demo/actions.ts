"use server";
import { Resend } from "resend";
import { headers } from "next/headers";
import { createHash, randomUUID } from "node:crypto";
import { validateCard, consentText, consentVersion } from "@/lib/ecard";
import { site } from "@/lib/site";
export type SaveResult = {
  status: "success" | "error";
  message: string;
  reference?: string;
  errors?: Record<string, string>;
};
const attempts = new Map<string, { count: number; expires: number }>();
export async function saveECard(
  input: unknown,
  honeypot: string,
): Promise<SaveResult> {
  if (honeypot) return { status: "error", message: "Please try again." };
  const { card, errors } = validateCard(input);
  if (Object.keys(errors).length)
    return { status: "error", message: "Please check your details.", errors };
  const h = await headers();
  const key = createHash("sha256")
    .update(
      h.get("x-vercel-forwarded-for") ?? h.get("x-forwarded-for") ?? "local",
    )
    .digest("hex");
  const now = Date.now();
  for (const [id, r] of attempts) if (r.expires < now) attempts.delete(id);
  const prior = attempts.get(key);
  if (prior && prior.count >= 5)
    return {
      status: "error",
      message:
        "Too many submissions. Your demo is still available; please try saving again in an hour.",
    };
  if (attempts.size > 2000) attempts.delete(attempts.keys().next().value!);
  attempts.set(key, {
    count: (prior?.count ?? 0) + 1,
    expires: prior?.expires ?? now + 3600000,
  });
  if (!process.env.RESEND_API_KEY)
    return {
      status: "error",
      message:
        "Your demo is ready, but we could not save your details. Please try again later.",
    };
  const reference = `EC-${randomUUID().slice(0, 8).toUpperCase()}`;
  const record = {
    reference,
    submittedAt: new Date().toISOString(),
    ...card,
    marketingConsent: card.marketing
      ? "OPTED IN"
      : "NOT OPTED IN — no marketing",
    consentText,
    consentVersion,
    source: "/ecard-demo",
  };
  try {
    const { data, error } = await new Resend(
      process.env.RESEND_API_KEY,
    ).emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: process.env.RESEND_TO ?? site.email,
      replyTo: card.email,
      subject: `${reference} — E-card demo — ${card.marketing ? "Marketing opted in" : "No marketing consent"}`,
      text: Object.entries(record)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n"),
      attachments: [
        {
          filename: `${reference}.json`,
          content: Buffer.from(JSON.stringify(record, null, 2)),
        },
      ],
    });
    if (error || !data?.id) throw new Error("Delivery failed");
    return {
      status: "success",
      reference,
      message:
        "Your details and preferences have been sent to Funoon’s enquiry inbox.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Your demo is ready, but your details were not saved. Please retry below.",
    };
  }
}
