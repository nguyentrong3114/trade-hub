"use client";

import { useTranslations } from "next-intl";
import {
  FaPlay,
  FaTag,
  FaUsers,
  FaFlag,
  FaClock,
  FaMapMarkerAlt,
  FaLanguage,
  FaChevronDown,
} from "react-icons/fa";
import type { ClientDetail } from "./types";

interface ClientVideoSectionProps {
  client: ClientDetail;
}

export default function ClientVideoSection({ client }: ClientVideoSectionProps) {
  const t = useTranslations("clientDetail");

  // Extended client data with defaults
  const minProjectSize = (client as any).minProjectSize || "$10,000+";
  const hourlyRate = (client as any).hourlyRate || "$25 - $49 / hr";
  const timezones = (client as any).timezones || 7;
  const languages = (client as any).languages || 4;
  const additionalLocations = (client as any).additionalLocations || 3;
  const videoUrl = (client as any).videoUrl || "#";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Watch Video Section */}
      <div className="mb-6">
        <a
          href={videoUrl}
          className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
            <FaPlay className="w-4 h-4 text-blue-600" />
          </div>
          <span>{t("watchVideo")}</span>
        </a>
      </div>

      {/* Company Attributes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Min Project Size */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaTag className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("minProjectSize")}</div>
              <div className="text-base font-medium text-gray-900">{minProjectSize}</div>
            </div>
          </div>

          {/* Employees */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaUsers className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("employees")}</div>
              <div className="text-base font-medium text-gray-900">{client.employeeCount}</div>
            </div>
          </div>

          {/* Year Founded */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaFlag className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("yearFounded")}</div>
              <div className="text-base font-medium text-gray-900">
                {t("founded", { year: client.foundedYear })}
              </div>
            </div>
          </div>

          {/* Timezones */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaClock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("timezones")}</div>
              <a
                href="#"
                className="text-base font-medium text-blue-600 hover:text-blue-700 cursor-pointer inline-flex items-center gap-1"
              >
                {t("timezonesCount", { count: timezones })}
                <FaChevronDown className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Hourly Rate */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaClock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("hourlyRate")}</div>
              <div className="text-base font-medium text-gray-900">{hourlyRate}</div>
            </div>
          </div>

          {/* Locations */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("locations")}</div>
              <a
                href="#"
                className="text-base font-medium text-blue-600 hover:text-blue-700 cursor-pointer inline-flex items-center gap-1"
              >
                {client.location} +{additionalLocations}
                <FaChevronDown className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <FaLanguage className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-600 mb-1">{t("languages")}</div>
              <a
                href="#"
                className="text-base font-medium text-blue-600 hover:text-blue-700 cursor-pointer inline-flex items-center gap-1"
              >
                {t("languagesCount", { count: languages })}
                <FaChevronDown className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

