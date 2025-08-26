import React from "react";
import { useI18n } from "../../hooks/useI18n.js";
import { formatOMR } from "../../utils/formatOMR.js";

const SummaryCard = ({ plan, duration, className = "" }) => {
  const { t, language } = useI18n();

  if (!plan) return null;

  const calculateTotal = () => {
    const basePrice = plan.price;
    const durationMultiplier = parseInt(duration) / 30; // Based on monthly pricing
    return basePrice * durationMultiplier;
  };

  const total = calculateTotal();

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t("summary.title")}
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">{t("summary.plan")}</span>
          <span className="font-medium">{plan.name[language]}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{t("summary.duration")}</span>
          <span className="font-medium">{duration} {t("summary.days")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">{t("summary.pricePerMonth")}</span>
          <span className="font-medium">{formatOMR(plan.price)}</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>{t("summary.total")}</span>
          <span className="text-primary">{formatOMR(total)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">
          {t("summary.includes")}
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {plan.features[language].map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummaryCard;
