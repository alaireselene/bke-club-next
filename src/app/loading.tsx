export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative -mt-8 overflow-hidden bg-gradient-to-b from-base-100 to-base-200 px-4 pt-20 pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mx-auto h-12 w-2/3 rounded-lg bg-base-300 sm:h-16 md:h-20" />
            <div className="mx-auto mt-6 h-4 w-1/2 rounded bg-base-300" />

            {/* Stats Grid */}
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 sm:gap-x-12 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto h-14 w-14 rounded-xl bg-base-300" />
                  <div className="mx-auto mt-4 h-6 w-16 rounded bg-base-300" />
                  <div className="mx-auto mt-2 h-4 w-20 rounded bg-base-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Skeleton */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="mx-auto h-8 w-48 rounded bg-base-300" />
            <div className="mx-auto mt-4 h-4 w-96 rounded bg-base-300" />
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-12">
            {/* Hero Post */}
            <div className="lg:col-span-7">
              <div className="h-72 rounded-lg bg-base-300 sm:h-96" />
            </div>

            {/* Small Posts */}
            <div className="grid gap-6 lg:col-span-5 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 rounded-lg bg-base-300" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Skeleton */}
      <section className="bg-base-200 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <div className="mx-auto h-8 w-64 rounded bg-base-300" />
            <div className="mx-auto mt-4 h-4 w-96 rounded bg-base-300" />
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-12">
            {/* Small Events */}
            <div className="grid gap-6 lg:col-span-7 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 rounded-lg bg-base-300" />
              ))}
            </div>

            {/* Hero Event */}
            <div className="lg:col-span-5">
              <div className="h-72 rounded-lg bg-base-300 sm:h-96" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
