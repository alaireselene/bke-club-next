import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { SchoolCardProps } from "./types";

/**
 * SchoolCard - Responsive, modern card for school display.
 *
 * Usage:
 * <SchoolCard school={school} clubs={clubs} />
 *
 * - Responsive, bold school name and club count
 * - Modern hover/focus effects
 * - Interactive club rows with icon
 */
export function SchoolCard({ school, clubs }: SchoolCardProps) {
  return (
    <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg">
      <CardHeader className="flex-row items-center justify-between space-y-0 p-6 pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">{school.name}</h3>
          <div className="text-sm text-muted-foreground mt-1">{clubs.length} câu lạc bộ</div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {clubs.map((club) => (
            <Link
              key={club.id}
              href={`/network/${club.slug}`}
              className="flex items-center justify-between p-4 hover:bg-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium line-clamp-1">{club.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{typeof club.members_count === 'number' ? club.members_count : "N/A"}</span>
              </div>
            </Link>
          ))}
          {clubs.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">Chưa có câu lạc bộ nào</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
