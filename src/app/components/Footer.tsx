"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, MapPin, Mail, Phone } from "lucide-react";

const quickLinks = [
  { href: "/about", text: "Giới thiệu" },
  { href: "/news", text: "Tin tức" },
  { href: "/events", text: "Sự kiện" },
  { href: "/research", text: "Sinh viên NCKH" },
  { href: "/resources", text: "Tài nguyên" },
];

const resourceLinks = [
  { href: "/resources/facilities", text: "Cơ sở vật chất" },
  { href: "/resources/docs", text: "Tài liệu" },
  { href: "/resources/templates", text: "Biểu mẫu" },
  { href: "/faq", text: "Câu hỏi thường gặp" },
];

export function Footer() {
  return (
    <footer className="border-cardinal-100 bg-chalk-50 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-6">
              <Image
                src="/logo.svg"
                alt="HUST Research Clubs Network Logo"
                width={120}
                height={120}
                className="h-30 w-auto"
              />
              <p className="text-base text-slate-600">
                Trung tâm Sáng tạo và Khởi nghiệp Sinh viên
                <br />
                Đại học Bách khoa Hà Nội
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/BKEntrepreneurshipCenter"
                  className="hover:text-cardinal-600 text-slate-500 transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-cardinal-900 font-sans text-sm font-bold tracking-wide uppercase">
                Liên kết nhanh
              </h3>
              <ul className="mt-6 space-y-3">
                {quickLinks.map(({ href, text }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-cardinal-600 text-sm text-slate-600 transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-cardinal-900 font-sans text-sm font-bold tracking-wide uppercase">
                Tài nguyên
              </h3>
              <ul className="mt-6 space-y-3">
                {resourceLinks.map(({ href, text }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-cardinal-600 text-sm text-slate-600 transition-colors"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-cardinal-900 font-sans text-sm font-bold tracking-wide uppercase">
                Liên hệ
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-600">
                <li className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-slate-400" />
                  <div>
                    Tầng 2, Tòa Digital Hub
                    <br />
                    Đại học Bách khoa Hà Nội
                    <br />
                    Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-slate-400" />
                  <a
                    href="mailto:stkn@hust.edu.vn"
                    className="hover:text-cardinal-600 transition-colors"
                  >
                    stkn@hust.edu.vn
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-slate-400" />
                  <a
                    href="tel:0911550986"
                    className="hover:text-cardinal-600 transition-colors"
                  >
                    0911550986 (Mr. Điển)
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="tel:0983900429"
                    className="hover:text-cardinal-600 transition-colors"
                  >
                    0983900429 (Mr. Chiến)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-cardinal-100 mt-16 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-slate-600">
                © {new Date().getFullYear()} Đại học Bách khoa Hà Nội. Bảo lưu
                mọi quyền.
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <Link
                  href="/privacy"
                  className="hover:text-cardinal-600 transition-colors"
                >
                  Chính sách bảo mật
                </Link>
                <span className="text-cardinal-200">|</span>
                <Link
                  href="/terms"
                  className="hover:text-cardinal-600 transition-colors"
                >
                  Điều khoản dịch vụ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
