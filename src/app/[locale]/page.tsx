import HeroSection from "@/components/herosection";
import { getTranslations } from "next-intl/server";
import FeaturesSection from "@/components/features";
import ClientsSection from "@/components/clients/clientsSection";
import { Client } from "@/components/clients/clientsSection";
import AuctionSection from "@/components/auction";
import QuestionSection from "@/components/question";
import HotBlog from "@/components/hotblog";

export default async function Home() {
  const t = await getTranslations("Home");

  // Sample clients data - có thể lấy từ API hoặc database
  const clients: Client[] = [
    {
      id: 1,
      name: "TechNova Solutions",
      description: "Công ty công nghệ chuyên phát triển giải pháp phần mềm.",
      logo: "/img/logo/1.png",
    },
    {
      id: 2,
      name: "GreenLeaf Trading",
      description: "Doanh nghiệp thương mại với hệ thống phân phối toàn quốc.",
      logo: "/img/logo/2.png",
    },
    {
      id: 3,
      name: "BrightMedia Agency",
      description: "Đơn vị truyền thông và marketing sáng tạo.",
      logo: "/img/logo/3.png",
    },
    {
      id: 4,
      name: "NextGen Manufacturing",
      description: "Công ty sản xuất ứng dụng công nghệ hiện đại.",
      logo: "/img/logo/4.png",
    },
    {
      id: 5,
      name: "Skyline Consulting",
      description: "Đơn vị tư vấn giải pháp cho doanh nghiệp.",
      logo: "/img/logo/5.png",
    },
    {
      id: 6,
      name: "EduFuture Academy",
      description: "Tổ chức đào tạo và phát triển kỹ năng.",
      logo: "/img/logo/6.png",
    },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection title={t("hero.title")} description={t("hero.description")} image="/img/section1.jpg" cta={t("hero.cta.primary")} cta2={t("hero.cta.secondary")} />
      </section>
      {/* Our Clients Section */}
      <FeaturesSection />
      <ClientsSection clients={clients} />
      {/* Features Section */}
      {/* Auction Section */}
      <HotBlog />
      <AuctionSection />
      <QuestionSection />
    </div>
  );
}
