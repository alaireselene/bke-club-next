import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { FeaturedImage } from "@/types/wordpress";

interface PostData {
  slug: string;
  title: string;
  summary: string;
  featuredImage?: FeaturedImage;
  publishedAt: string;
  category: string;
  categoryName: string;
}

interface NewsCardProps {
  post: PostData;
}

export function NewsCard({ post }: NewsCardProps) {
  const publishDate = new Date(post.publishedAt);
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(publishDate);

  return (
    <Link href={`/news/${post.slug}`}>
      <article className="group h-full bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden transition hover:shadow-md">
        {post.featuredImage?.node.sourceUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-cardinal-50 px-2 py-1 text-xs font-medium text-cardinal-700">
                {post.categoryName}
              </span>
            </div>

            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
              {post.title}
            </h3>

            <div
              className="text-sm text-slate-600 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.summary }}
            />

            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishDate.toISOString()}>
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
