"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FaPlus, FaMinus, FaEnvelope } from "react-icons/fa";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What is included in the Starter plan?",
    answer: "The Starter plan includes basic features, up to 10 projects, email support, and access to our knowledge base. Perfect for individuals and small teams getting started.",
  },
  {
    id: 2,
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences.",
  },
  {
    id: 3,
    question: "How secure is my data?",
    answer: "We use industry-standard encryption, regular security audits, and comply with GDPR and SOC 2 Type II standards. Your data is stored securely and never shared with third parties.",
  },
  {
    id: 4,
    question: "Can I integrate this platform with other tools?",
    answer: "Yes, we offer integrations with popular tools like Slack, Google Workspace, Microsoft 365, and many others through our API and webhook system.",
  },
  {
    id: 5,
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial for all plans. No credit card required. You can explore all features and cancel anytime during the trial period.",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments for annual plans.",
  },
  {
    id: 7,
    question: "How does the 2% donation work?",
    answer: "We donate 2% of all revenue to environmental and social causes. You can choose which cause your contribution supports, and we provide transparent reporting on all donations.",
  },
  {
    id: 8,
    question: "What makes your platform different?",
    answer: "Our platform combines powerful automation with an intuitive interface, backed by 24/7 support and continuous innovation. We focus on delivering measurable results and exceptional user experience.",
  },
];

export default function QuestionSection() {
  const t = useTranslations("Home.faq");
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([1])); // First item open by default

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Split FAQ items into two columns
  const leftColumnItems = FAQ_ITEMS.slice(0, 4);
  const rightColumnItems = FAQ_ITEMS.slice(4, 8);

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {t("title")}
          </h2>

          {/* Subtitle and CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:flex-1 lg:justify-end">
            <p className="text-base sm:text-lg text-gray-600 max-w-md lg:max-w-none">
              {t("subtitle")}
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap">
              {t("ctaButton")}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {/* Left Column */}
        <div className="space-y-4">
          {leftColumnItems.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-gray-900 bg-gradient-to-br from-blue-50/50 to-white shadow-md"
                    : "border-gray-200 bg-gradient-to-br from-gray-50/30 to-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className={`text-sm sm:text-base font-medium pr-4 ${
                      isOpen ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div className="shrink-0">
                    {isOpen ? (
                      <FaMinus className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FaPlus className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightColumnItems.map((item) => {
            const isOpen = openItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-gray-900 bg-gradient-to-br from-blue-50/50 to-white shadow-md"
                    : "border-gray-200 bg-gradient-to-br from-gray-50/30 to-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className={`text-sm sm:text-base font-medium pr-4 ${
                      isOpen ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {item.question}
                  </span>
                  <div className="shrink-0">
                    {isOpen ? (
                      <FaMinus className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FaPlus className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Contact */}
      <div className="text-center pt-8 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <FaEnvelope className="w-4 h-4" />
          <span className="text-sm sm:text-base">
            {t("contactText")}{" "}
            <a
              href={`mailto:${t("contactEmail")}`}
              className="text-blue-600 hover:text-blue-700 underline font-medium"
            >
              {t("contactEmail")}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}

