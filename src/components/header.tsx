"use client";

import { useState } from "react";
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
  FaUser
} from "react-icons/fa";

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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartHover, setIsCartHover] = useState(false);
  
  // State để kiểm tra đăng nhập (tạm thời dùng false, có thể tích hợp với auth sau)
  const [isLoggedIn] = useState(false);
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and tagline */}
          <Link href={getLocalizedPath("/")} className="flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-blue-600">Trade</span>
                <span className="text-2xl font-bold text-gray-800">Hub</span>
              </div>
              <span className="text-xs text-gray-500  ">TradeHub</span>
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
                          className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                            currentLocale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                          } ${language.code === languages[0].code ? 'rounded-t-md' : ''} ${
                            language.code === languages[languages.length - 1].code ? 'rounded-b-md' : ''
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

      {/* Navigation bar */}
      <nav className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                          isActive(item.href)
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
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
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
            <div className="flex items-center space-x-4">
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

              {/* User Menu / Login */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <FaUser className="w-5 h-5 text-blue-600" />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <Link
                          href={getLocalizedPath("/profile")}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-md transition-colors"
                        >
                          {t("profile")}
                        </Link>
                        <Link
                          href={getLocalizedPath("/orders")}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {t("orders")}
                        </Link>
                        <div className="border-t border-gray-200">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              // Handle logout
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-md transition-colors"
                          >
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
              ) : (
                <Link
                  href={getLocalizedPath("/auth/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border border-blue-400 rounded-md"
                >
                  {t("login")}
                </Link>
              )}

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
                  className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Cart and Login */}
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
                {!isLoggedIn && (
                  <Link
                    href={getLocalizedPath("/login")}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors"
                  >
                    {t("login")}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
    