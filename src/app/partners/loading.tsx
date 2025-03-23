import { PageHeader } from "@/components/layout/PageHeader/PageHeader";

export default function LoadingPartners() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <PageHeader
          title="Đối tác"
          description="Đối tác trong nước và quốc tế của Mạng lưới"
        />

        {/* Loading Filters Skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-pulse">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 bg-slate-200 rounded-full" />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 bg-slate-200 rounded-full" />
            ))}
          </div>
        </div>

        {/* Loading Partners Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden animate-pulse"
            >
              {/* Logo Skeleton */}
              <div className="h-32 bg-slate-200" />

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="h-5 w-20 bg-slate-200 rounded-full" />
                  <div className="h-5 w-24 bg-slate-200 rounded-full" />
                </div>

                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                  <div className="h-6 w-1/2 bg-slate-200 rounded-lg" />
                </div>

                <div className="h-5 w-32 bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
