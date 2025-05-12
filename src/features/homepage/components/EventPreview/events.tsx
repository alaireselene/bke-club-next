import { format, parseISO } from "date-fns"
import { vi } from "date-fns/locale"
import { directus } from "@/lib/directus"
import type { Event } from "@/lib/directus"
import { readItems } from "@directus/sdk"

async function getEvents() {
  const response = await directus.request(
    readItems('event', {
      fields: ['*'],
      limit: 4,
      sort: ['event_start'],
      // filter: {
      //   event_start: {
      //     _gt: new Date().toISOString()
      //   }
      // }
    })
  )
  return response as Event[]
}

export default async function Events() {
  const events = await getEvents()

  const formatEventDate = (dateString: string) => {
    const date = parseISO(dateString)
    return {
      day: format(date, "dd", { locale: vi }),
      month: format(date, "MM", { locale: vi }),
    }
  }

  return (
    <section className="border border-dashed border-gray-300 rounded-lg p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold mb-4">
        SỰ KIỆN | <span className="text-sm font-normal text-gray-500">Tin cụ thể hơn</span>
      </h2>

      <div className="space-y-4 flex-grow">
        {events.map((event) => {
          const { day, month } = formatEventDate(event.event_start)
          return (
            <div key={event.id} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-500 flex flex-col items-center justify-center rounded">
                <span className="font-bold">{day}</span>
                <span className="text-xs">Thg {month}</span>
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-cardinal-600 sm:text-xl">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="text-xs text-gray-400">
                  {format(parseISO(event.event_start), "dd/MM/yyyy", { locale: vi })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
