import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";

export const metadata = {
  title: "Giới thiệu - Mạng lưới CLB Sinh viên NCKH",
  description:
    "Tổng quan về Mạng lưới CLB Sinh viên NCKH - Đại học Bách khoa Hà Nội",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl sm:text-5xl font-bold text-cardinal-600 mb-10">Giới thiệu</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/about/overview" className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl">
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 flex-row items-center gap-3 p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                Tổng quan
              </CardTitle>
              <CardAction>
                <ArrowUpRight className="h-5 w-5 text-cardinal-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary group-focus-within:text-primary" />
              </CardAction>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="text-base sm:text-lg text-muted-foreground">
                Thông tin tổng quan về lịch sử, sứ mệnh, tầm nhìn và các hoạt động chính của mạng lưới.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-primary text-sm font-semibold group-hover:underline">
                Xem chi tiết
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/about/structure" className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl">
          <Card className="group h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg focus-within:shadow-lg bg-card border border-border hover:border-primary/30 focus-within:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl duration-200">
            <CardHeader className="pb-2 flex-row items-center gap-3 p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                Cơ cấu tổ chức
              </CardTitle>
              <CardAction>
                <ArrowUpRight className="h-5 w-5 text-cardinal-600 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary group-focus-within:text-primary" />
              </CardAction>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <p className="text-base sm:text-lg text-muted-foreground">
                Thông tin về cấu trúc tổ chức, ban điều hành, và các đơn vị thành viên trong mạng lưới.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-primary text-sm font-semibold group-hover:underline">
                Xem chi tiết
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
