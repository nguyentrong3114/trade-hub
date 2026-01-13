import { getTranslations } from "next-intl/server";
import { Client } from "@/components/clients/clientsSection";
import ClientsExplorer from "@/components/clients/ClientsExplorer";
import Link from "next/link";

// Helper function to decode slug back to Vietnamese text
const unslugify = (slug: string): string => {
  const slugToCategory: Record<string, string> = {
    "cong-nghe": "Công nghệ",
    "thuong-mai": "Thương mại",
    "truyen-thong": "Truyền thông",
    "san-xuat": "Sản xuất",
    "tu-van": "Tư vấn",
    "giao-duc": "Giáo dục",
    "tai-chinh": "Tài chính",
    "logistics": "Logistics",
    "dau-tu": "Đầu tư",
    "bat-dong-san": "Bất động sản",
    "y-te": "Y tế"
  };
  
  return slugToCategory[slug] || slug;
};

// Sample clients data - có thể lấy từ API hoặc database
const CLIENTS: (Client & { category: string; rank: string })[] = [
  {
    id: 1,
    name: "TechNova Solutions",
    description: "Công ty công nghệ chuyên phát triển giải pháp phần mềm cho doanh nghiệp. Đối tác chiến lược của chúng tôi trong lĩnh vực công nghệ thông tin.",
    logo: "/img/logo/1.png",
    category: "Công nghệ",
    rank: "Platinum",
  },
  {
    id: 2,
    name: "GreenLeaf Trading",
    description: "Doanh nghiệp thương mại với hệ thống phân phối toàn quốc. Chuyên về xuất nhập khẩu và phân phối hàng hóa chất lượng cao.",
    logo: "/img/logo/2.png",
    category: "Thương mại",
    rank: "Gold",
  },
  {
    id: 3,
    name: "BrightMedia Agency",
    description: "Đơn vị truyền thông và marketing sáng tạo hàng đầu. Hỗ trợ chúng tôi trong các chiến dịch quảng bá và xây dựng thương hiệu.",
    logo: "/img/logo/3.png",
    category: "Truyền thông",
    rank: "Gold",
  },
  {
    id: 4,
    name: "NextGen Manufacturing",
    description: "Công ty sản xuất ứng dụng công nghệ hiện đại. Đối tác trong việc phát triển và sản xuất các sản phẩm công nghệ cao.",
    logo: "/img/logo/4.png",
    category: "Sản xuất",
    rank: "Silver",
  },
  {
    id: 5,
    name: "Skyline Consulting",
    description: "Đơn vị tư vấn giải pháp cho doanh nghiệp. Cung cấp các dịch vụ tư vấn chiến lược và quản trị doanh nghiệp chuyên nghiệp.",
    logo: "/img/logo/5.png",
    category: "Tư vấn",
    rank: "Silver",
  },
  {
    id: 6,
    name: "EduFuture Academy",
    description: "Tổ chức đào tạo và phát triển kỹ năng. Đối tác trong việc đào tạo nhân lực và phát triển nguồn nhân lực chất lượng cao.",
    logo: "/img/logo/6.png",
    category: "Giáo dục",
    rank: "Silver",
  },
  {
    id: 7,
    name: "Global Finance Group",
    description: "Tập đoàn tài chính đa quốc gia. Cung cấp các giải pháp tài chính và đầu tư cho khách hàng trên toàn thế giới.",
    logo: "/img/logo/1.png",
    category: "Tài chính",
    rank: "Platinum",
  },
  {
    id: 8,
    name: "InnovateTech Systems",
    description: "Hệ thống công nghệ đổi mới. Chuyên phát triển các giải pháp công nghệ tiên tiến và đổi mới sáng tạo.",
    logo: "/img/logo/2.png",
    category: "Công nghệ",
    rank: "Gold",
  },
  {
    id: 9,
    name: "Prime Logistics",
    description: "Dịch vụ logistics hàng đầu. Cung cấp giải pháp vận chuyển và kho bãi hiện đại, đáng tin cậy.",
    logo: "/img/logo/3.png",
    category: "Logistics",
    rank: "Bronze",
  },
  {
    id: 10,
    name: "Digital Ventures",
    description: "Công ty đầu tư và phát triển công nghệ số. Hỗ trợ các startup và doanh nghiệp công nghệ phát triển.",
    logo: "/img/logo/4.png",
    category: "Đầu tư",
    rank: "Gold",
  },
  {
    id: 11,
    name: "Elite Real Estate",
    description: "Bất động sản cao cấp. Chuyên về các dự án bất động sản cao cấp và đầu tư bất động sản thông minh.",
    logo: "/img/logo/5.png",
    category: "Bất động sản",
    rank: "Silver",
  },
  {
    id: 12,
    name: "HealthCare Plus",
    description: "Dịch vụ chăm sóc sức khỏe toàn diện. Cung cấp các giải pháp y tế và chăm sóc sức khỏe chất lượng cao.",
    logo: "/img/logo/6.png",
    category: "Y tế",
    rank: "Bronze",
  },
];

export default async function ClientsCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("clients");
  const categoryName = unslugify(slug);
  
  // Filter clients by category
  const filteredClients = CLIENTS.filter(
    (client) => client.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className=" py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/${locale}/clients`}
              className="hover:text-white transition-colors"
            >
              Khách hàng
            </Link>
            <span className="">/</span>
            <span className=" font-medium">{categoryName}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            Khách hàng - {categoryName}
          </h1>
          <p className="text-lg">
            Tìm thấy {filteredClients.length} đối tác trong ngành {categoryName}
          </p>
        </div>
      </div>

      {/* Clients Grid with search & filters */}
      <ClientsExplorer clients={filteredClients} locale={locale} />
      

    </div>
  );
}

