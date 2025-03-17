import { Skeleton } from "@/components/ui/skeleton";

export default function NewsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-12 w-48 bg-base-200" />
        <Skeleton className="h-6 w-96 bg-base-200/50" />
      </div>

      {/* Category tabs skeleton */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-32 bg-base-200" />
        ))}
      </div>

      {/* News grid skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-48 w-full bg-base-200" />
            <Skeleton className="h-4 w-24 bg-base-200/50" />
            <Skeleton className="h-6 w-full bg-base-200" />
            <Skeleton className="h-4 w-3/4 bg-base-200/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
