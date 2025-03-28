import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

import type { NewsCardProps } from "./types";

export function NewsCard({ news }: NewsCardProps) {
  const publishDate = new Date(news.date);
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(publishDate);

  const mainCategory = news.categories.nodes.find(
    (node) => node.name !== "Tin tức"
  );

  return (
    <Link href={`/news/${news.slug}`}>
      <article className="group h-full bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden transition hover:shadow-md">
        {news.featuredImage?.node.sourceUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={news.featuredImage.node.sourceUrl}
              alt={news.title}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-cardinal-50 px-2 py-1 text-xs font-medium text-cardinal-700">
                {mainCategory?.name || "Tin tức"}
              </span>
            </div>

            <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-cardinal-600 transition-colors">
              {news.title}
            </h3>

            <div
              className="text-sm text-slate-600 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: news?.excerpt || "Chưa có tóm tắt",
              }}
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
