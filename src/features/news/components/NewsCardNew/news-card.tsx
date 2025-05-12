import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { vi } from "date-fns/locale"

interface NewsCardProps {
  title: string
  summary: string
  image: string
  date: string
  categories: string[]
  href?: string
}

export function NewsCard({ title, summary, image, date, categories, href = "#" }: NewsCardProps) {
  const formattedDate = format(parseISO(date), "yyyy MMM d", { locale: vi })

  return (
    <Link href={href} className="block group h-full">
      <div className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="mb-2 line-clamp-2 text-lg font-medium group-hover:text-red-500">{title}</h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 flex-grow">{summary}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-gray-500">{formattedDate}</span>
            {categories[0] && <span className="rounded bg-gray-100 px-2 py-1 text-xs">{categories[0]}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
