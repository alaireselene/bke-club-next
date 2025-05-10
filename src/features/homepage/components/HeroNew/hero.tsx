import Image from "next/image"

export default function Hero() {
  return (
    <section className="min-h-screen pt-20 border border-dashed border-gray-300 relative flex items-center overflow-hidden">
      {/* Full background image placeholder */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Hero+Background"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="p-6 border border-dashed border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-red-500">Kết nối, hỗ trợ,</h2>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Thúc đẩy phát triển</h2>
          <p className="text-sm text-gray-600 mb-4">
            Trung tâm là nơi kết nối sinh viên trong và ngoài trường với các doanh nghiệp. Hỗ trợ sinh viên phát triển
            kỹ năng khởi nghiệp và đổi mới sáng tạo.
          </p>
          <div className="flex space-x-4 mt-4">
            <button className="px-4 py-2 bg-red-100 text-red-600 rounded-md">Trang chính</button>
            <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md">Cơ sở vật chất</button>
          </div>
        </div>

        <div className="p-6 border border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center bg-white">
              <div className="w-8 h-8 bg-gray-200 mb-2 flex items-center justify-center">
                <span className="text-xs">icon</span>
              </div>
              <h3 className="text-xl font-bold">20+</h3>
              <p className="text-sm text-center">câu lạc bộ</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center bg-white">
              <div className="w-8 h-8 bg-gray-200 mb-2 flex items-center justify-center">
                <span className="text-xs">icon</span>
              </div>
              <h3 className="text-xl font-bold">25</h3>
              <p className="text-sm text-center">đối tác</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-4 col-span-2 flex flex-col items-center bg-white">
              <div className="w-8 h-8 bg-gray-200 mb-2 flex items-center justify-center">
                <span className="text-xs">icon</span>
              </div>
              <h3 className="text-xl font-bold">472+</h3>
              <p className="text-sm text-center">thành viên</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="absolute bottom-4 left-0 w-full text-center text-red-500 text-sm flex items-center justify-center">
        <span className="mr-2">→</span>
        Kéo xuống để xem thêm
      </div>
    </section>
  )
}
