import React from "react";
import { Check } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { subscriptionPlans } from "../../utils/mockData.js";

const PlanSelector = ({ selectedPlan, onPlanSelect, className = "" }) => {
  const { t, language } = useI18n();

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {subscriptionPlans.map((plan) => (
        <div
          key={plan.id}
          className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedPlan?.id === plan.id
              ? "border-primary bg-primary-50"
              : "border-gray-200 hover:border-primary-300"
          }`}
          onClick={() => onPlanSelect(plan)}
        >
          {selectedPlan?.id === plan.id && (
            <div className="absolute top-4 right-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
          )}

          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {plan.name[language]}
            </h3>
            <div className="text-3xl font-bold text-primary mb-4">
              {plan.price} {t("plans.omr")}
              <span className="text-sm font-normal text-gray-500">
                /{plan.duration[language]}
              </span>
            </div>
          </div>

          <ul className="space-y-3 mb-6">
            {plan.features[language].map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                selectedPlan?.id === plan.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {selectedPlan?.id === plan.id
                ? t("plans.selected")
                : t("plans.select")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanSelector;
