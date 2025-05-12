import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { directus } from "@/lib/directus"
import type { FeaturedLink as FeaturedLinkType } from "@/lib/directus"
import { readItems } from "@directus/sdk"

async function getFeaturedLinks() {
  const response = await directus.request(
    readItems('featured_link', {
      fields: ['*'],
      filter: {
        status: {
          _eq: 'published'
        }
      }
    })
  )
  return response as FeaturedLinkType[]
}

export default async function FeaturedLink() {
  const featuredLinks = await getFeaturedLinks()

  if (featuredLinks.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto my-12 relative rounded-lg overflow-hidden">
      {/* Carousel container */}
      <div className="relative h-[500px]">
        {/* Current slide */}
        <div className="relative h-full">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${featuredLinks[0].image}`}
              alt={featuredLinks[0].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col justify-between p-8">
            {/* Text Content */}
            <div className="flex-1 flex items-center">
              <div className="max-w-2xl text-white">
                <h2 className="text-3xl font-bold mb-4">{featuredLinks[0].title}</h2>
                <p className="text-lg mb-6">{featuredLinks[0].description}</p>
                <a
                  href={featuredLinks[0].url}
                  className="px-6 py-2 bg-white text-red-500 rounded-md inline-block hover:bg-gray-100 transition-colors"
                >
                  Xem thêm
                </a>
              </div>
            </div>

            {/* Navigation and Indicators */}
            <div className="flex items-center justify-end gap-2">
              <button
                className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center mx-2">
                {featuredLinks.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full mx-1 transition-all",
                      index === 0 ? "bg-white w-4" : "bg-white/50",
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              <button
                className="p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 