"use client";

import Image from "next/image";

interface EventOrganizationProps {
  host?: {
    name: string;
    role?: string;
    avatarUrl?: string;
  };
  sponsors?: Array<{
    name: string;
    logoUrl?: string;
  }>;
}

export function EventOrganization({ host, sponsors }: EventOrganizationProps) {
  return (
    <div className="space-y-8 rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm transition-shadow hover:shadow-md">
      {host && (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-base-content">
            Điều phối viên
          </h3>
          <div className="flex items-center gap-4">
            {host.avatarUrl && (
              <Image
                src={host.avatarUrl}
                alt={host.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-base-100"
              />
            )}
            <div>
              <p className="font-medium text-base-content">{host.name}</p>
              {host.role && (
                <p className="text-sm text-base-content/70">{host.role}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {sponsors && (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-base-content">
            Được tài trợ bởi
          </h3>
          <div className="flex flex-wrap gap-4">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center gap-3 rounded-lg bg-base-200 p-3 transition hover:bg-base-300"
              >
                {sponsor.logoUrl && (
                  <Image
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                )}
                <span className="text-sm font-medium text-base-content/80">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
