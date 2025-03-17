import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  href?: string;
  label: string;
  current?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbItems,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background with gradient, pattern, and glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cardinal-800 via-cardinal-700 to-cardinal-600 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_60%)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.2)_0%,transparent_60%)]">
        {/* Scientific pattern overlay with animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] animate-[grid-fade_2s_ease-in-out]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] animate-[grid-fade_3s_ease-in-out]"></div>
        </div>
        <div className="absolute right-0 top-0 h-64 w-64 bg-white/10 rounded-bl-full"></div>
        <div className="absolute -left-10 top-10 h-20 w-20 rounded-full border border-dashed border-white/20 opacity-60"></div>
        <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full border border-dashed border-white/20 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <div className="pt-8 pb-12">
          {/* Breadcrumb */}
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <Breadcrumb className="mb-8">
              <BreadcrumbList className="text-white/80">
                {breadcrumbItems.map((item, index) => (
                  <BreadcrumbItem key={item.label + index}>
                    {item.current ? (
                      <BreadcrumbPage className="text-white/80">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.href}
                        className="text-white/80 hover:text-white"
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                    {index < breadcrumbItems.length - 1 && (
                      <BreadcrumbSeparator className="text-white/60" />
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {/* Title and Description */}
          <div className="max-w-3xl relative">
            <div className="absolute -inset-1 bg-white/5 rounded-2xl blur-2xl"></div>
            <div className="relative">
              <h1
                className={cn(
                  "text-4xl font-bold text-white mb-4 animate-fade-in",
                  "group relative"
                )}
              >
                {title}
                <div className="absolute -inset-x-6 -inset-y-4 bg-white/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </h1>
              {description && (
                <p className="text-lg text-white/80 animate-fade-in [animation-delay:200ms]">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
