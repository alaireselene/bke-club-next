import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { SchoolCardProps } from "./types";

export function SchoolCard({ school, clubs }: SchoolCardProps) {
  return (
    <Card className="interactive-hover"> {/* Added hover effect */}
      <CardHeader className="flex-row items-center justify-between space-y-0 p-6">
        <div className="flex items-center gap-4">
          {/* Removed school featuredImage as it doesn't exist in Directus schema */}
          <div>
            <h3 className="text-lg font-semibold">{school.name}</h3>
            <div className="text-sm text-muted-foreground"> {/* Use theme color */}
              {clubs.length} câu lạc bộ
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border"> {/* Use theme border color */}
          {clubs.map((club) => (
            <Link
              key={club.id}
              href={`/network/${club.slug}`}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Removed club featuredImage */}
                <span className="font-medium">{club.name}</span> {/* Use club.name */}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{(club.members_count || club.members_count !== 0) ? club.members_count : "N/A"}</span>
              </div>
            </Link>
          ))}

          {clubs.length === 0 && (
            <div className="p-4 text-center text-muted-foreground"> {/* Use theme color */}
              Chưa có câu lạc bộ nào
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
