import Link from "next/link";
import Image from "next/image";
import type { School, Club } from "@/types/wordpress";

interface Props {
  school: School;
  clubs: Club[];
}

export function SchoolCard({ school, clubs }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200/60">
      {/* School Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          {school.featuredImage && (
            <Image
              src={school.featuredImage.node.sourceUrl}
              alt={school.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
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
      </div>

      {/* Clubs List */}
      <div className="divide-y divide-slate-100">
        {clubs.map((club) => (
          <Link
            key={club.id}
            href={`/network/${club.slug}`}
            className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {club.featuredImage && (
                <Image
                  src={club.featuredImage.node.sourceUrl}
                  alt={club.title}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{club.title}</span>
            </div>
            <div className="text-sm text-slate-500">
              {club.clubData?.membersCount} thành viên
            </div>
          </Link>
        ))}

        {clubs.length === 0 && (
          <div className="p-4 text-center text-slate-500">
            Chưa có câu lạc bộ nào
          </div>
        )}
      </div>
    </div>
  );
}
