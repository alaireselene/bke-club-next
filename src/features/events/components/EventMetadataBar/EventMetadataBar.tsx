"use client";

import { Calendar, MapPin, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import { formatDatetime } from "@/lib/utils/date";
import type { EventMetadataBarProps } from "./types";

export function EventMetadataBar({
  startDate,
  endDate,
  location,
  isOnline,
}: EventMetadataBarProps) {
  return (
    <Card className="transition-shadow hover:shadow-md"> {/* Replace div with Card */}
      <CardContent className="grid gap-4 p-6 sm:grid-cols-3 sm:gap-6 sm:p-6"> {/* Adjust padding/gap */}
      <div className="flex items-start gap-3"> {/* Removed text color class */}
        <Calendar className="h-5 w-5 text-primary" />
        <div>
          <span className="font-medium text-foreground">Thời gian</span> {/* Use text-foreground */}
          <br />
          <span className="text-sm text-muted-foreground">{/* Use text-muted-foreground */}
            {formatDatetime(startDate)} - {formatDatetime(endDate)}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3"> {/* Removed text color class */}
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <span className="font-medium text-foreground">Địa điểm</span> {/* Use text-foreground */}
          <br />
          <span className="text-sm text-muted-foreground">{location || "Chưa xác định"}</span> {/* Use text-muted-foreground */}
        </div>
      </div>

      <div className="flex items-start gap-3"> {/* Removed text color class */}
        {isOnline ? (
          <>
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium text-foreground">Thể thức</span> {/* Use text-foreground */}
              <br />
              <span className="text-sm text-muted-foreground">Trực tuyến</span> {/* Use text-muted-foreground */}
            </div>
          </>
        ) : (
          <>
            <Users className="h-5 w-5 text-primary" />
            <div>
              <span className="font-medium text-foreground">Thể thức</span> {/* Use text-foreground */}
              <br />
              <span className="text-sm text-muted-foreground">Trực tiếp</span> {/* Use text-muted-foreground */}
            </div>
          </>
        )}
      </div>
      </CardContent>
    </Card>
  );
}
