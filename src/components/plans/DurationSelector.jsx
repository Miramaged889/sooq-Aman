import React from "react";
import { useI18n } from "../../hooks/useI18n.js";

const DurationSelector = ({ selectedDuration, onDurationSelect, className = "" }) => {
  const { t } = useI18n();

  const durations = [
    { value: "7", label: t("duration.week") },
    { value: "30", label: t("duration.month") },
    { value: "90", label: t("duration.quarter") },
    { value: "365", label: t("duration.year") },
  ];

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {t("duration.title")}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {durations.map((duration) => (
          <button
            key={duration.value}
            onClick={() => onDurationSelect(duration.value)}
            className={`p-3 rounded-lg border-2 text-center transition-all ${
              selectedDuration === duration.value
                ? "border-primary bg-primary-50 text-primary"
                : "border-gray-200 hover:border-primary-300 text-gray-700"
            }`}
          >
            <div className="font-semibold">{duration.value}</div>
            <div className="text-sm">{duration.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;
