import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { SchoolCardProps } from "./types";

export function SchoolCard({ school, clubs }: SchoolCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 p-6">
        <div className="flex items-center gap-4">
          {/* Removed school featuredImage as it doesn't exist in Directus schema */}
          <div>
            <h3 className="text-lg font-semibold">{school.name}</h3>
            <div className="text-sm text-slate-500">
              {clubs.length} câu lạc bộ
            </div>
          </div>
        </div>
        {school.slug && (
          <div className="text-sm font-mono font-medium text-cardinal-600 bg-cardinal-50 px-2 py-1 rounded">
            {school.slug.toUpperCase()}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {clubs.map((club) => (
            <Link
              key={club.id} // Use id
              href={`/network/${club.id}`} // Link using id
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Removed club featuredImage */}
                <span className="font-medium">{club.name}</span> {/* Use club.name */}
              </div>
              <div className="text-sm text-slate-500">
                {club.members_count ?? 0} thành viên {/* Use club.members_count */}
              </div>
            </Link>
          ))}

          {clubs.length === 0 && (
            <div className="p-4 text-center text-slate-500">
              Chưa có câu lạc bộ nào
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
