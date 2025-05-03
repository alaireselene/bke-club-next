import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Tổng quan - Mạng lưới CLB Sinh viên NCKH",
  description:
    "Tổng quan về lịch sử, sứ mệnh, tầm nhìn và các hoạt động của Mạng lưới CLB Sinh viên NCKH",
};

export default function OverviewPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold text-cardinal-600">Tổng quan</h1>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold text-cardinal-700">Lịch sử</h2>
        <div className="mt-4 space-y-4">
          <p>
            Mạng lưới Câu lạc bộ Sinh viên Nghiên cứu Khoa học (CLB SVNCKH),
            trực thuộc Trung tâm Sáng tạo và Khởi nghiệp Sinh viên, Đại học Bách
            khoa Hà Nội, được thành lập năm 2025 nhằm thúc đẩy hoạt động nghiên
            cứu, đổi mới sáng tạo và ứng dụng khoa học - công nghệ vào thực
            tiễn.
          </p>
          <p>
            Trong bối cảnh đất nước đẩy mạnh phát triển khoa học - công nghệ,
            đổi mới sáng tạo và chuyển đổi số, Mạng lưới CLB SVNCKH đóng vai trò
            là cầu nối quan trọng, góp phần thúc đẩy và phát triển các hoạt động
            nghiên cứu khoa học trong sinh viên. Thông qua đó, sinh viên có cơ
            hội tiếp cận các xu hướng công nghệ mới, rèn luyện tư duy, nâng cao
            kỹ năng nghiên cứu, tham gia các dự án khoa học có tính ứng dụng cao
            và công bố các ấn phẩm khoa học.
          </p>
          <p>
            Với sự đồng hành và hỗ trợ từ Đại học Bách khoa Hà Nội, các đơn vị,
            tổ chức đào tạo nghiên cứu trong và ngoài nước, các tập đoàn, doanh
            nghiệp, các công ty khởi nghiệp, Mạng lưới CLB SVNCKH không chỉ giúp
            sinh viên nâng cao năng lực nghiên cứu mà còn tạo điều kiện để sinh
            viên tham gia vào quá trình hiện thực hóa Nghị quyết 57 của Bộ Chính
            trị về việc thúc đẩy khoa học - công nghệ, đổi mới sáng tạo và
            chuyển đổi số.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">Sứ mệnh</h2>
        <div className="mt-4">
          <p className="font-medium text-gray-800">
            Mạng lưới Câu lạc bộ Sinh viên Nghiên cứu Khoa học hoạt động theo
            định hướng của Nghị quyết 57 của Bộ Chính trị, tập trung vào các mục
            tiêu trọng tâm sau:
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2">
            <li>
              Phát triển năng lực nghiên cứu và đổi mới sáng tạo của sinh viên,
              tạo nền tảng vững chắc để họ trở thành lực lượng nòng cốt trong sự
              phát triển khoa học - công nghệ của đất nước.
            </li>
            <li>
              Thúc đẩy ứng dụng khoa học - công nghệ vào thực tiễn, góp phần
              hiện đại hóa các lĩnh vực trọng điểm như giáo dục, y tế, công
              nghiệp và quản trị công.
            </li>
            <li>
              Mở rộng hợp tác trong nước và quốc tế, nâng cao vị thế của sinh
              viên Đại học Bách khoa Hà Nội trên bản đồ khoa học - công nghệ
              toàn cầu.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">Tầm nhìn</h2>
        <div className="mt-4">
          <p className="font-medium text-gray-800">
            Đến năm 2030, Mạng lưới Câu lạc bộ Sinh viên Nghiên cứu Khoa học
            hướng đến trở thành:
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2">
            <li>
              <span className="font-bold">
                Mạng lưới nghiên cứu khoa học sinh viên hàng đầu Việt Nam
              </span>
              , quy tụ các tài năng trẻ trong lĩnh vực khoa học - công nghệ, góp
              phần xây dựng hệ sinh thái đổi mới sáng tạo bền vững
            </li>
            <li>
              <span className="font-bold">
                Cầu nối giữa sinh viên với các cơ quan, cơ sở đào tạo - nghiên
                cứu, tổ chức và doanh nghiệp
              </span>
              , tạo điều kiện để sinh viên tham gia vào các dự án thực tế, giải
              quyết các thách thức trong kỷ nguyên số.
            </li>
            <li>
              <span className="font-bold">
                Bệ phóng cho các đề tài và dự án nghiên cứu khoa học, đổi mới
                sáng tạo tiềm năng
              </span>
              , hỗ trợ sinh viên hiện thực hóa ý tưởng thành sản phẩm và giải
              pháp có giá trị ứng dụng cao trong xã hội.
            </li>
            <li>
              <span className="font-bold">
                Trung tâm kết nối và hội nhập quốc tế
              </span>
              , giúp sinh viên tiếp cận các mạng lưới nghiên cứu, cuộc thi khoa
              học và chương trình hợp tác quốc tế, qua đó nâng cao năng lực và
              khẳng định vị thế của tài năng trẻ Việt Nam trên bản đồ khoa học -
              công nghệ toàn cầu.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Giá trị cốt lõi
        </h2>
        <p> Mạng lưới hoạt động dựa trên các nguyên tắc </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 p-6">
              <CardTitle className="text-xl font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                Tiên phong
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li>
                  Dẫn đầu trong nghiên cứu khoa học sinh viên, ứng dụng công nghệ và đổi mới sáng tạo để giải quyết các vấn đề thực tiễn trong cuộc sống.
                </li>
                <li>
                  Chủ động khai phá những hướng đi mới, giải quyết các thách thức khoa học và công nghệ, thúc đẩy sự phát triển bền vững.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 p-6">
              <CardTitle className="text-xl font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                Sáng tạo
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li>
                  Không ngừng đổi mới tư duy, phương pháp và cách tiếp cận trong nghiên cứu.
                </li>
                <li>
                  Khuyến khích các ý tưởng đột phá, tư duy phản biện và tinh thần khởi nghiệp trong nghiên cứu khoa học.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 p-6">
              <CardTitle className="text-xl font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                Đột phá
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li>
                  Dám nghĩ, dám làm, thử nghiệm các ý tưởng tiên phong trong hoạt động nghiên cứu.
                </li>
                <li>
                  Đề xuất các ý tưởng mang tính cách mạng, tạo ra những bước tiến vượt bậc trong khoa học và đổi mới sáng tạo.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 p-6">
              <CardTitle className="text-xl font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                Kiên định
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li>
                  Kiên trì, bền bỉ và không bỏ cuộc trong quá trình nghiên cứu.
                </li>
                <li>
                  Sẵn sàng đối mặt với thách thức, không ngại khó khăn trong hành trình khám phá tri thức khoa học và công nghệ.
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 p-6">
              <CardTitle className="text-xl font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                Tiếp nối - Sáng tạo - Trách nhiệm
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                <li>
                  Kế thừa và phát triển các thành tựu khoa học - công nghệ, tạo nền tảng cho những đổi mới đột phá.
                </li>
                <li>
                  Đề cao tinh thần dấn thân, cống hiến tri thức vì sự phát triển của đất nước.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Chính sách chất lượng
        </h2>
        <div className="mt-4">
          <p className="font-medium text-gray-800 mb-4">Mạng lưới cam kết:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Thúc đẩy nghiên cứu và công bố khoa học, gắn với các định hướng
              phát triển khoa học - công nghệ quốc gia.
            </li>
            <li>
              Mở rộng hợp tác với doanh nghiệp và tổ chức nghiên cứu, đảm bảo
              sinh viên có cơ hội thực hành và ứng dụng công nghệ vào thực tiễn.
            </li>
            <li>
              Tổ chức các chương trình đào tạo, hội thảo về chuyển đổi số, giúp
              sinh viên trang bị kỹ năng và kiến thức cần thiết để tham gia vào
              cuộc Cách mạng công nghiệp 4.0.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-cardinal-700">
          Chiến lược phát triển
        </h2>
        <div className="mt-4">
          <p className="font-medium text-gray-800 mb-4">
            Mạng lưới Câu lạc bộ Sinh viên Nghiên cứu Khoa học tập trung vào các
            chiến lược trọng tâm:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-lg font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                  Đẩy mạnh đào tạo và nghiên cứu về công nghệ số
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  <li>
                    Đào tạo các kỹ năng nghiên cứu khoa học và các kỹ năng công bố các ấn phẩm khoa học
                  </li>
                  <li>
                    Tổ chức các khóa học về trí tuệ nhân tạo (AI), dữ liệu lớn (Big Data), Internet vạn vật (IoT) và an ninh mạng.
                  </li>
                  <li>
                    Hướng dẫn sinh viên tiếp cận các công nghệ tiên tiến, tham gia các dự án nghiên cứu về chuyển đổi số.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-lg font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                  Tăng cường trao đổi sinh viên, công bố khoa học và tham gia seminar
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  <li>
                    Khuyến khích sinh viên viết bài báo khoa học, công bố trên các tạp chí uy tín.
                  </li>
                  <li>
                    Hỗ trợ sinh viên tham gia hội nghị khoa học trong và ngoài nước nhằm học hỏi và mở rộng mạng lưới hợp tác.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-lg font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                  Thúc đẩy hợp tác giữa sinh viên và doanh nghiệp
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  <li>
                    Phối hợp với các tập đoàn công nghệ để triển khai chương trình thực tập sinh, thực tập kỹ thuật, thực tập tốt nghiệp, trao đổi sinh viên; và thực hiện các đề tài nghiên cứu ứng dụng.
                  </li>
                  <li>
                    Kết nối sinh viên với các chuyên gia và cố vấn trong ngành để hỗ trợ định hướng nghiên cứu.
                  </li>
                </ul>
              </CardContent>
            </Card>
            {/* Hỗ trợ khởi nghiệp đổi mới sáng tạo */}
            <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-lg font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                  Hỗ trợ khởi nghiệp đổi mới sáng tạo
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  <li>
                    Tạo cơ chế hỗ trợ tài chính và kết nối với các quỹ đầu tư, giúp sinh viên hiện thực hóa ý tưởng nghiên cứu thành sản phẩm thương mại.
                  </li>
                </ul>
              </CardContent>
            </Card>
            {/* Phát triển cơ sở vật chất và tài nguyên */}
            <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
              <CardHeader className="pb-2 p-6">
                <CardTitle className="text-lg font-bold text-cardinal-600 group-hover:text-primary transition-colors">
                  Phát triển cơ sở vật chất và tài nguyên
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  <li>
                    Phát triển và cập nhật các học liệu và hướng dẫn cách sử dụng các phần mềm
                  </li>
                  <li>
                    Hình thành trung tâm chế tạo phục vụ các đề tài và cuộc thi NCKH & ĐMST
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
