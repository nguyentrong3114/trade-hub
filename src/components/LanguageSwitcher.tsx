"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇺🇸" }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Lấy locale hiện tại từ pathname
  const currentLocale = pathname.startsWith("/vi") ? "vi" : "en";
  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const handleLanguageChange = (newLocale: string) => {
    // Lưu locale vào cookie bằng cách tạo cookie string
    const cookieValue = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    const setCookie = () => {
      document.cookie = cookieValue;
    };
    setCookie();
    
    // Tạo URL mới
    const currentPath = pathname.replace(/^\/(vi|en)/, "");
    const newPath = `/${newLocale}${currentPath || ""}`;
    
    // Chuyển hướng
    router.push(newPath);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-700 transition-all duration-200 font-medium hover:border-gray-400 hover:bg-gray-50"
      >
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                currentLocale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              } ${language.code === languages[0].code ? 'rounded-t-lg' : ''} ${
                language.code === languages[languages.length - 1].code ? 'rounded-b-lg' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLocale === language.code && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay để đóng dropdown khi click bên ngoài */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

