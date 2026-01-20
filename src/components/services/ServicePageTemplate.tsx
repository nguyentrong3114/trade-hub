"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  FaStar, 
  FaSearch,
  FaChevronRight,
  FaBookmark,
  FaExternalLinkAlt,
  FaChevronDown
} from "react-icons/fa";

export interface Company {
  id: number;
  name: string;
  description: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  employees: string;
  verified: boolean;
  verifiedBadge: string | null;
  projectSize: string;
  hourlyRate: string;
  services: Array<{ name: string; percentage: number }>;
  projects: number;
  industries: string[];
  costRating: number;
  cities: string[];
  website: string;
  isProactive: boolean;
}

interface ServicePageTemplateProps {
  serviceName: string;
  companies: Company[];
  breadcrumbs: {
    home: string;
    services: string;
    category?: string;
    service: string;
  };
}

// Helper function to convert slug to camelCase for translation keys
// Example: "app-developers" -> "appDevelopers", "iphone-apps" -> "iphoneApps"
function slugToCamelCase(slug: string): string {
  return slug
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word; // First word stays lowercase
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

export default function ServicePageTemplate({ 
  serviceName, 
  companies,
  breadcrumbs 
}: ServicePageTemplateProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("services");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Convert service name from slug to camelCase for translation keys
  const serviceKey = slugToCamelCase(serviceName);

  // Helper to check if translation was found (next-intl returns key if not found)
  const isTranslationFound = (translation: string, key: string): boolean => {
    // If translation equals the key, it wasn't found
    // Also check if it starts with the key followed by dot (nested key not found)
    if (!translation || translation === key) {
      return false;
    }
    // Check if translation looks like a key path (contains the key as prefix with dot)
    if (translation.includes(`${key}.`) || translation.startsWith(`services.${key}`)) {
      return false;
    }
    return true;
  };

  // Get translations for this specific service với fallback logic
  const getServiceTranslation = (key: string, defaultValue: string = "", params?: Record<string, any>) => {
    try {
      // Try service-specific translation first (camelCase)
      const translationKey = `${serviceKey}.${key}`;
      let translation: string;
      
      if (params) {
        translation = t(translationKey, params);
      } else {
        translation = t(translationKey);
      }
      
      // Kiểm tra nếu translation không tìm thấy thì thử fallback về appDevelopers
      if (!isTranslationFound(translation, translationKey)) {
        const fallbackKey = `appDevelopers.${key}`;
        try {
          if (params) {
            translation = t(fallbackKey, params);
          } else {
            translation = t(fallbackKey);
          }
          // Nếu fallback cũng không có, dùng defaultValue
          if (!isTranslationFound(translation, fallbackKey)) {
            return defaultValue;
          }
        } catch {
          return defaultValue;
        }
      }
      
      return translation || defaultValue;
    } catch {
      // Nếu có lỗi, thử fallback về appDevelopers
      try {
        const fallbackKey = `appDevelopers.${key}`;
        let translation: string;
        if (params) {
          translation = t(fallbackKey, params);
        } else {
          translation = t(fallbackKey);
        }
        if (!isTranslationFound(translation, fallbackKey)) {
          return defaultValue;
        }
        return translation || defaultValue;
      } catch {
        return defaultValue;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-blue-600">
              {breadcrumbs.home}
            </Link>
            <FaChevronRight className="text-xs text-gray-400" />
            <Link href={`/${locale}/services`} className="hover:text-blue-600">
              {breadcrumbs.services}
            </Link>
            {breadcrumbs.category && (
              <>
                <FaChevronRight className="text-xs text-gray-400" />
                <span className="text-gray-900">{breadcrumbs.category}</span>
              </>
            )}
            <FaChevronRight className="text-xs text-gray-400" />
            <span className="text-gray-900">{breadcrumbs.service}</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {getServiceTranslation("title", "Service Title")}
              </h1>
              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                {getServiceTranslation("description", "Service description")}
                <button className="text-blue-600 hover:underline ml-1 cursor-pointer">
                  {getServiceTranslation("readMore", "+ Đọc thêm")}
                </button>
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  {getServiceTranslation("trustBox.text", "Chúng tôi xác minh đánh giá và đánh giá các công ty để bạn có thể lựa chọn với sự tự tin.")}{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    {getServiceTranslation("trustBox.learnMore", "Tìm hiểu thêm")}
                  </Link>
                </p>
              </div>

              <div className="text-sm text-gray-500">
                {getServiceTranslation("ratingsUpdated", "Đánh giá cập nhật")}: {new Date().toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            <div className="lg:w-80 flex flex-col items-center lg:items-end gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg text-center">
                <div className="text-xs font-semibold mb-1">{getServiceTranslation("badge.top", "TOP SERVICE")}</div>
                <div className="text-lg font-bold">{getServiceTranslation("badge.year", "B2B 2025")}</div>
              </div>

              <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <FaSearch className="w-4 h-4" />
                {getServiceTranslation("getMatched", "Tìm đối tác phù hợp")}
              </button>

              <div className="text-center lg:text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {companies.length.toLocaleString()} {getServiceTranslation("companyCount", "Công ty")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "all"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {getServiceTranslation("tabs.all", "Tất cả công ty")}
            </button>
            <button
              onClick={() => setActiveTab("leaders")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "leaders"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {getServiceTranslation("tabs.leaders", "Bảng xếp hạng")}
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "packages"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {getServiceTranslation("tabs.packages", "Gói dịch vụ")}
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "pricing"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {getServiceTranslation("tabs.pricing", "Bảng giá")}
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === "guide"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {getServiceTranslation("tabs.guide", "Hướng dẫn dịch vụ")}
            </button>
          </div>

          <div className="py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={getServiceTranslation("filters.location", "Vị trí")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>{getServiceTranslation("filters.services", "Dịch vụ")}</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>{getServiceTranslation("filters.clientBudget", "Ngân sách khách hàng")}</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>{getServiceTranslation("filters.hourlyRates", "Mức giá theo giờ")}</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>{getServiceTranslation("filters.industry", "Ngành nghề")}</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option>{getServiceTranslation("filters.reviews", "Đánh giá")}</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  {getServiceTranslation("filters.allFilters", "Tất cả bộ lọc")} (1)
                  <FaChevronDown className={`text-xs transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-gray-600">{getServiceTranslation("filters.activeFilters", "Bộ lọc đang áp dụng")}:</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                {breadcrumbs.service}
                <button className="hover:text-blue-900 cursor-pointer">×</button>
              </span>
              <button className="text-sm text-blue-600 hover:underline cursor-pointer">
                {getServiceTranslation("filters.clearAll", "Xóa tất cả")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Companies List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {getServiceTranslation("listTitle", "Danh sách các công ty hàng đầu")}
          </h2>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1 border border-gray-300 rounded text-sm cursor-pointer">
              <option>{getServiceTranslation("sponsored", "Được tài trợ")}</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                          <Link href={`/${locale}/clients/${company.id}`}>
                            {company.name}
                          </Link>
                        </h3>
                        {company.verified && company.verifiedBadge && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                            {company.verifiedBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(company.rating)
                                  ? "text-red-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {company.rating}
                        </span>
                        <span className="text-sm text-gray-500">
                          {getServiceTranslation("reviewsCount", `(${company.reviews} đánh giá)`, { count: company.reviews })}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">{getServiceTranslation("companyCard.projectSize", "Quy mô dự án")}:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {company.projectSize}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">{getServiceTranslation("companyCard.hourlyRate", "Mức giá theo giờ")}:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {company.hourlyRate}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">{getServiceTranslation("companyCard.employees", "Nhân viên")}:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {company.employees}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">{getServiceTranslation("companyCard.location", "Vị trí")}:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {company.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      {company.services.slice(0, 3).map((service, index) => {
                        const colors = ["#3B82F6", "#60A5FA", "#34D399"];
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <div
                              className="h-3 rounded-full"
                              style={{
                                width: `${service.percentage * 3}px`,
                                backgroundColor: colors[index],
                                minWidth: "20px"
                              }}
                            />
                            <span className="text-xs text-gray-600 whitespace-nowrap">
                              {service.percentage}% {service.name}
                            </span>
                          </div>
                        );
                      })}
                      {company.services.length > 3 && (
                        <Link href="#" className="text-xs text-blue-600 hover:underline whitespace-nowrap">
                          {getServiceTranslation("moreServices", `+${company.services.length - 3} dịch vụ`, { count: company.services.length - 3 })}
                        </Link>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {company.description}
                    <Link
                      href={`/${locale}/clients/${company.id}`}
                      className="text-blue-600 hover:underline ml-1"
                    >
                      {getServiceTranslation("companyCard.viewAllProjects", `Xem tất cả ${company.projects} dự án →`, { count: company.projects })}
                    </Link>
                  </p>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/${locale}/clients/${company.id}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    >
                      {getServiceTranslation("companyCard.viewProfile", "Xem hồ sơ")}
                    </Link>
                    <Link
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      {getServiceTranslation("companyCard.visitWebsite", "Truy cập website")}
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                      <FaBookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
                    {company.isProactive && (
                      <span className="text-xs text-gray-600">{getServiceTranslation("companyCard.proactive", "Chủ động")}</span>
                    )}
                    <span className="text-xs text-gray-600">
                      {getServiceTranslation("companyCard.experienceInIndustries", `Kinh nghiệm trong ${company.industries.length} ngành nghề`, { count: company.industries.length })}
                    </span>
                    <span className="text-xs text-gray-600">
                      {getServiceTranslation("companyCard.costRating", `${company.costRating} trên 5.0 đánh giá về chi phí`, { rating: company.costRating })}
                    </span>
                    <span className="text-xs text-gray-600">
                      {getServiceTranslation("companyCard.completedProjectsInCities", `Đã hoàn thành dự án tại ${company.cities.length} thành phố`, { count: company.cities.length })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {companies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{getServiceTranslation("noCompanies", "Không tìm thấy công ty nào")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

