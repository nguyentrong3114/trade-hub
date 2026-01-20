"use client";

import { useTranslations } from "next-intl";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import type { ClientDetail } from "./types";

interface ClientVerificationProps {
  client: ClientDetail;
}

export default function ClientVerification({ client }: ClientVerificationProps) {
  const t = useTranslations("clientVerification");

  const verificationData = (client as any).verification || {
    verifiedReviews: 40,
    overallRating: 4.8,
    source: "Clutch",
    lastUpdated: "January 9, 2026",
    businessEntity: {
      name: "Edvantis GmbH",
      source: "Common Register Portal of the German Federal States",
      jurisdiction: "Germany",
      dateOfFormation: "November 17, 2017",
      status: "Active",
      lastUpdated: "June 9, 2022",
      id: "HRB 191428 B",
    },
    creditReport: {
      riskAssessment: "Low Risk",
      source: "Creditsafe",
      lastUpdated: "January 1, 2022",
    },
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="flex items-start justify-between gap-4">
        <p className="text-gray-700 leading-relaxed flex-1">
          {t("intro")}
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap">
          {t("learnMore")} →
        </a>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">{t("verifiedClientReviews")}</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {verificationData.verifiedReviews}
            </span>
            <FaInfoCircle className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">{t("overallReviewRating")}</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {verificationData.overallRating}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(verificationData.overallRating)
                      ? "text-red-500 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">{t("source")}</div>
          <div className="text-lg font-semibold text-gray-900">{verificationData.source}</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-xs text-gray-600 mb-1">{t("lastUpdated")}</div>
          <div className="text-sm font-semibold text-gray-900">{verificationData.lastUpdated}</div>
        </div>
      </div>

      {/* Business Entity & Credit Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Entity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("businessEntity")}</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("businessEntityName")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.businessEntity.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("source")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.businessEntity.source}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("jurisdiction")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.businessEntity.jurisdiction}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("dateOfFormation")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.businessEntity.dateOfFormation}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("status")}</span>
              <span className="text-sm font-medium text-green-600">
                {verificationData.businessEntity.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("lastUpdated")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.businessEntity.lastUpdated}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">ID</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.businessEntity.id}
              </span>
            </div>
          </div>
        </div>

        {/* Credit Report Results */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("creditReportResults")}</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                {t("internationalCreditRisk")}
                <FaInfoCircle className="w-3 h-3 text-gray-400" />
              </span>
              <span className="text-sm font-medium text-green-600">
                {verificationData.creditReport.riskAssessment}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("source")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.creditReport.source}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t("lastUpdated")}</span>
              <span className="text-sm font-medium text-gray-900">
                {verificationData.creditReport.lastUpdated}
              </span>
            </div>
          </div>
          <a
            href="#"
            className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {t("learnMoreAboutVerification")} →
          </a>
        </div>
      </div>
    </div>
  );
}

