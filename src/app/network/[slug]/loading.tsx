import { PageHeader } from "@/components/layout/PageHeader/PageHeader";

export default function ClubLoading() {
  return (
    <>
      <PageHeader title="Loading..." />

      <div className="container mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-md animate-pulse">
          <div className="card-body">
            {/* School badge skeleton */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-16 rounded bg-base-300" />
              <div className="h-6 w-48 rounded bg-base-300" />
            </div>

            {/* Leadership Section skeleton */}
            <div className="card bg-base-200 mb-8">
              <div className="card-body">
                <div className="h-8 w-48 rounded bg-base-300 mb-6" />

                <div className="grid gap-6 md:grid-cols-2">
                  {/* President skeleton */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-base-300" />
                      <div className="h-5 w-24 rounded bg-base-300" />
                    </div>
                    <div className="ml-7 h-5 w-32 rounded bg-base-300" />
                  </div>

                  {/* Advisors skeleton */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-base-300" />
                      <div className="h-5 w-24 rounded bg-base-300" />
                    </div>
                    <div className="ml-7 h-5 w-48 rounded bg-base-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats skeleton */}
            <div className="mb-8 flex items-center space-x-8">
              {/* Members stat */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-base-300" />
                <div className="h-5 w-32 rounded bg-base-300" />
              </div>

              {/* Established year stat */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-base-300" />
                <div className="h-5 w-40 rounded bg-base-300" />
              </div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-4">
              <div className="h-4 w-full rounded bg-base-300" />
              <div className="h-4 w-5/6 rounded bg-base-300" />
              <div className="h-4 w-4/6 rounded bg-base-300" />
              <div className="h-4 w-3/4 rounded bg-base-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
