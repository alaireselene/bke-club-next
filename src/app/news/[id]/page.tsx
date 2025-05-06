import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { directus} from "@/lib/directus"; // Import directus client and Post type
import { readItem } from "@directus/sdk"; // Import readItem function
import type { News } from "@/features/news"; // Keep News type alias
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { formatDate, toISOString } from "@/lib/utils/date"; // Keep date utils
import { createExcerpt } from "@/lib/utils/contentModify"; // Import excerpt util
import { getCategoryDisplayName } from "@/features/news/utils/categoryUtils"; // Import helper

// Assuming the directory is renamed from [slug] to [id]
interface Props {
  params: Promise<{ id: string }>; // Expect 'id' instead of 'slug'
}

// Remove GraphQL specific NewsData interface

// Helper function to fetch post data to avoid repetition
async function getPostData(id: string): Promise<News | null> {
  try {
    const postData = await directus.request(readItem('post', id, {
      fields: ['*'], // Fetch all fields
    }));
    return postData as News;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return null;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostData(params.id);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết này không tồn tại hoặc đã bị xóa.",
    };
  }

  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";
  const imageUrl = post.preview_image
    ? `${directusUrl}/assets/${post.preview_image}`
    : null;
  const excerpt = createExcerpt(post.content); // Generate excerpt

  return {
    title: `${post.title} | HUST Research Clubs Network`,
    description: excerpt, // Use generated excerpt
    openGraph: imageUrl ? { images: [imageUrl] } : undefined,
  };
}

export default async function NewsPage(props: Props) {
  const params = await props.params;
  const post = await getPostData(params.id);

  if (!post) {
    notFound();
  }

  const publishDate = post.date_created; // Use date_created
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:3000";
  const imageUrl = post.preview_image
    ? `${directusUrl}/assets/${post.preview_image}`
    : null;

  // Parse categories
  let mainCategoryName = null;
  try {
    const parsedCategories = typeof post.categories === 'string'
      ? JSON.parse(post.categories)
      : post.categories;
    if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
      mainCategoryName = parsedCategories[0];
    }
  } catch (e) {
    console.error("Error parsing categories for news detail:", post.id, e);
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Featured Image */}
      {imageUrl && ( // Use constructed image URL
        (<div className="mb-8">
          <Image
            src={imageUrl}
            alt={post.title}
            width={1200}
            height={400}
            className="h-[400px] w-full rounded-lg object-cover shadow-lg"
            priority
          />
        </div>)
      )}
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500">
          {mainCategoryName && ( // Use parsed category name
            (<span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
              {getCategoryDisplayName(mainCategoryName)} {/* Use helper */}
            </span>)
          )}
          <time dateTime={toISOString(publishDate)}>
            {formatDate(publishDate)}
          </time>
        </div>
        <h1 className="mb-4 font-sans text-4xl text-slate-900">{post.title}</h1>
      </header>
      {/* Content */}
      <div className="prose prose-slate prose-headings:text-slate-900 prose-a:text-teal-600 hover:prose-a:text-teal-500 prose-strong:text-slate-900 mx-auto">
        {/* Assuming content is HTML */}
        <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
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
