import { MapPin, Phone, Mail } from "lucide-react";

export function ContactInfo() {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold">Liên hệ</h2>
      <div className="card bg-base-200">
        <div className="card-body space-y-4">
          <div className="flex items-center">
            <MapPin className="text-primary mr-3 h-5 w-5" />
            <span className="text-base-content/70">
              Tầng 2, Tòa Digital Hub
              <br />
              Đại học Bách khoa Hà Nội
              <br />
              Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
            </span>
          </div>

          <div className="flex items-center">
            <Phone className="text-primary mr-3 h-5 w-5" />
            <a
              href="tel:+84934788266"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              0934 788 266
            </a>
          </div>

          <div className="flex items-center">
            <Mail className="text-primary mr-3 h-5 w-5" />
            <a
              href="mailto:stkn@hust.edu.vn"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              stkn@hust.edu.vn
            </a>
          </div>

          <div className="divider"></div>

          <p className="text-sm text-base-content/70">
            Có ý kiến đóng góp hoặc câu hỏi? Hãy liên hệ với chúng tôi qua email
            hoặc điện thoại. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
          </p>
        </div>
      </div>
    </section>
  );
}
