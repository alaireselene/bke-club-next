import { Phone, MapPin, Mail, Globe } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { ContactForm } from "@/features/contact/components/ContactForm";

export const metadata = {
  title: "Contact Us - Student Research Clubs Network",
  description:
    "Get in touch with the Student Research Clubs Network at Hanoi University of Technology",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <PageHeader
              title="Liên hệ"
              description="Chúng tôi luôn sẵn lòng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua thông tin dưới đây."
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Địa chỉ</h3>
                <p className="mt-1 text-gray-600">
                  Tòa Digital Hub, Đại học Bách Khoa Hà Nội, Số 1 Đại Cồ Việt,
                  Hai Bà Trưng, Hà Nội
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="mr-3 h-5 w-5 text-slate-400" />
              <a
                href="tel:0911550986"
                className="hover:text-cardinal-600 transition-colors"
              >
                0911550986 (PGS. Lương Xuân Điển)
              </a>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="mr-3 h-5 w-5 text-slate-400" />
              <a
                href="tel:0983900429"
                className="hover:text-cardinal-600 transition-colors"
              >
                0983900429 (TS. Nguyễn Bá Chiến)
              </a>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="mt-1 text-gray-600">stkn@hust.edu.vn</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Globe className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Thời gian làm việc
                </h3>
                <p className="mt-1 text-gray-600">
                  Thứ Hai - Thứ Sáu: 8:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
