import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { omanRegions } from "../../utils/regionsOM.js";

const SearchBar = ({ onSearch, className = "" }) => {
  const { t, language } = useI18n();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, location });
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg p-2 shadow-lg">
        <div className="flex-1 relative">
          <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${language === 'ar' ? 'text-right' : 'text-left'}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
        <div className="relative">
          <MapPin className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`${language === 'ar' ? 'pr-10 pl-8' : 'pl-10 pr-8'} py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-[200px] ${language === 'ar' ? 'text-right' : 'text-left'}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <option value="">{t("search.locationPlaceholder")}</option>
            {omanRegions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name[language]}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="btn-primary px-8 py-3 whitespace-nowrap"
        >
          {t("search.button")}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
