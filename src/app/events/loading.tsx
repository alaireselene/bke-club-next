export default function EventsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-12">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-12 w-48 bg-base-200 animate-pulse rounded-md" />
          <div className="h-6 w-96 bg-base-200/50 animate-pulse rounded-md" />
        </div>

        {/* Upcoming Events skeleton */}
        <section>
          <div className="h-8 w-64 bg-base-200 animate-pulse rounded-md mb-6" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/60 p-6 space-y-4"
              >
                <div className="aspect-[16/9] bg-base-200 animate-pulse rounded-lg" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-base-200 animate-pulse rounded-md" />
                  <div className="h-4 w-1/2 bg-base-200/50 animate-pulse rounded-md" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-base-200/50 animate-pulse rounded-md" />
                  <div className="h-4 w-5/6 bg-base-200/50 animate-pulse rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events skeleton */}
        <section>
          <div className="h-8 w-56 bg-base-200 animate-pulse rounded-md mb-6" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200/60 p-6 space-y-4 opacity-75"
              >
                <div className="aspect-[16/9] bg-base-200 animate-pulse rounded-lg" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-base-200 animate-pulse rounded-md" />
                  <div className="h-4 w-1/2 bg-base-200/50 animate-pulse rounded-md" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-base-200/50 animate-pulse rounded-md" />
                  <div className="h-4 w-5/6 bg-base-200/50 animate-pulse rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
