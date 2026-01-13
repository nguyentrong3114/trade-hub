"use client";

import { useTranslations } from "next-intl";
import { FaRocket, FaUsers, FaTrophy, FaGlobe, FaChartLine, FaAward } from "react-icons/fa";

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TimelineSectionProps {
  items?: TimelineItem[];
}

export default function TimelineSection({ items }: TimelineSectionProps) {
  const t = useTranslations("about.timeline");

  // Default timeline items if not provided
  const defaultItems: TimelineItem[] = [
    {
      id: 1,
      year: t("item1.year"),
      title: t("item1.title"),
      description: t("item1.description"),
      icon: FaRocket,
    },
    {
      id: 2,
      year: t("item2.year"),
      title: t("item2.title"),
      description: t("item2.description"),
      icon: FaUsers,
    },
    {
      id: 3,
      year: t("item3.year"),
      title: t("item3.title"),
      description: t("item3.description"),
      icon: FaTrophy,
    },
    {
      id: 4,
      year: t("item4.year"),
      title: t("item4.title"),
      description: t("item4.description"),
      icon: FaGlobe,
    },
    {
      id: 5,
      year: t("item5.year"),
      title: t("item5.title"),
      description: t("item5.description"),
      icon: FaChartLine,
    },
    {
      id: 6,
      year: t("item6.year"),
      title: t("item6.title"),
      description: t("item6.description"),
      icon: FaAward,
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {t("title")}
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-blue-500 via-blue-400 to-blue-500"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {displayItems.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex items-start md:items-center gap-6 md:gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Left/Right content based on index */}
                  <div
                    className={`flex-1 ${
                      isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${
                        isEven ? "md:mr-auto md:max-w-md" : "md:ml-auto md:max-w-md"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2 md:justify-start">
                        {!isEven && (
                          <IconComponent className="w-5 h-5 text-blue-600 shrink-0" />
                        )}
                        <span className="text-2xl font-bold text-blue-600">
                          {item.year}
                        </span>
                        {isEven && (
                          <IconComponent className="w-5 h-5 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot and icon */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border-4 border-blue-600 flex items-center justify-center shadow-lg z-10 relative">
                      <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

