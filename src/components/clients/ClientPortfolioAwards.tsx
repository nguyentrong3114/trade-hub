"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaStar, FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import type { ClientDetail } from "./types";

interface ClientPortfolioAwardsProps {
  client: ClientDetail;
}

export default function ClientPortfolioAwards({ client }: ClientPortfolioAwardsProps) {
  const t = useTranslations("clientPortfolio");
  const [showMore, setShowMore] = useState(false);

  const projects = (client as any).portfolioProjects || [
    {
      title: "Custom Ecommerce Development (Testimonial Video)",
      category: "E-Commerce Development",
      categories: ["E-Commerce Development", "Web Development"],
      testimonial: {
        author: "Randy Ramirez",
        position: "Co-Founder & CEO",
        quote: "They're able to come up with their own ideas to contribute to our own.",
        avatar: "/img/logo/1.png",
      },
      image: "/img/auction/1.jpg",
    },
    {
      title: "AI-Powered Web Platform for a US Data Aggregator",
      category: "Custom Software Development",
      categories: ["Custom Software Development", "AI Development"],
      testimonial: {
        author: "Seth Kraus",
        position: "CTO at CS Labs, LLC",
        rating: 5,
      },
      metrics: {
        partnership: "+13 years of partnership",
        projects: "20+ projects",
        team: "3-5 team members",
      },
      image: "/img/auction/2.webp",
    },
    {
      title: "zBKU Ticketing App for a Swedish Transport Vendor",
      category: "Custom Software Development",
      testimonial: {
        author: "Torbjörn Henryson",
        position: "Business Developer at Modulsystem",
        rating: 5,
      },
      metrics: {
        users: "1100+ users installed",
        clients: "2 user clients engaged",
        team: "10 team members",
      },
      image: "/img/auction/car.jpg",
    },
    {
      title: "Predictive AI Model for a Talent Tech Company",
      category: "AI Development",
      categories: ["AI Development", "Machine Learning"],
      logo: "RETAIN",
      metrics: {
        duration: "3 months project duration",
        features: "49 features in AI model",
        team: "8 team members",
      },
      image: "/img/section1.jpg",
    },
  ];

  const keyClients = (client as any).keyClients || [
    "Indeed",
    "BigCommerce",
    "Doocimus",
    "KPC Labs",
    "TrustRadius",
    "Modulsystem",
    "TESTCO",
    "ATR",
    "Freenet Group",
    "Samdatex",
    "Safety Media",
    "Jaron",
    "Collanda",
    "Altruros Destinations",
    "Novellus",
    "Technileat",
    "Retain",
    "Wellner Healthtech",
    "Kardex Remstar",
    "Smitha Detection",
    "ITK Engineering",
    "Is tools",
    "Oasis",
  ];

  const awards = (client as any).awards || [
    { title: "Clutch 1000", year: "2025" },
    { title: "Clutch GLOBAL", period: "FALL 2025" },
    { title: "Clutch CHAMPION", period: "FALL 2025" },
    { title: "Clutch TOP COMPANY", subtitle: "Artificial Intelligence Company", year: "2025" },
    { title: "TOP BIG DATA COMPANY", source: "Clutch", year: "2025" },
  ];

  const displayedProjects = showMore ? projects : projects.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Portfolio Projects */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("portfolio")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedProjects.map((project: any, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.image && (
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                {project.testimonial && (
                  <div className="flex items-start gap-3 mb-3">
                    {project.testimonial.avatar && (
                      <Image
                        src={project.testimonial.avatar}
                        alt={project.testimonial.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {project.testimonial.author}
                        </span>
                        {project.testimonial.rating && (
                          <div className="flex items-center gap-1">
                            {[...Array(project.testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                      {project.testimonial.position && (
                        <div className="text-xs text-gray-600 mb-2">
                          {project.testimonial.position}
                        </div>
                      )}
                      {project.testimonial.quote && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-2 rounded text-sm text-gray-700">
                          "{project.testimonial.quote}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {project.logo && (
                  <div className="mb-3">
                    <div className="text-lg font-bold text-gray-900">{project.logo}</div>
                  </div>
                )}
                <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                {project.metrics && (
                  <div className="space-y-1 mb-3">
                    {Object.values(project.metrics).map((metric: any, i: number) => (
                      <div key={i} className="text-sm text-gray-600">
                        {metric}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {project.category}
                  </span>
                  {project.categories && project.categories.length > 1 && (
                    <span className="text-xs text-gray-500">
                      +{project.categories.length - 1} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {projects.length > 4 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2 cursor-pointer"
          >
            {showMore ? t("showLess") : t("showMore")}
            <FaChevronDown
              className={`w-4 h-4 transition-transform ${showMore ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Key Clients */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("keyClients")}</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {keyClients.map((clientName: string, index: number) => (
              <li key={index} className="text-sm text-gray-700 list-disc list-inside">
                {clientName}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Clutch Awards */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t("clutchAwards")}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {t("featuredAwards")}
          </span>
        </div>
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {awards.map((award: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 min-w-[120px] text-center border-2 border-gray-300"
              >
                <div className="font-bold text-gray-900 text-sm mb-1">{award.title}</div>
                {award.subtitle && (
                  <div className="text-xs text-gray-600 mb-1">{award.subtitle}</div>
                )}
                {award.period && (
                  <div className="text-xs text-gray-600">{award.period}</div>
                )}
                {award.year && (
                  <div className="text-xs text-gray-600">{award.year}</div>
                )}
                {award.source && (
                  <div className="text-xs text-gray-500 mt-1">{award.source}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

