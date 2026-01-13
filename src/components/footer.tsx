import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaRss } from "react-icons/fa";

export default async function Footer() {
  const t = await getTranslations("Home.footer");
  const tNav = await getTranslations("nav");
  const tHeader = await getTranslations("header");

  return (
    <footer className="border-t-2 border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logotradehub.png"
                alt="TradeHub Logo"
                width={40}
                height={40}
                className="object-contain rounded-full"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TradeHub
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              {t("about.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t("quickLinks.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                  {t("quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                  {t("quickLinks.services")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                  {t("quickLinks.products")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                  {t("quickLinks.contact")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors">
                  {t("quickLinks.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t("contact.title")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4 text-blue-600" />
                <a
                  href={`mailto:${tHeader("contact.email")}`}
                  className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                >
                  {tHeader("contact.email")}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="w-4 h-4 text-blue-600" />
                <a
                  href={`tel:${tHeader("contact.phone")}`}
                  className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                >
                  {tHeader("contact.phone")}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="w-4 h-4 text-blue-600 mt-1" />
                <span className="text-sm text-gray-700">
                  Malta, Europe
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{t("followUs.title")}</h3>
            <div className="flex space-x-4">
              <a
                href={tHeader("social.facebook")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={tHeader("social.twitter")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href={tHeader("social.rss")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-200 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="RSS"
              >
                <FaRss className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-blue-200 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-700">{t("copyright")}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-700">
              <Link href="/terms" className="hover:text-blue-600 hover:underline transition-colors">
                {t("quickLinks.terms")}
              </Link>
              <span>|</span>
              <Link href="/privacy" className="hover:text-blue-600 hover:underline transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
