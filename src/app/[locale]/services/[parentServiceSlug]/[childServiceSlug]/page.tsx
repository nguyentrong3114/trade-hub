"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ServicePageTemplate, { Company } from "@/components/services/ServicePageTemplate";

// Danh sách các service names hợp lệ - extract từ header links
const VALID_SERVICE_NAMES = [
  "app-developers",
  "iphone-apps",
  "android-apps",
  "gaming-apps",
  "finance-apps",
  "software-developers",
  "software-testing",
  "laravel",
  "sharepoint",
  "webflow",
  "web-developers",
  "python-django",
  "php",
  "wordpress",
  "drupal",
  "ai",
  "blockchain",
  "ar-vr",
  "iot",
  "react-native",
  "flutter",
  "dotnet",
  "rails",
  "java",
  "ecommerce-developers",
  "magento",
  "shopify",
  "bigcommerce",
  "woocommerce",
  "cloud-migration",
  "aws",
  "azure",
  "gcp",
  "devops",
  "cybersecurity",
  "penetration-testing",
  "security-audits",
  "data-protection",
  "it-support",
  "maintenance",
  "help-desk",
  "managed-services",
  "seo",
  "ppc",
  "social-media",
  "content",
  "email",
  "analytics",
  "strategy",
  "brand-strategy",
  "market-research",
  "ui-design",
  "ux-design",
  "web-design",
  "mobile-design",
  "prototyping",
  "logo-design",
  "brand-identity",
  "print-design",
  "illustration",
  "consulting",
  "it-consulting",
  "financial-consulting",
  "strategy-consulting",
  "process-optimization",
  "supply-chain",
  "project-management",
  "qa",
];

// Mock data generator - có thể thay thế bằng API call
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateMockCompanies(serviceName: string): Company[] {
  // serviceName parameter reserved for future customization per service
  const baseCompanies: Company[] = [
    {
      id: 1,
      name: "TechNova Solutions",
      description: "TechNova Solutions là công ty chuyên nghiệp với đội ngũ chuyên gia giàu kinh nghiệm. Chúng tôi đã đạt được 100% phản hồi tích cực từ khách hàng.",
      logo: "/img/logo/1.png",
      rating: 4.8,
      reviews: 245,
      location: "Hà Nội, Việt Nam",
      employees: "250-999",
      verified: true,
      verifiedBadge: "Premier Verified",
      projectSize: "$5,000+",
      hourlyRate: "$50 - $99 / hr",
      services: [
        { name: "Service A", percentage: 35 },
        { name: "Service B", percentage: 25 },
        { name: "Service C", percentage: 20 },
        { name: "Service D", percentage: 15 },
        { name: "Service E", percentage: 5 }
      ],
      projects: 150,
      industries: ["Fintech", "E-commerce"],
      costRating: 5.0,
      cities: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"],
      website: "https://technova.com",
      isProactive: true,
    },
    {
      id: 2,
      name: "Digital Solutions Studio",
      description: "Studio chuyên nghiệp với focus vào chất lượng và trải nghiệm người dùng. Đã phát triển hơn 200 dự án thành công.",
      logo: "/img/logo/2.png",
      rating: 4.9,
      reviews: 189,
      location: "TP. Hồ Chí Minh, Việt Nam",
      employees: "50-249",
      verified: true,
      verifiedBadge: "Verified",
      projectSize: "$10,000+",
      hourlyRate: "$100 - $149 / hr",
      services: [
        { name: "Service A", percentage: 40 },
        { name: "Service B", percentage: 30 },
        { name: "Service C", percentage: 20 },
        { name: "Service D", percentage: 10 }
      ],
      projects: 200,
      industries: ["Healthcare", "Education"],
      costRating: 4.8,
      cities: ["TP. Hồ Chí Minh", "Hà Nội"],
      website: "https://digitalstudio.com",
      isProactive: true,
    },
    {
      id: 3,
      name: "Professional Services Group",
      description: "Công ty hàng đầu với đội ngũ chuyên về các giải pháp doanh nghiệp. Chúng tôi đã hoàn thành hơn 300 dự án với các khách hàng lớn.",
      logo: "/img/logo/3.png",
      rating: 4.7,
      reviews: 312,
      location: "Đà Nẵng, Việt Nam",
      employees: "100-249",
      verified: true,
      verifiedBadge: "Premier Verified",
      projectSize: "$25,000+",
      hourlyRate: "$150 - $199 / hr",
      services: [
        { name: "Service A", percentage: 30 },
        { name: "Service B", percentage: 30 },
        { name: "Service C", percentage: 25 },
        { name: "Service D", percentage: 15 }
      ],
      projects: 300,
      industries: ["Enterprise", "Finance"],
      costRating: 4.5,
      cities: ["Đà Nẵng", "TP. Hồ Chí Minh", "Hà Nội", "Cần Thơ"],
      website: "https://proservices.com",
      isProactive: false,
    },
  ];

  // Customize companies based on service name if needed
  return baseCompanies;
}

export default function ServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  // Lấy service name từ childServiceSlug (vì route là parentServiceSlug/childServiceSlug)
  const serviceName = params["childServiceSlug"] as string;
  const t = useTranslations("services");
  const tNotFound = useTranslations("notFound");

  // Validate service name - nếu không hợp lệ thì hiển thị 404 page
  if (!serviceName || !VALID_SERVICE_NAMES.includes(serviceName)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {tNotFound("title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            {tNotFound("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}`}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              {tNotFound("goHome")}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              {tNotFound("viewAllServices")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate companies data
  const companies = generateMockCompanies(serviceName);
  
  // Fallback: Nếu không có companies, vẫn hiển thị trang nhưng với danh sách rỗng
  // (ServicePageTemplate đã xử lý trường hợp companies.length === 0)

  // Helper function to convert slug to camelCase for translation keys
  const slugToCamelCase = (slug: string): string => {
    return slug
      .split("-")
      .map((word, index) => {
        if (index === 0) {
          return word; // First word stays lowercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  };

  // Convert service name from slug to camelCase for translation keys
  const serviceKey = slugToCamelCase(serviceName);

  // Try to get breadcrumbs from translations, fallback to defaults
  const getBreadcrumb = (key: string, fallback: string) => {
    try {
      // Try service-specific breadcrumb first (camelCase)
      const serviceBreadcrumb = t(`${serviceKey}.breadcrumbs.${key}`);
      if (serviceBreadcrumb && serviceBreadcrumb !== `${serviceKey}.breadcrumbs.${key}`) {
        return serviceBreadcrumb;
      }
      // Fallback to appDevelopers breadcrumbs
      const defaultBreadcrumb = t(`appDevelopers.breadcrumbs.${key}`);
      if (defaultBreadcrumb && defaultBreadcrumb !== `appDevelopers.breadcrumbs.${key}`) {
        return defaultBreadcrumb;
      }
      return fallback;
    } catch {
      return fallback;
    }
  };

  // Format service name for display
  const formatServiceName = (name: string): string => {
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get breadcrumbs from translations với fallback
  const breadcrumbs = {
    home: getBreadcrumb("home", t("appDevelopers.breadcrumbs.home") || "Trang chủ"),
    services: getBreadcrumb("services", t("appDevelopers.breadcrumbs.services") || "Dịch vụ"),
    category: undefined, // Can be customized based on service
    service: formatServiceName(serviceName),
  };

  return (
    <ServicePageTemplate
      serviceName={serviceName}
      companies={companies}
      breadcrumbs={breadcrumbs}
    />
  );
}

