import React, { useState, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import {
  getGovernorateOptions,
  getWilayatOptions,
  getGovernorrateName,
  findWilayat,
} from "../../utils/regionsOM.js";
import { useI18n } from "../../hooks/useI18n.js";

const LocationSelector = ({
  value = { governorate: "", wilayat: "" },
  onChange,
  error,
  required = false,
  className = "",
}) => {
  const { language } = useI18n();
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    value.governorate || ""
  );
  const [selectedWilayat, setSelectedWilayat] = useState(value.wilayat || "");

  const governorateOptions = getGovernorateOptions(language);
  const wilayatOptions = selectedGovernorate
    ? getWilayatOptions(selectedGovernorate, language)
    : [];

  useEffect(() => {
    if (
      value.governorate !== selectedGovernorate ||
      value.wilayat !== selectedWilayat
    ) {
      setSelectedGovernorate(value.governorate || "");
      setSelectedWilayat(value.wilayat || "");
    }
  }, [value]);

  const handleGovernorateChange = (governorateId) => {
    setSelectedGovernorate(governorateId);
    setSelectedWilayat(""); // Reset wilayat when governorate changes

    if (onChange) {
      onChange({
        governorate: governorateId,
        wilayat: "",
      });
    }
  };

  const handleWilayatChange = (wilayatId) => {
    setSelectedWilayat(wilayatId);

    if (onChange) {
      onChange({
        governorate: selectedGovernorate,
        wilayat: wilayatId,
      });
    }
  };

  const getDisplayText = () => {
    if (!selectedGovernorate) {
      return language === "ar" ? "اختر المنطقة" : "Select Region";
    }

    const governorateName = getGovernorrateName(selectedGovernorate, language);

    if (!selectedWilayat) {
      return governorateName;
    }

    const wilayat = findWilayat(selectedWilayat);
    const wilayatName = wilayat ? wilayat.name[language] : selectedWilayat;

    return language === "ar"
      ? `${wilayatName}، ${governorateName}`
      : `${wilayatName}, ${governorateName}`;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <label
          className={`block text-sm font-medium text-gray-700 mb-2 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {language === "ar" ? "المحافظة" : "Governorate"}
            {required && <span className="text-red-500">*</span>}
          </div>
        </label>

        <div className="relative">
          <select
            value={selectedGovernorate}
            onChange={(e) => handleGovernorateChange(e.target.value)}
            className={`
              w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-200 bg-white
              ${language === "ar" ? "text-right" : "text-left"}
              ${error ? "border-red-500 focus:ring-red-500" : ""}
            `}
            required={required}
          >
            <option value="">
              {language === "ar" ? "اختر المحافظة..." : "Select Governorate..."}
            </option>
            {governorateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none ${
              language === "ar" ? "left-3" : "right-3"
            }`}
          />
        </div>
      </div>

      {selectedGovernorate && (
        <div className="relative">
          <label
            className={`block text-sm font-medium text-gray-700 mb-2 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {language === "ar" ? "الولاية" : "Wilayat"}
              {required && <span className="text-red-500">*</span>}
            </div>
          </label>

          <div className="relative">
            <select
              value={selectedWilayat}
              onChange={(e) => handleWilayatChange(e.target.value)}
              className={`
                w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-primary focus:border-transparent
                transition-all duration-200 bg-white
                ${language === "ar" ? "text-right" : "text-left"}
                ${error ? "border-red-500 focus:ring-red-500" : ""}
              `}
              required={required}
            >
              <option value="">
                {language === "ar" ? "اختر الولاية..." : "Select Wilayat..."}
              </option>
              {wilayatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none ${
                language === "ar" ? "left-3" : "right-3"
              }`}
            />
          </div>
        </div>
      )}

      {/* Display Selected Location */}
      {selectedGovernorate && (
        <div
          className={`p-3 bg-gray-50 rounded-lg border ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">
              {language === "ar" ? "الموقع المختار:" : "Selected Location:"}
            </span>
          </div>
          <div className="mt-1 text-gray-900 font-medium">
            {getDisplayText()}
          </div>
        </div>
      )}

      {error && (
        <p
          className={`text-sm text-red-600 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
