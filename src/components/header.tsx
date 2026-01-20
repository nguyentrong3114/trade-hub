"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaFacebook,
  FaRss,
  FaSearch,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";
import { useAuthStore } from "@/stores/authStore";
import { checkAuthApi, logoutApi } from "@/lib/auth-api";
import { getDashboardPathByUserType } from "@/lib/auth-routing";

const languages = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇺🇸" }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Helper function để set cookie
const setCookie = (name: string, value: string, days: number = 365) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const cookieValue = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
  if (typeof document !== "undefined") {
    document.cookie = cookieValue;
  }
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tFooterNav = useTranslations("footerNav");
  const { user, isAuthenticated, logout, login } = useAuthStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);
  const [clickedFooterNav, setClickedFooterNav] = useState<string | null>(null);
  const [expandedMobileFooterNav, setExpandedMobileFooterNav] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await checkAuthApi();

        const isAuthed =
          data.success &&
          (typeof data.isAuthenticated === "boolean"
            ? data.isAuthenticated
            : !!data.data?.user);

        if (isAuthed && data.data?.user) {
          // Update auth store with user data (ưu tiên accessToken nếu backend trả về)
          login(data.data.user, data.data.accessToken || "");
        } else {
          // Clear auth if not authenticated
          logout();
        }
      } catch (error) {
        console.error("Check auth error:", error);
        // On error, keep current state (don't force logout)
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Only check if not already authenticated
    if (!isAuthenticated) {
      checkAuth();
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, login, logout]);
  // Mock cart items - có thể tích hợp với state management sau
  const [cartItems] = useState<CartItem[]>([
    // Uncomment để test với items
    // { id: 1, name: "Product 1", price: 100, quantity: 1, image: "/placeholder.jpg" },
    // { id: 2, name: "Product 2", price: 200, quantity: 2, image: "/placeholder.jpg" },
    // { id: 3, name: "Product 3", price: 300, quantity: 1, image: "/placeholder.jpg" },
  ]);
  const cartItemsCount = cartItems.length;

  // Lấy locale hiện tại từ pathname
  const currentLocale = pathname.startsWith("/vi") ? "vi" : "en";
  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  // Helper function to create slug from Vietnamese text
  const slugify = (text: string): string => {
    const vietnameseMap: Record<string, string> = {
      'à': 'a', 'á': 'a', 'ạ': 'a', 'ả': 'a', 'ã': 'a', 'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ậ': 'a', 'ẩ': 'a', 'ẫ': 'a',
      'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ặ': 'a', 'ẳ': 'a', 'ẵ': 'a',
      'è': 'e', 'é': 'e', 'ẹ': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ê': 'e', 'ề': 'e', 'ế': 'e', 'ệ': 'e', 'ể': 'e', 'ễ': 'e',
      'ì': 'i', 'í': 'i', 'ị': 'i', 'ỉ': 'i', 'ĩ': 'i',
      'ò': 'o', 'ó': 'o', 'ọ': 'o', 'ỏ': 'o', 'õ': 'o', 'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ộ': 'o', 'ổ': 'o', 'ỗ': 'o',
      'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ợ': 'o', 'ở': 'o', 'ỡ': 'o',
      'ù': 'u', 'ú': 'u', 'ụ': 'u', 'ủ': 'u', 'ũ': 'u', 'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ự': 'u', 'ử': 'u', 'ữ': 'u',
      'ỳ': 'y', 'ý': 'y', 'ỵ': 'y', 'ỷ': 'y', 'ỹ': 'y',
      'đ': 'd',
      'À': 'A', 'Á': 'A', 'Ạ': 'A', 'Ả': 'A', 'Ã': 'A', 'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ậ': 'A', 'Ẩ': 'A', 'Ẫ': 'A',
      'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ặ': 'A', 'Ẳ': 'A', 'Ẵ': 'A',
      'È': 'E', 'É': 'E', 'Ẹ': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ệ': 'E', 'Ể': 'E', 'Ễ': 'E',
      'Ì': 'I', 'Í': 'I', 'Ị': 'I', 'Ỉ': 'I', 'Ĩ': 'I',
      'Ò': 'O', 'Ó': 'O', 'Ọ': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ộ': 'O', 'Ổ': 'O', 'Ỗ': 'O',
      'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ợ': 'O', 'Ở': 'O', 'Ỡ': 'O',
      'Ù': 'U', 'Ú': 'U', 'Ụ': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ự': 'U', 'Ử': 'U', 'Ữ': 'U',
      'Ỳ': 'Y', 'Ý': 'Y', 'Ỵ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y',
      'Đ': 'D'
    };

    return text
      .split('')
      .map(char => vietnameseMap[char] || char)
      .join('')
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Get unique categories from clients data
  const clientCategories = [
    "Công nghệ",
    "Thương mại",
    "Truyền thông",
    "Sản xuất",
    "Tư vấn",
    "Giáo dục",
    "Tài chính",
    "Logistics",
    "Đầu tư",
    "Bất động sản",
    "Y tế"
  ];

  // Footer navbar menu items với dropdown - sử dụng translation keys
  const footerNavItems = [
    {
      id: "development",
      labelKey: "development",
      columns: [
        {
          titleKey: "mobileApps",
          items: [
            { labelKey: "appDevelopers", href: "/services/app-developers/app-developers" },
            { labelKey: "iphoneApps", href: "/services/iphone-apps/iphone-apps" },
            { labelKey: "androidApps", href: "/services/android-apps/android-apps" },
            { labelKey: "gamingApps", href: "/services/gaming-apps/gaming-apps" },
            { labelKey: "financeApps", href: "/services/finance-apps/finance-apps" },
          ]
        },
        {
          titleKey: "software",
          items: [
            { labelKey: "softwareDevelopers", href: "/services/software-developers/software-developers" },
            { labelKey: "softwareTesting", href: "/services/software-testing/software-testing" },
            { label: "Laravel", href: "/services/laravel/laravel" },
            { label: "Microsoft SharePoint", href: "/services/sharepoint/sharepoint" },
            { label: "Webflow", href: "/services/webflow/webflow" },
          ]
        },
        {
          titleKey: "web",
          items: [
            { labelKey: "webDevelopers", href: "/services/web-developers/web-developers" },
            { labelKey: "pythonDjango", href: "/services/python-django/python-django" },
            { label: "PHP", href: "/services/php/php" },
            { label: "WordPress", href: "/services/wordpress/wordpress" },
            { label: "Drupal", href: "/services/drupal/drupal" },
          ]
        },
        {
          titleKey: "emergingTech",
          items: [
            { labelKey: "artificialIntelligence", href: "/services/ai/ai" },
            { label: "Blockchain", href: "/services/blockchain/blockchain" },
            { label: "AR/VR", href: "/services/ar-vr/ar-vr" },
            { label: "IoT", href: "/services/iot/iot" },
          ]
        },
        {
          titleKey: "frameworks",
          items: [
            { label: "React Native", href: "/services/react-native/react-native" },
            { label: "Flutter", href: "/services/flutter/flutter" },
            { label: ".NET", href: "/services/dotnet/dotnet" },
            { label: "Ruby on Rails", href: "/services/rails/rails" },
            { label: "Java", href: "/services/java/java" },
          ]
        },
        {
          titleKey: "ecommerce",
          items: [
            { labelKey: "ecommerceDevelopers", href: "/services/ecommerce-developers/ecommerce-developers" },
            { label: "Magento", href: "/services/magento/magento" },
            { label: "Shopify", href: "/services/shopify/shopify" },
            { label: "BigCommerce", href: "/services/bigcommerce/bigcommerce" },
            { label: "WooCommerce", href: "/services/woocommerce/woocommerce" },
          ]
        }
      ]
    },
    {
      id: "it-services",
      labelKey: "itServices",
      columns: [
        {
          titleKey: "cloudInfrastructure",
          items: [
            { labelKey: "cloudMigration", href: "/services/cloud-migration/cloud-migration" },
            { labelKey: "awsServices", href: "/services/aws/aws" },
            { labelKey: "azureServices", href: "/services/azure/azure" },
            { labelKey: "googleCloud", href: "/services/gcp/gcp" },
            { label: "DevOps", href: "/services/devops/devops" },
          ]
        },
        {
          titleKey: "security",
          items: [
            { labelKey: "cybersecurity", href: "/services/cybersecurity/cybersecurity" },
            { labelKey: "penetrationTesting", href: "/services/penetration-testing/penetration-testing" },
            { labelKey: "securityAudits", href: "/services/security-audits/security-audits" },
            { labelKey: "dataProtection", href: "/services/data-protection/data-protection" },
          ]
        },
        {
          titleKey: "supportMaintenance",
          items: [
            { labelKey: "itSupport", href: "/services/it-support/it-support" },
            { labelKey: "systemMaintenance", href: "/services/maintenance/maintenance" },
            { labelKey: "helpDesk", href: "/services/help-desk/help-desk" },
            { labelKey: "managedServices", href: "/services/managed-services/managed-services" },
          ]
        }
      ]
    },
    {
      id: "marketing",
      labelKey: "marketing",
      columns: [
        {
          titleKey: "digitalMarketing",
          items: [
            { labelKey: "seoServices", href: "/services/seo/seo" },
            { labelKey: "ppcAdvertising", href: "/services/ppc/ppc" },
            { labelKey: "socialMediaMarketing", href: "/services/social-media/social-media" },
            { labelKey: "contentMarketing", href: "/services/content/content" },
            { labelKey: "emailMarketing", href: "/services/email/email" },
          ]
        },
        {
          titleKey: "analyticsStrategy",
          items: [
            { labelKey: "marketingAnalytics", href: "/services/analytics/analytics" },
            { labelKey: "marketingStrategy", href: "/services/strategy/strategy" },
            { labelKey: "brandStrategy", href: "/services/brand-strategy/brand-strategy" },
            { labelKey: "marketResearch", href: "/services/market-research/market-research" },
          ]
        }
      ]
    },
    {
      id: "design",
      labelKey: "design",
      columns: [
        {
          titleKey: "uiUxDesign",
          items: [
            { labelKey: "uiDesign", href: "/services/ui-design/ui-design" },
            { labelKey: "uxDesign", href: "/services/ux-design/ux-design" },
            { labelKey: "webDesign", href: "/services/web-design/web-design" },
            { labelKey: "mobileAppDesign", href: "/services/mobile-design/mobile-design" },
            { labelKey: "prototyping", href: "/services/prototyping/prototyping" },
          ]
        },
        {
          titleKey: "graphicDesign",
          items: [
            { labelKey: "logoDesign", href: "/services/logo-design/logo-design" },
            { labelKey: "brandIdentity", href: "/services/brand-identity/brand-identity" },
            { labelKey: "printDesign", href: "/services/print-design/print-design" },
            { labelKey: "illustration", href: "/services/illustration/illustration" },
          ]
        }
      ]
    },
    {
      id: "business-services",
      labelKey: "businessServices",
      columns: [
        {
          titleKey: "consulting",
          items: [
            { labelKey: "businessConsulting", href: "/services/consulting/consulting" },
            { labelKey: "itConsulting", href: "/services/it-consulting/it-consulting" },
            { labelKey: "financialConsulting", href: "/services/financial-consulting/financial-consulting" },
            { labelKey: "strategyConsulting", href: "/services/strategy-consulting/strategy-consulting" },
          ]
        },
        {
          titleKey: "operations",
          items: [
            { labelKey: "processOptimization", href: "/services/process-optimization/process-optimization" },
            { labelKey: "supplyChain", href: "/services/supply-chain/supply-chain" },
            { labelKey: "projectManagement", href: "/services/project-management/project-management" },
            { labelKey: "qualityAssurance", href: "/services/qa/qa" },
          ]
        }
      ]
    },
    {
      id: "resources",
      labelKey: "resources",
      columns: [
        {
          titleKey: "learning",
          items: [
            { labelKey: "documentation", href: "/resources/documentation" },
            { labelKey: "tutorials", href: "/resources/tutorials" },
            { labelKey: "webinars", href: "/resources/webinars" },
            { labelKey: "caseStudies", href: "/resources/case-studies" },
          ]
        },
        {
          titleKey: "tools",
          items: [
            { labelKey: "apiDocumentation", href: "/resources/api-docs" },
            { labelKey: "sdks", href: "/resources/sdks" },
            { labelKey: "templates", href: "/resources/templates" },
            { labelKey: "integrations", href: "/resources/integrations" },
          ]
        }
      ]
    }
  ];

  // Navigation menu items
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/plans", label: t("plans") },
    { href: "/clients", label: t("clients"), hasDropdown: true },
    { href: "/market ", label: t("market") },
    { href: "/contact", label: t("contact") },
    { href: "/auction", label: t("auction") },
    { href: "/blog", label: t("blog") }
  ];

  // Helper để tạo link với locale
  const getLocalizedPath = (path: string) => {
    const cleanPath = path.replace(/^\/(vi|en)/, "") || "/";
    if (cleanPath === "/") {
      return `/${currentLocale}`;
    }
    return `/${currentLocale}${cleanPath}`;
  };

  // Kiểm tra active route
  const isActive = (href: string) => {
    const cleanPath = href.replace(/^\/(vi|en)/, "");
    const currentCleanPath = pathname.replace(/^\/(vi|en)/, "");
    return currentCleanPath === cleanPath || (cleanPath === "/" && currentCleanPath === "");
  };

  const handleLanguageChange = (newLocale: string) => {
    setCookie("NEXT_LOCALE", newLocale);

    // Tạo URL mới
    const currentPath = pathname.replace(/^\/(vi|en)/, "");
    const newPath = `/${newLocale}${currentPath || ""}`;

    // Chuyển hướng
    router.push(newPath);
    router.refresh();
    setIsLangOpen(false);
  };

  return (
    <header className="w-full">
      {/* Top bar - Contact info and social */}
      <div className="hidden md:block container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and tagline */}
          <Link href={getLocalizedPath("/")} className="flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-blue-600">B2B</span>
              </div>
              <span className="text-xs text-gray-500  ">B2B Platform</span>
            </div>
          </Link>

          {/* Right side - Contact info and social/search */}
          <div className="flex flex-col items-end space-y-2 shrink-0">
            {/* Top row - Contact info and language switcher */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 shrink-0">
                <FaEnvelope className="w-4 h-4 shrink-0 text-blue-600" />
                <span className="text-sm whitespace-nowrap">contact@company.com</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <FaPhone className="w-4 h-4 shrink-0 text-green-600" />
                <span className="text-sm whitespace-nowrap">+ 356 836 2335</span>
              </div>
              {/* Language Switcher */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center justify-center space-x-1.5 px-2.5 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-16"
                >
                  <span className="text-base shrink-0">{currentLanguage?.flag}</span>
                  <span className="whitespace-nowrap">{currentLanguage?.code.toUpperCase()}</span>
                  <svg
                    className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLangOpen && (
                  <>
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language.code)}
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${currentLocale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            } ${language.code === languages[0].code ? 'rounded-t-md' : ''} ${language.code === languages[languages.length - 1].code ? 'rounded-b-md' : ''
                            }`}
                        >
                          <span className="text-base">{language.flag}</span>
                          <span>{language.name}</span>
                          {currentLocale === language.code && (
                            <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                    {/* Overlay để đóng dropdown khi click bên ngoài */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLangOpen(false)}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Bottom row - Social icons and search */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 shrink-0">
                <FaTwitter className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-500 shrink-0 transition-colors" />
                <FaFacebook className="w-4 h-4 text-blue-600 cursor-pointer hover:text-blue-700 shrink-0 transition-colors" />
                <FaRss className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-600 shrink-0 transition-colors" />
              </div>
              <div className="relative shrink-0">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header - Logo and Icons */}
      <div className="md:hidden border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={getLocalizedPath("/")} className="flex items-center space-x-1">
              <span className="text-xl font-bold text-blue-600">B2B</span>
            </Link>

            {/* Icons */}
            <div className="flex items-center space-x-2">
              {/* Notification - chỉ hiện khi đã đăng nhập */}
              {!isCheckingAuth && isAuthenticated && user && (
                <NotificationDropdown locale={currentLocale} />
              )}

              {/* Cart */}
              <Link
                href={getLocalizedPath("/cart")}
                className="relative p-2 text-gray-700"
              >
                <FaShoppingCart className="w-5 h-5 text-blue-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-blue-600" />
                ) : (
                  <FaBars className="w-6 h-6 text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="w-full overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <div className="flex items-center justify-between h-14">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.hasDropdown && item.href === "/clients") {
                  return (
                    <div
                      key={item.href}
                      className="relative group"
                    >
                      <Link
                        href={getLocalizedPath(item.href)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${isActive(item.href)
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                          }`}
                      >
                        {item.label}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>
                      {/* Dropdown Menu - 2 columns */}
                      <div className="absolute top-full left-0 mt-1 w-96 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="p-4">
                          <div className="grid grid-cols-2 gap-2">
                            {clientCategories.map((category) => (
                              <Link
                                key={category}
                                href={getLocalizedPath(`/clients/category/${slugify(category)}`)}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                              >
                                {category}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 mt-3 pt-3">
                            <Link
                              href={getLocalizedPath("/clients")}
                              className="block px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors text-center"
                            >
                              Xem tất cả khách hàng →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={getLocalizedPath(item.href)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive(item.href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side - Cart and User */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Shopping Cart with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCartHover(true)}
                onMouseLeave={() => setIsCartHover(false)}
              >
                <Link
                  href={getLocalizedPath("/cart")}
                  className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FaShoppingCart className="w-5 h-5 text-blue-600" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount > 9 ? "9+" : cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* Invisible bridge để tránh mất hover khi di chuyển chuột */}
                {isCartHover && (
                  <div className="absolute right-0 top-full w-full h-2" />
                )}

                {/* Cart Dropdown */}
                {isCartHover && (
                  <div className="absolute right-0 top-full pt-2 w-80 bg-transparent z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-xl">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800">{t("cart")}</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {cartItems.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <FaShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">{t("emptyCart")}</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {cartItems.slice(0, 3).map((item) => (
                              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-3">
                                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center shrink-0">
                                    {item.image ? (
                                      <div
                                        className="w-full h-full bg-cover bg-center rounded-md"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                      />
                                    ) : (
                                      <span className="text-gray-400 text-xs">IMG</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {t("quantity")}: {item.quantity}
                                    </p>
                                    <p className="text-sm font-semibold text-blue-600 mt-1">
                                      ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-200 bg-gray-50">
                          <Link
                            href={getLocalizedPath("/cart")}
                            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            {t("viewCart")}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Notification Dropdown - chỉ hiện khi đã đăng nhập */}
              {!isCheckingAuth && isAuthenticated && user && (
                <NotificationDropdown locale={currentLocale} />
              )}

              {/* User Menu / Login */}
              {!isCheckingAuth && isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {user.fullName ? (
                        user.fullName.charAt(0).toUpperCase()
                      ) : user.email ? (
                        user.email.charAt(0).toUpperCase()
                      ) : (
                        <FaUser className="w-4 h-4" />
                      )}
                    </div>
                    <span className="hidden md:block text-sm font-medium max-w-[120px] truncate">
                      {user.fullName || user.email || user.companyName}
                    </span>
                    <FaChevronDown className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                        {/* User Info */}
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                          <div className="font-semibold text-sm text-gray-900 truncate">
                            {user.fullName || user.email || user.companyName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 truncate">
                            {user.email}
                          </div>
                          {user.companyName && (
                            <div className="text-xs text-gray-500 mt-1 truncate">
                              {user.companyName}
                            </div>
                          )}
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          <Link
                            href={getLocalizedPath("/profile")}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <FaUser className="w-4 h-4 text-gray-400" />
                            {t("profile")}
                          </Link>
                          <Link
                            href={getLocalizedPath("/orders")}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <FaShoppingCart className="w-4 h-4 text-gray-400" />
                            {t("orders")}
                          </Link>
                          <Link
                            href={getLocalizedPath(getDashboardPathByUserType(user.userType))}
                            onClick={() => setIsUserMenuOpen(false)}
                            target={user.userType === "admin" || user.userType === "business" ? "_blank" : undefined}
                            rel={user.userType === "admin" || user.userType === "business" ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            <FaUser className="w-4 h-4 text-gray-400" />
                            Profile
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-200">
                          <button
                            onClick={async () => {
                              setIsUserMenuOpen(false);
                              try {
                                // Call logout API (direct to backend via custom client)
                                await logoutApi();
                              } catch (error) {
                                console.error("Logout API error:", error);
                              }
                              // Clear local state
                              logout();
                              router.push(getLocalizedPath("/auth/login"));
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <FaSignOutAlt className="w-4 h-4" />
                            {t("logout")}
                          </button>
                        </div>
                      </div>
                      {/* Overlay để đóng dropdown khi click bên ngoài */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                    </>
                  )}
                </div>
              ) : !isCheckingAuth ? (
                <Link
                  href={getLocalizedPath("/auth/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border border-blue-400 rounded-md cursor-pointer"
                >
                  {t("login")}
                </Link>
              ) : null}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-blue-600" />
                ) : (
                  <FaBars className="w-6 h-6 text-blue-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedPath(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Cart and User/Login */}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <Link
                  href={getLocalizedPath("/cart")}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                >
                  <FaShoppingCart className="w-4 h-4 text-blue-600" />
                  <span>{t("cart")}</span>
                  {cartItemsCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount > 9 ? "9+" : cartItemsCount}
                    </span>
                  )}
                </Link>
                {!isCheckingAuth && isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {user.fullName ? (
                            user.fullName.charAt(0).toUpperCase()
                          ) : user.email ? (
                            user.email.charAt(0).toUpperCase()
                          ) : (
                            <FaUser className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {user.fullName || user.email || user.companyName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={getLocalizedPath("/profile")}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                    >
                      {t("profile")}
                    </Link>
                    <Link
                      href={getLocalizedPath("/orders")}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                    >
                      {t("orders")}
                    </Link>
                    <Link
                      href={getLocalizedPath(getDashboardPathByUserType(user.userType))}
                      onClick={() => setIsMobileMenuOpen(false)}
                      target={user.userType === "admin" || user.userType === "business" ? "_blank" : undefined}
                      rel={user.userType === "admin" || user.userType === "business" ? "noopener noreferrer" : undefined}
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        setIsMobileMenuOpen(false);
                        try {
                          // Call logout API (direct to backend via custom client)
                          await logoutApi();
                        } catch (error) {
                          console.error("Logout API error:", error);
                        }
                        // Clear local state
                        logout();
                        router.push(getLocalizedPath("/auth/login"));
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      {t("logout")}
                    </button>
                  </>
                ) : !isCheckingAuth ? (
                  <Link
                    href={getLocalizedPath("/auth/login")}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                  >
                    {t("login")}
                  </Link>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Footer Navbar - Mega Menu (Desktop) */}
      <div className="hidden md:block w-full bg-white border-t border-gray-200 relative overflow-visible">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start space-x-1 h-12 overflow-visible">
            {footerNavItems.map((item) => (
              <div
                key={item.id}
                className="relative overflow-visible"
              >
                <button
                  onClick={() => {
                    // Toggle: nếu đang mở thì đóng, nếu đóng thì mở
                    setClickedFooterNav(clickedFooterNav === item.id ? null : item.id);
                  }}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 h-full cursor-pointer ${
                    clickedFooterNav === item.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {tFooterNav(item.labelKey)}
                  <svg
                    className={`w-3 h-3 transition-transform ${
                      clickedFooterNav === item.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mega Dropdown Menu */}
                {clickedFooterNav === item.id && (
                  <>
                    {/* Overlay để đóng menu khi click bên ngoài */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setClickedFooterNav(null)}
                    />
                    <div 
                      className="absolute top-full left-0 pt-2 w-[calc(100vw-2rem)] max-w-6xl bg-transparent z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Dropdown content */}
                      <div className="bg-white border border-gray-200 rounded-lg shadow-2xl">
                        <div className="p-6">
                          <div className={`grid gap-6 ${
                            item.columns.length === 6 ? 'grid-cols-6' :
                            item.columns.length === 5 ? 'grid-cols-5' :
                            item.columns.length === 4 ? 'grid-cols-4' :
                            item.columns.length === 3 ? 'grid-cols-3' :
                            item.columns.length === 2 ? 'grid-cols-2' :
                            'grid-cols-1'
                          }`}>
                            {item.columns.map((column, colIndex) => (
                              <div key={colIndex} className="min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3 whitespace-nowrap">
                                  {tFooterNav(`columns.${column.titleKey}`)}
                                </h3>
                                <ul className="space-y-2">
                                  {column.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        href={getLocalizedPath(subItem.href)}
                                        className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                                        onClick={() => setClickedFooterNav(null)}
                                      >
                                        {"labelKey" in subItem
                                          ? tFooterNav(`items.${subItem.labelKey}`)
                                          : subItem.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 mt-6 pt-4">
                            <Link
                              href={getLocalizedPath(`/services/${item.id}`)}
                              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                              onClick={() => setClickedFooterNav(null)}
                            >
                              {tFooterNav("viewMore", { label: tFooterNav(item.labelKey) })}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navbar - Mobile Accordion */}
      <div className="md:hidden w-full bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="py-2">
            {footerNavItems.map((item) => (
              <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => {
                    setExpandedMobileFooterNav(
                      expandedMobileFooterNav === item.id ? null : item.id
                    );
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>{tFooterNav(item.labelKey)}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedMobileFooterNav === item.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile Accordion Content */}
                {expandedMobileFooterNav === item.id && (
                  <div className="px-4 pb-4 bg-gray-50">
                    <div className="space-y-4 pt-2">
                      {item.columns.map((column, colIndex) => (
                        <div key={colIndex}>
                          <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                            {tFooterNav(`columns.${column.titleKey}`)}
                          </h4>
                          <ul className="space-y-1">
                            {column.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={getLocalizedPath(subItem.href)}
                                  className="block text-sm text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md transition-colors cursor-pointer"
                                  onClick={() => setExpandedMobileFooterNav(null)}
                                >
                                  {"labelKey" in subItem
                                    ? tFooterNav(`items.${subItem.labelKey}`)
                                    : subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-200">
                        <Link
                          href={getLocalizedPath(`/services/${item.id}`)}
                          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                          onClick={() => setExpandedMobileFooterNav(null)}
                        >
                          {tFooterNav("viewMore", { label: tFooterNav(item.labelKey) })}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
