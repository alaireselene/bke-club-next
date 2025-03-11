import { PageHeader } from "@/app/components/ui/PageHeader";

export default function NetworkLoading() {
  return (
    <>
      <PageHeader title="Mạng lưới thành viên" />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Skeleton */}
        <div className="mb-6 flex gap-4">
          <div className="relative flex-1">
            <div className="h-12 w-full animate-pulse rounded-lg bg-base-300" />
          </div>
          <div className="h-12 w-[200px] animate-pulse rounded-lg bg-base-300" />
        </div>

        {/* Schools Grid Skeleton */}
        <div className="grid gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card animate-pulse bg-base-100 shadow-md">
              <div className="card-body">
                {/* School Header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-8 w-20 rounded bg-base-300" />
                  <div className="h-8 w-48 rounded bg-base-300" />
                </div>

                {/* Clubs Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <div key={j} className="h-32 rounded-lg bg-base-300" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
