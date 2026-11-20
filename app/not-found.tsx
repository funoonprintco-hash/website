import Link from "next/link";
import { PageIntro } from "@/components/editorial";
export default function NotFound() {
  return (
    <PageIntro
      title="This page isn’t here."
      description="The link may have changed. Explore our products or tell us what you’re looking for."
    >
      <Link href="/products" className="button button-black">
        Explore Products
      </Link>
    </PageIntro>
  );
}
