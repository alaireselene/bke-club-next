export default function PostLoadingPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <header className="mb-12 text-center animate-pulse">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-6 w-20 rounded-full bg-base-200" />
          <div className="h-6 w-32 rounded-full bg-base-200" />
        </div>
        <div className="mb-4 h-10 w-3/4 mx-auto rounded bg-base-200" />
        <div className="h-6 w-48 mx-auto rounded bg-base-200" />
      </header>

      {/* Featured Image Skeleton */}
      <div className="mb-12">
        <div className="h-[400px] w-full rounded-lg bg-base-200" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        {/* Paragraph blocks */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-4 w-full rounded bg-base-200" />
            <div className="h-4 w-[90%] rounded bg-base-200" />
            <div className="h-4 w-[95%] rounded bg-base-200" />
          </div>
        ))}
      </div>

      {/* Navigation Skeleton */}
      <div className="mt-12 border-t border-base-200 pt-8">
        <div className="h-6 w-32 rounded bg-base-200" />
      </div>
    </article>
  );
}
