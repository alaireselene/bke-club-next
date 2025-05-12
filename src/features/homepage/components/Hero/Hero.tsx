import Image from "next/image"
import { Users, Building2, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center overflow-hidden pt-24 md:pt-32">
      {/* Full background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_image.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Tech overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        </div>
      </div>

      {/* Content overlay */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm text-white/90">Mạng lưới CLB sinh viên nghiên cứu</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Kết nối, hỗ trợ,<br />
              <span className="text-red-400">Thúc đẩy phát triển</span>
            </h1>
            <p className="text-lg text-white/80">
              Mạng lưới kết nối các CLB sinh viên nghiên cứu, thúc đẩy sáng tạo và đổi mới tại Đại học Bách khoa Hà Nội
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="group px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
              <span>Trang chính</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors">
              Cơ sở vật chất
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            <Link href="/network" className="rounded-xl p-4 flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
              <div className="w-10 h-10 bg-white/20 rounded-xl mb-3 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">20+</h3>
              <p className="text-xs text-white/80 text-center">câu lạc bộ</p>
            </Link>
            <Link href="/partners" className="rounded-xl p-4 flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
              <div className="w-10 h-10 bg-white/20 rounded-xl mb-3 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">25</h3>
              <p className="text-xs text-white/80 text-center">đối tác</p>
            </Link>
            <Link href="/network" className="rounded-xl p-4 flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors">
              <div className="w-10 h-10 bg-white/20 rounded-xl mb-3 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">472+</h3>
              <p className="text-xs text-white/80 text-center">thành viên</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="absolute bottom-8 left-0 w-full text-center text-white/60 text-sm flex items-center justify-center">
        <span className="mr-2">→</span>
        Kéo xuống để xem thêm
      </div>
    </section>
  )
}
