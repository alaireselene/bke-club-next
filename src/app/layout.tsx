import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getNavigationData } from "./lib/navigation";

export const metadata: Metadata = {
  title: {
    default: "Mạng lưới CLB sinh viên nghiên cứu khoa học | HUST",
    template: "%s | HUST Research Clubs Network",
  },
  description:
    "Cổng thông tin điện tử của Mạng lưới CLB sinh viên nghiên cứu khoa học - Trung tâm Sáng tạo và Khởi nghiệp Sinh viên, Đại học Bách khoa Hà Nội",
  applicationName: "HUST Research Clubs Network Portal",
  authors: [{ name: "HUST Student Innovation & Entrepreneurship Center" }],
  keywords: [
    "HUST",
    "Research Clubs",
    "Student Research",
    "Innovation",
    "Entrepreneurship",
    "Bách khoa Hà Nội",
    "CLB nghiên cứu",
  ],
  creator: "HUST Student Innovation & Entrepreneurship Center",
  publisher: "Hanoi University of Science and Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { schools, clubs } = await getNavigationData();

  return (
    <html lang="vi">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-chalk-100 antialiased">
        <Header schools={schools} clubs={clubs} />

        {/* Main Content */}
        <main className="mt-32 flex-grow pb-20">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
