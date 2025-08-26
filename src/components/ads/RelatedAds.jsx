import React from "react";
import { useAds } from "../../hooks/useAds.js";
import AdCard from "./AdCard.jsx";

const RelatedAds = ({ currentAd, limit = 4, className = "" }) => {
  const { ads } = useAds();

  const getRelatedAds = () => {
    if (!currentAd) return [];

    return ads
      .filter((ad) => 
        ad.id !== currentAd.id && 
        (ad.categoryId === currentAd.categoryId || ad.locationId === currentAd.locationId)
      )
      .slice(0, limit);
  };

  const relatedAds = getRelatedAds();

  if (relatedAds.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        إعلانات مشابهة
      </h3>
      <div className="grid grid-cols-1   gap-4">
        {relatedAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default RelatedAds;
