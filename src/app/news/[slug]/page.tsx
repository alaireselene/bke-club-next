import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getClient } from "@/lib/apollo-client";
import { GET_NEWS_BY_SLUG } from "@/features/news/graphql/queries";
import type { News } from "@/features/news";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { parseDate, formatDate, toISOString } from "@/lib/utils/date";

interface Props {
  params: { slug: string };
}

interface NewsData {
  post: News;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await getClient().query<NewsData>({
    query: GET_NEWS_BY_SLUG,
    variables: { slug: params.slug },
  });

  if (!data.post) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết này không tồn tại, hoặc đã bị xóa.",
    };
  }

  const post = data.post;

  return {
    title: `${post.title} | HUST Research Clubs Network`,
    description: post.excerpt || post.title,
    openGraph: post.featuredImage
      ? {
          images: [post.featuredImage.node.sourceUrl],
        }
      : undefined,
  };
}

export default async function NewsPage({ params }: Props) {
  const { data } = await getClient().query<NewsData>({
    query: GET_NEWS_BY_SLUG,
    variables: { slug: params.slug },
  });

  if (!data.post) {
    notFound();
  }

  const post = data.post;
  const publishDate = parseDate(post.date);

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            width={1200}
            height={400}
            className="h-[400px] w-full rounded-lg object-cover shadow-lg"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          {post.categories.nodes[0] && (
            <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
              {post.categories.nodes[0].name}
            </span>
          )}
          <time dateTime={toISOString(publishDate)}>
            {formatDate(publishDate)}
          </time>
        </div>
        <h1 className="mb-4 font-sans text-4xl text-slate-900">{post.title}</h1>
      </header>

      {/* Content */}
      <div className="prose prose-slate prose-headings:text-slate-900 prose-a:text-teal-600 hover:prose-a:text-teal-500 prose-strong:text-slate-900 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Navigation */}
      <div className="mt-12 border-t border-slate-200 pt-8">
        <Link
          href="/news"
          className="inline-flex items-center text-teal-600 hover:text-teal-700"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Quay lại Tin tức
        </Link>
      </div>
    </article>
  );
}
