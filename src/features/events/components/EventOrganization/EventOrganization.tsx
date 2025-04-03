"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import type { EventOrganizationProps } from "./types";

export function EventOrganization({ host, sponsors }: EventOrganizationProps) {
  return (
    <Card className="transition-shadow hover:shadow-md"> {/* Replace div with Card */}
      <CardContent className="space-y-6 p-6"> {/* Adjust spacing */}
      {host && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground"> {/* Use text-foreground, slightly bolder */}
            Điều phối viên
          </h3>
          <div className="flex items-center gap-4">
            {host.avatarUrl && (
              <Image
                src={host.avatarUrl}
                alt={host.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary ring-offset-2 ring-offset-background"
              />
            )}
            <div>
              <p className="font-medium text-foreground">{host.name}</p> {/* Use text-foreground */}
              {host.role && (
                <p className="text-sm text-muted-foreground">{host.role}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {sponsors && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground"> {/* Use text-foreground, slightly bolder */}
            Được tài trợ bởi
          </h3>
          <div className="flex flex-wrap gap-4">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="flex items-center gap-3 rounded-lg bg-muted p-3 transition hover:bg-accent hover:text-accent-foreground group" // Added group class for hover effect on child span
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
                <span className="text-sm font-medium text-muted-foreground group-hover:text-accent-foreground">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      </CardContent>
    </Card>
  );
}
