"use client";

import { useTranslations } from "next-intl";
import { FaStar, FaInfoCircle, FaThumbsUp, FaThumbsDown, FaChevronDown } from "react-icons/fa";
import type { ClientDetail } from "./types";

interface ClientReviewsProps {
  client: ClientDetail;
}

export default function ClientReviews({ client }: ClientReviewsProps) {
  const t = useTranslations("clientReviews");

  // Extended client data with defaults
  const overallRating = (client as any).overallRating || 4.8;
  const totalReviews = (client as any).totalReviews || 40;
  const topMentions = (client as any).topMentions || [
    { label: "Communicative", count: 12 },
    { label: "Timely", count: 12 },
    { label: "Proactive", count: 9 },
    { label: "Team Players", count: 8 },
    { label: "High-Quality Work", count: 5 },
    { label: "Experienced", count: 3 },
    { label: "Great Project Management", count: 3 },
    { label: "Professional", count: 3 },
  ];
  const reviewHighlights = (client as any).reviewHighlights || [
    {
      title: "Strong Project Management Skills",
      description:
        "Edvantis consistently delivers projects on time and manages them effectively. Clients appreciate their proactive communication, responsiveness, and ability to adapt to evolving needs, ensuring projects meet or exceed expectations.",
    },
    {
      title: "Proficiency in Agile Methodologies",
      description:
        "Edvantis effectively employs Agile methodologies, contributing to efficient project management and timely delivery. Their ability to integrate into clients' Agile processes is a noted strength.",
    },
    {
      title: "Room for Improvement",
      description:
        "Some clients mentioned a need for more personnel to handle larger projects or faster scaling during peak periods.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <FaInfoCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-blue-900">
            {t("verificationInfo")}
          </p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-xl font-bold">×</button>
      </div>

      {/* Top Mentions */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t("topMentions")}</h3>
          <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2">
            <div className="text-right">
              <div className="text-xs text-gray-600">{t("overallReviewRating")}</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{overallRating}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(overallRating)
                          ? "text-red-500 fill-current"
                          : i < overallRating
                          ? "text-red-500 fill-current opacity-50"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({totalReviews})</span>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
              {t("seeBreakdown")}
              <FaChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {topMentions.map((mention: any, index: number) => (
            <button
              key={index}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              {mention.label} ({mention.count})
            </button>
          ))}
        </div>
      </div>

      {/* Review Highlights */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("reviewHighlights")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviewHighlights.map((highlight: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                index === reviewHighlights.length - 1
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-2">{highlight.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer"
        >
          {t("readAllReviews", { count: totalReviews })}
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{t("wasThisHelpful")}</span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <FaThumbsUp className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <FaThumbsDown className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

