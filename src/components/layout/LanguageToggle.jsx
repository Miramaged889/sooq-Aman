import React from "react";
import { useI18n } from "../../hooks/useI18n.js";
import { Globe } from "lucide-react";

const LanguageToggle = ({ className = "" }) => {
  const { language, changeLanguage } = useI18n();

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors ${className}`}
      aria-label={`Switch to ${language === "ar" ? "English" : "العربية"}`}
    >
      <Globe className="h-4 w-4" />
      <span>{language === "ar" ? "EN" : "عربي"}</span>
    </button>
  );
};

export default LanguageToggle;
