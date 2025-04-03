import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { SchoolCardProps } from "./types";
import { cn } from "@/lib/utils"; // Import cn

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
        {school.slug && (
          <div className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded"> {/* Use theme colors, adjusted size/padding */}
            {school.slug.toUpperCase()}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border"> {/* Use theme border color */}
          {clubs.map((club) => (
            <Link
              key={club.id} // Use id
              href={`/network/${club.id}`} // Link using id
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors" // Use theme hover color
            >
              <div className="flex items-center gap-3">
                {/* Removed club featuredImage */}
                <span className="font-medium">{club.name}</span> {/* Use club.name */}
              </div>
              <div className="text-sm text-muted-foreground"> {/* Use theme color */}
                {club.members_count ?? 0} thành viên {/* Use club.members_count */}
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
