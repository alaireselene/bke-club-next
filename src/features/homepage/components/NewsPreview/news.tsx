import { NewsCard } from "@/features/news/components/NewsCardNew/news-card"
import { directus } from "@/lib/directus"
import type { Post } from "@/lib/directus"
import { readItems } from "@directus/sdk"

async function getNews() {
  const response = await directus.request(
    readItems('post', {
      fields: ['*'],
      limit: 3,
      sort: ['-date_created'],
    })
  )
  return response as Post[]
}

export default async function News() {
  const news = await getNews()

  return (
    <section className="border border-dashed border-gray-300 rounded-lg p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">
        TIN TỨC | <span className="text-sm font-normal text-gray-500">Tin cụ thể hơn</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
        {news.map((item) => {
          // Parse categories if it's a string
          let categories: string[] = []
          try {
            categories = typeof item.categories === 'string' 
              ? JSON.parse(item.categories) 
              : Array.isArray(item.categories) 
                ? item.categories 
                : []
          } catch (e) {
            console.error("Error parsing categories:", e)
          }

          return (
            <NewsCard
              key={item.id}
              title={item.title}
              summary={item.content.substring(0, 150) + '...'}
              image={item.preview_image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${item.preview_image}` : "/placeholder.svg"}
              date={item.date_created || new Date().toISOString()}
              categories={categories}
              href={`/tin-tuc/${item.id}`}
            />
          )
        })}
      </div>
    </section>
  )
}
