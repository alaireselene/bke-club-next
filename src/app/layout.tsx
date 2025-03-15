import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { getClient } from "@/lib/apollo-client";
import { GET_NAVIGATION_DATA } from "../lib/graphql/queries";
import { Toaster } from "@/components/ui/sonner";

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

async function getNavigationData() {
  const { data } = await getClient().query({
    query: GET_NAVIGATION_DATA,
    variables: {
      first: 100, // Get up to 100 clubs
    },
  });

  return {
    schools: data.schools.nodes,
    clubs: data.clubs.nodes,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { schools } = await getNavigationData();

  return (
    <html lang="vi">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-gradient-to-br from-white via-navy-50/10 to-cardinal-50/10 antialiased selection:bg-cardinal-600/10 selection:text-cardinal-900">
        <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <Header schools={schools} />

        {/* Main Content */}
        <main className="mt-28 flex-grow pb-20 transition-all duration-300 sm:mt-32">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            {children}
          </div>
        </main>

        <Footer />
        <Toaster position="top-center" closeButton richColors />
      </body>
    </html>
  );
}
