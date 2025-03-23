import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { GET_PARTNERS } from "@/lib/graphql/queries";
import { PageHeader } from "@/components/layout/PageHeader/PageHeader";
import { PartnersList } from "@/app/components/partners/PartnersList";
import type { Partner } from "@/types/wordpress";

export const metadata: Metadata = {
  title: "Đối tác | HUST Research Clubs Network",
  description: "Đối tác trong nước và quốc tế của Mạng lưới",
};

interface PartnersData {
  partners: {
    nodes: Partner[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

async function getPartnersData() {
  const { data } = await getClient().query<PartnersData>({
    query: GET_PARTNERS,
    variables: {
      first: 100,
    },
  });

  return {
    partners: data.partners.nodes,
  };
}

export default async function PartnersPage() {
  const { partners } = await getPartnersData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/20 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#003366] opacity-5 -rotate-1" />
          <PageHeader
            title="Đối tác"
            description="Đối tác trong nước và quốc tế của Mạng lưới"
            className="relative bg-white/50 backdrop-blur-sm p-8 rounded-xl border border-slate-200/60"
          />
        </div>

        <div className="space-y-12">
          <div className="prose prose-lg max-w-none">
            <p className="lead text-muted-foreground">
              Nhằm thúc đẩy nghiên cứu khoa học và đổi mới sáng tạo trong cộng
              đồng sinh viên Đại học Bách khoa Hà Nội, mạng lưới đối tác được mở
              rộng và phát triển trên nhiều lĩnh vực, bao gồm hợp tác quốc tế,
              học thuật, và doanh nghiệp.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Mạng lưới quốc tế
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Hợp tác với các tổ chức, trường đại học và doanh nghiệp nước
                ngoài để hỗ trợ nghiên cứu khoa học sinh viên, trao đổi học
                thuật và thúc đẩy đổi mới sáng tạo. Các chương trình chính bao
                gồm:
              </p>
              <ul className="space-y-4">
                <li>
                  Chương trình trao đổi sinh viên và giảng viên với các đại học
                  đối tác như Tokyo Tech (Nhật Bản), Nanyang Technological
                  University (Singapore), ETH Zurich (Thụy Sĩ)...
                </li>
                <li>
                  Hợp tác nghiên cứu khoa học với các trung tâm nghiên cứu hàng
                  đầu thế giới trong lĩnh vực STEM, AI, IoT, năng lượng tái
                  tạo,...
                </li>
                <li>
                  Tham gia hội thảo và sự kiện quốc tế về công nghệ và nghiên
                  cứu khoa học, tạo cơ hội kết nối và hợp tác xuyên biên giới.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Đối tác học thuật
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Xây dựng liên kết với các viện nghiên cứu, trường đại học, và
                trung tâm đào tạo nhằm nâng cao chất lượng nghiên cứu khoa học
                của sinh viên.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Đối tác doanh nghiệp
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Tăng cường kết nối với các doanh nghiệp công nghệ và công nghiệp
                hàng đầu, tạo cơ hội ứng dụng nghiên cứu khoa học vào thực tế.
              </p>
            </div>
          </section>

          <PartnersList partners={partners} />
        </div>
      </div>
    </main>
  );
}
