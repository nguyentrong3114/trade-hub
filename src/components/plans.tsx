"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FaCheck } from "react-icons/fa";

export interface Plan {
  id: number;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

interface PlansSectionProps {
  plans?: Plan[];
}

export default function PlansSection({ plans }: PlansSectionProps) {
  const t = useTranslations("plans");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const discountRate = 0.2;

  // Default plans if not provided
  const defaultPlans: Plan[] = [
    {
      id: 1,
      name: t("plan1.name"),
      price: 29,
      period: t("monthly"),
      description: t("plan1.description"),
      features: [
        t("plan1.feature1"),
        t("plan1.feature2"),
        t("plan1.feature3"),
        t("plan1.feature4"),
        t("plan1.feature5"),
      ],
      buttonText: t("getStarted"),
    },
    {
      id: 2,
      name: t("plan2.name"),
      price: 79,
      period: t("monthly"),
      description: t("plan2.description"),
      features: [
        t("plan2.feature1"),
        t("plan2.feature2"),
        t("plan2.feature3"),
        t("plan2.feature4"),
        t("plan2.feature5"),
        t("plan2.feature6"),
      ],
      popular: true,
      buttonText: t("getStarted"),
    },
    {
      id: 3,
      name: t("plan3.name"),
      price: 149,
      period: t("monthly"),
      description: t("plan3.description"),
      features: [
        t("plan3.feature1"),
        t("plan3.feature2"),
        t("plan3.feature3"),
        t("plan3.feature4"),
        t("plan3.feature5"),
        t("plan3.feature6"),
        t("plan3.feature7"),
      ],
      buttonText: t("contactUs"),
    },
  ];

  const displayPlans = plans || defaultPlans;
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(() => {
    const basePlans = displayPlans;
    const popularPlan = basePlans.find((p) => p.popular);
    return popularPlan?.id ?? basePlans[0]?.id ?? null;
  });

  const computedPlans = useMemo(
    () =>
      displayPlans.map((plan) => {
        const basePrice = plan.price;
        const isYearly = billingCycle === "yearly";
        const price = isYearly
          ? Math.round(basePrice * 12 * (1 - discountRate))
          : basePrice;
        const period = isYearly ? t("yearly") : t("monthly");
        return { ...plan, price, period, basePrice, isYearly };
      }),
    [billingCycle, displayPlans, discountRate, t],
  );

  const selectedPlan = useMemo(
    () => computedPlans.find((plan) => plan.id === selectedPlanId) ?? computedPlans[0],
    [computedPlans, selectedPlanId],
  );

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

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white p-2 shadow-sm">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              billingCycle === "monthly"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t("monthlyLabel")}
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t("yearlyLabel")}
            <span className="text-xs font-bold text-green-200 bg-white/20 rounded-full px-2 py-0.5 border border-white/30">
              {t("save20")}
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {computedPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`relative cursor-pointer bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
              plan.id === selectedPlanId
                ? "border-blue-600 shadow-lg ring-2 ring-blue-500"
                : plan.popular
                  ? "border-blue-600 shadow-lg md:scale-105"
                  : "border-gray-200 hover:border-blue-300"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {t("popular")}
                </span>
              </div>
            )}

            <div className="p-8">
              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6 min-h-[40px]">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6 space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                  {plan.isYearly && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      {t("save20")}
                    </span>
                  )}
                </div>
                {plan.isYearly && (
                  <p className="text-xs text-gray-500">
                    {t("yearlyNote", {
                      original: Math.round(plan.basePrice * 12).toLocaleString(),
                    })}
                  </p>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Plan Details */}
      {selectedPlan && (
        <div className="mt-14 max-w-3xl mx-auto rounded-2xl border border-blue-100 bg-blue-50/60 p-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            {t("selectedPlanLabel") ?? "Selected plan details"}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {selectedPlan.name}
          </h3>
          <p className="text-gray-700 mb-5">
            {selectedPlan.description}
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-4">{t("additionalInfo")}</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <FaCheck className="w-4 h-4 text-green-500" />
            {t("info1")}
          </span>
          <span className="flex items-center gap-2">
            <FaCheck className="w-4 h-4 text-green-500" />
            {t("info2")}
          </span>
          <span className="flex items-center gap-2">
            <FaCheck className="w-4 h-4 text-green-500" />
            {t("info3")}
          </span>
        </div>
      </div>
    </section>
  );
}

