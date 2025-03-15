import { PageHeader } from "@/app/components/ui/PageHeader";

export default function LoadingPartnerDetail() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <PageHeader
          title="..."
          breadcrumbItems={[
            { text: "Đối tác", href: "/partners" },
            { text: "...", href: "#" },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Info Card Skeleton */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              {/* Logo Skeleton */}
              <div className="h-48 bg-slate-200 animate-pulse" />

              {/* Info Skeleton */}
              <div className="p-6 space-y-6 animate-pulse">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-slate-200 rounded" />
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-slate-200 rounded" />
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-slate-200 rounded" />
                    <div className="h-4 w-40 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-6 space-y-6 animate-pulse">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                    <div className="h-4 bg-slate-200 rounded w-4/6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
