import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function MissionCTA() {
  return (
    <section className="container mx-auto my-12 py-12 px-6 md:px-12 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 shadow-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">Sứ mệnh phát triển tài năng trẻ Việt Nam</h2>

        <p className="text-lg text-gray-700 mb-8">
          Chúng tôi mang sứ mệnh đào tạo và phát triển thế hệ nhà nghiên cứu
          trẻ, góp phần vào sự phát triển bền vững của đất nước thông qua đổi mới sáng tạo và tinh thần nghiên cứu không ngừng.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/about"
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            Tìm hiểu thêm về chúng tôi
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/events"
            className="px-6 py-3 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Xem sự kiện sắp tới
          </Link>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase text-gray-500 tracking-wider">Đối tác chiến lược</span>
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs text-gray-400">Logo</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
