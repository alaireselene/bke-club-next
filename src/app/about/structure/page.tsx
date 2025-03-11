import { Metadata } from "next";
import { PageHeader } from "@/app/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Cơ cấu tổ chức | HUST Research Clubs Network",
  description:
    "Cơ cấu tổ chức của Mạng lưới Câu lạc bộ Sinh viên Nghiên cứu Khoa học HUST",
};

export default function AboutStructurePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Cơ cấu tổ chức"
          description="Cơ cấu tổ chức của Mạng lưới"
        />

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Ban điều hành</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-primary mb-2 text-xl font-medium">
                    Giám đốc
                  </h3>
                  <p className="text-base-content">Prof. Dr. Nguyen Van A</p>
                  <p className="text-sm text-base-content/70">
                    Oversees strategic direction and network development
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title text-primary mb-2 text-xl font-medium">
                    Phó Giám đốc
                  </h3>
                  <p className="text-base-content">
                    Assoc. Prof. Dr. Tran Thi B
                  </p>
                  <p className="text-sm text-base-content/70">
                    Manages day-to-day operations and program coordination
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
