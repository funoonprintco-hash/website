// Transport-independent enquiry shape: future CRM adapters can consume this record.
export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  quantity: string;
  deliveryDate: string;
  location: string;
  additional: string;
  reference: string;
};
export const MAX_ARTWORK_BYTES = 3 * 1024 * 1024;
export function validateEnquiry(form: FormData) {
  const limits: Record<keyof Enquiry, number> = {
    name: 100,
    email: 254,
    phone: 40,
    company: 160,
    service: 150,
    message: 5000,
    quantity: 12,
    deliveryDate: 10,
    location: 300,
    additional: 3000,
    reference: 200,
  };
  const errors: Record<string, string> = {};
  const values = {} as Enquiry;
  for (const key of Object.keys(limits) as (keyof Enquiry)[]) {
    const raw = form.get(key);
    values[key] = typeof raw === "string" ? raw.trim() : "";
    if (values[key].length > limits[key])
      errors[key] = `Please use ${limits[key]} characters or fewer.`;
  }
  for (const key of [
    "name",
    "email",
    "phone",
    "company",
    "service",
    "message",
    "location",
  ] as const)
    if (!values[key]) errors[key] = "Please complete this field.";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address.";
  if (values.phone && !/^[+()\d\s.-]{7,40}$/.test(values.phone))
    errors.phone = "Enter a valid phone or WhatsApp number.";
  if (
    values.quantity &&
    (!/^\d+$/.test(values.quantity) ||
      Number(values.quantity) < 1 ||
      Number(values.quantity) > 10000000)
  )
    errors.quantity = "Enter a whole number between 1 and 10,000,000.";
  if (values.deliveryDate) {
    const date = new Date(`${values.deliveryDate}T00:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(values.deliveryDate) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== values.deliveryDate
    )
      errors.deliveryDate = "Enter a valid delivery date.";
    else if (values.deliveryDate < new Date().toISOString().slice(0, 10))
      errors.deliveryDate = "Choose today or a future date.";
  }
  return { values, errors };
}
export function identifyArtwork(
  bytes: Uint8Array,
): "pdf" | "png" | "jpeg" | null {
  if (
    bytes.length >= 5 &&
    String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-"
  )
    return "pdf";
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v))
    return "png";
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return "jpeg";
  return null;
}
