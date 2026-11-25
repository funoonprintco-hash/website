import { imageSize } from "@/lib/image-size";
import Link from "next/link";
import Image from "next/image";
import type { WorkItem } from "@/lib/portfolio";
export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link href={`/work/${item.slug}`} className="work-card">
      <div className="work-image">
        <Image
          src={item.image}
          alt={item.imageAlt}
          {...imageSize(item.image)}
          sizes="(max-width: 700px) 100vw, 50vw"
          className="object-contain"
        />
        <span className="image-label">Completed work</span>
      </div>
      <div className="work-card-caption">
        <div>
          <h3>
            {item.client} — {item.title}
          </h3>
          <p>{item.category}</p>
        </div>
        <span className="view-label">View project</span>
      </div>
    </Link>
  );
}
