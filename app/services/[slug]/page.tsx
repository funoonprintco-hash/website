import { permanentRedirect, notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export default async function LegacyServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getService(slug)) notFound();
  permanentRedirect(`/products/${slug}`);
}
