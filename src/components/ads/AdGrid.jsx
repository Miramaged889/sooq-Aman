import React from "react";
import { useI18n } from "../../hooks/useI18n.js";
import AdCard from "./AdCard.jsx";

const AdGrid = ({ ads, className = "" }) => {
  const { t } = useI18n();

  if (!ads || ads.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500">
          <p className="text-lg mb-2">{t("listings.noResults")}</p>
          <p className="text-sm">{t("listings.noResultsDescription")}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

export default AdGrid;
