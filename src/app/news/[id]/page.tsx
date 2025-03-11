import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { post, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";

type Params = Promise<{ id: string }>;

const categories = {
  news: "Tin tức",
  announcement: "Thông báo",
  research: "Nghiên cứu",
  achievement: "Thành tựu",
};

async function getPostData(id: string) {
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
      category: post.category,
      featuredImageUrl: post.featuredImageUrl,
      createdAt: post.createdAt,
      author: {
        fullName: user.fullName,
      },
    })
    .from(post)
    .leftJoin(user, eq(post.authorId, user.id))
    .where(eq(post.id, parseInt(id, 10)))
    .limit(1);

  const postData = posts[0];

  if (!postData) {
    return null;
  }

  return {
    post: postData,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const data = await getPostData((await params).id);

  if (!data) {
    return {
      title: "Bài viết không tồn tại | HUST Research Clubs Network",
    };
  }

  return {
    title: `${data.post.title} | HUST Research Clubs Network`,
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const data = await getPostData((await params).id);

  if (!data) {
    notFound();
  }

  const { post } = data;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-base-content/60">
          <span className="badge badge-primary">
            {categories[post.category]}
          </span>
          <time dateTime={post.createdAt.toISOString()}>
            {post.createdAt.toLocaleDateString("vi-VN")}
          </time>
        </div>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        {post.author && (
          <p className="text-base-content/60">Tác giả {post.author.fullName}</p>
        )}
      </header>

      {/* Featured Image */}
      {post.featuredImageUrl && (
        <div className="mb-12">
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            width={1200}
            height={600}
            className="h-[400px] w-full rounded-lg object-cover shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-base dark:prose-invert prose-primary mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Navigation */}
      <div className="mt-12 border-t border-base-200 pt-8">
        <Link
          href="/news"
          className="inline-flex items-center text-primary hover:text-primary-focus"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Quay lại Tin tức
        </Link>
      </div>
    </article>
  );
}
