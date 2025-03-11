import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NewsCardProps {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryName: string;
  publishedAt: string;
  image?: string;
}

export function NewsCard({
  slug,
  title,
  summary,
  category,
  categoryName,
  publishedAt,
  image,
}: NewsCardProps) {
  return (
    <article className="card bg-base-100 shadow-md hover:scale-[1.02] transition-transform min-h-[24rem]">
      {image && (
        <figure>
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="h-48 w-full object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        <div className="grow">
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="badge badge-primary">{categoryName}</span>
            <time dateTime={publishedAt} className="text-base-content/60">
              {new Date(publishedAt).toLocaleDateString("vi-VN")}
            </time>
          </div>

          <h2 className="card-title mb-2">{title}</h2>

          <p className="text-base-content/70">{summary}</p>
        </div>

        <div className="card-actions justify-start mt-4">
          <Link
            href={`/news/${slug}`}
            className="flex items-center text-primary hover:text-primary-focus"
          >
            Đọc tiếp
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
