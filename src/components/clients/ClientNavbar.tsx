"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FaInfoCircle,
  FaNewspaper,
  FaUsers,
  FaComments,
  FaImages,
  FaPhone,
  FaBriefcase,
} from "react-icons/fa";

interface NavItem {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
}

interface ClientNavbarProps {
  clientName: string;
  clientLogo?: string;
}

export default function ClientNavbar({ clientName, clientLogo }: ClientNavbarProps) {
  const t = useTranslations("clientNavbar");
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: "about", labelKey: "about", icon: <FaInfoCircle className="w-5 h-5" /> },
    { id: "blog", labelKey: "blog", icon: <FaNewspaper className="w-5 h-5" /> },
    { id: "leaders", labelKey: "leaders", icon: <FaUsers className="w-5 h-5" /> },
    { id: "testimonials", labelKey: "testimonials", icon: <FaComments className="w-5 h-5" /> },
    { id: "recruitment", labelKey: "recruitment", icon: <FaBriefcase className="w-5 h-5" /> },
    { id: "gallery", labelKey: "gallery", icon: <FaImages className="w-5 h-5" /> },
    { id: "contact", labelKey: "contact", icon: <FaPhone className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Find active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
          {/* Dock Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 px-2 py-2 flex items-end gap-1">
            {/* Client Logo */}
            <div className="flex items-center justify-center px-3 border-r border-gray-200/50 mr-1">
              {clientLogo ? (
                <img
                  src={clientLogo}
                  alt={clientName}
                  className="w-10 h-10 rounded-xl object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {clientName.charAt(0)}
                </div>
              )}
            </div>

            {/* Navigation Items */}
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;

              return (
                <div key={item.id} className="relative">
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                      >
                        {t(item.labelKey)}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Button */}
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.2, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}

            {/* Divider */}
            <div className="w-px h-8 bg-gray-200/50 mx-1" />

            {/* Contact Now Button */}
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-shadow"
            >
              <FaPhone className="w-4 h-4" />
              <span className="hidden sm:inline">{t("contactNow")}</span>
            </motion.button>
          </div>
        </motion.div>
  );
}
