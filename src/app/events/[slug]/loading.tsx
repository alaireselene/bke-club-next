export default function EventLoadingPage() {
  return (
    <div className="animate-pulse">
      <div className="h-16 mb-8 w-1/3 bg-base-200 rounded-lg" />

      {/* Banner shimmer */}
      <div className="relative overflow-hidden rounded-2xl bg-base-200 p-10 shadow-xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6 lg:w-1/2">
            <div className="h-12 w-3/4 bg-base-300 rounded-lg" />
            <div className="h-24 w-full bg-base-300 rounded-lg" />
          </div>
          <div className="lg:w-1/3">
            <div className="h-64 w-full bg-base-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content shimmer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-6 rounded-xl border border-base-200 bg-base-100 p-8 mb-8 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-5 w-5 bg-base-300 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-20 bg-base-300 rounded" />
                <div className="h-4 w-32 bg-base-300 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Content blocks */}
        <div className="space-y-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-base-200 rounded" />
          ))}
        </div>

        {/* Organization card */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-6">
          <div className="space-y-4">
            <div className="h-5 w-32 bg-base-200 rounded" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-base-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-base-200 rounded" />
                <div className="h-3 w-32 bg-base-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
