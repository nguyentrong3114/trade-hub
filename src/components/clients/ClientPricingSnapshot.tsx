"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FaTag,
  FaClock,
  FaFileInvoiceDollar,
  FaInfoCircle,
  FaChevronRight,
} from "react-icons/fa";
import type { ClientDetail } from "./types";

interface ProjectSizeDistribution {
  range: string;
  percentage: number;
  reviews?: number;
}

interface ClientPricingSnapshotProps {
  client: ClientDetail;
}

export default function ClientPricingSnapshot({ client }: ClientPricingSnapshotProps) {
  const t = useTranslations("clientDetail");
  const [selectedService, setSelectedService] = useState("all");

  // Extended client data with defaults
  const minProjectSize = (client as any).minProjectSize || "$10,000+";
  const avgHourlyRate = (client as any).hourlyRate || "$25 - $49 / hr";
  const costRating = (client as any).costRating || 4.6;
  const mostCommonProjectSize = (client as any).mostCommonProjectSize || {
    range: "$200,000 - $999,999",
    reviews: 22,
  };
  const projectSizeDistribution: ProjectSizeDistribution[] =
    (client as any).projectSizeDistribution || [
      { range: "< $49,999", percentage: 5 },
      { range: "$50,000 - $199,999", percentage: 15 },
      { range: "$200,000 - $999,999", percentage: 65 },
      { range: "> $1,000,000", percentage: 15 },
    ];
  const clientFeedback = (client as any).clientFeedback ||
    "Edvantis is praised for providing good value for cost, with many clients noting that their pricing fits budgets. Specific project costs range from $43,000 to $1 million+, with teams typically comprising 2-50 employees. Their strong communication and timely delivery further enhance perceived value. This summary is based on verified Clutch reviews.";
  const services = (client as any).services || [
    "all",
    "Custom Software Development",
    "IT Staff Augmentation",
    "Application Testing",
    "Web Development",
    "AI Development",
    "API Development",
    "E-Commerce Development",
    "Enterprise App Modernization",
  ];
  const additionalServicesCount = (client as any).additionalServicesCount || 14;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Pricing Snapshot Header */}
      <h2 className="text-xl font-bold text-gray-900">{t("pricingSnapshot")}</h2>

      {/* Pricing Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Min Project Size */}
        <div className="border-t-4 border-green-500 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaTag className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t("minProjectSize")}</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{minProjectSize}</div>
        </div>

        {/* Avg Hourly Rate */}
        <div className="border-t-4 border-blue-500 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t("avgHourlyRate")}</span>
          </div>
          <div className="text-lg font-bold text-gray-900">{avgHourlyRate}</div>
        </div>

        {/* Rating for Cost */}
        <div className="border-t-4 border-yellow-500 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaFileInvoiceDollar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t("ratingForCost")}</span>
            <FaInfoCircle className="w-3 h-3 text-gray-400" />
          </div>
          <div className="text-lg font-bold text-gray-900">{costRating}/5</div>
        </div>
      </div>

      {/* Most Common Project Size */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          {t("mostCommonProjectSize")}
        </h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
            <FaTag className="w-4 h-4 text-yellow-600" />
          </div>
          <div>
            <div className="text-base font-semibold text-gray-900">
              {mostCommonProjectSize.range}
            </div>
            <div className="text-sm text-gray-600">
              {t("basedOnReviews", { count: mostCommonProjectSize.reviews })}
            </div>
          </div>
        </div>

        {/* Project Size Distribution Bar */}
        <div className="space-y-2">
          {projectSizeDistribution.map((item, index) => {
            const colors = [
              "bg-gray-300",
              "bg-gray-400",
              "bg-green-500",
              "bg-green-600",
            ];
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-24 text-xs text-gray-600">{item.range}</div>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors[index]} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-12 text-xs text-gray-600 text-right">
                  {item.percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Client Feedback */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          {t("whatClientsHaveSaid")}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{clientFeedback}</p>
      </div>

      {/* Service Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-base font-semibold text-gray-900">
            {t("selectServiceForPricing")}
          </h3>
          <FaInfoCircle className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          {services.map((service: string, index: number) => {
            const isActive = selectedService === service;
            return (
              <button
                key={index}
                onClick={() => setSelectedService(service)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300"
                }`}
              >
                {service === "all" ? t("all") : service}
              </button>
            );
          })}
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 border-2 border-gray-200 hover:border-gray-300 bg-white">
            +{additionalServicesCount} {t("more")}
          </button>
        </div>
      </div>
    </div>
  );
}

