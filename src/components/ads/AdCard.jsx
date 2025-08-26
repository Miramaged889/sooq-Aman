import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  Heart,
} from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { useAnalytics } from "../../hooks/useAnalytics.js";
import { formatOMR } from "../../utils/formatOMR.js";
import { getRegionName } from "../../utils/regionsOM.js";
import {
  addToFavorites,
  removeFromFavorites,
  isInFavorites,
} from "../../utils/storage.js";
import Button from "../common/Button.jsx";
import Badge from "../common/Badge.jsx";

const AdCard = memo(({ ad, className = "", onFavoriteChange }) => {
  const { t, language } = useI18n();
  const { trackClick } = useAnalytics(ad.id);
  const isRTL = language === "ar";
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isInFavorites(ad.id));
  }, [ad.id]);

  const formatPostedDate = (date) => {
    const now = new Date();
    const postedDate = new Date(date);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return t("ads.today");
    } else if (diffDays === 2) {
      return t("ads.yesterday");
    } else if (diffDays <= 7) {
      return t("ads.daysAgo", { days: diffDays - 1 });
    } else {
      return postedDate.toLocaleDateString(
        language === "ar" ? "ar-OM" : "en-OM"
      );
    }
  };

  const handlePhoneClick = () => {
    trackClick("phone");
    window.open(`tel:${ad.phone}`, "_self");
  };

  const handleWhatsAppClick = () => {
    trackClick("whatsapp");
    const message = encodeURIComponent(
      language === "ar"
        ? `مرحباً، أنا مهتم بإعلانك: ${ad.title[language]}`
        : `Hi, I'm interested in your ad: ${ad.title[language]}`
    );
    window.open(
      `https://wa.me/${ad.phone.replace(/\D/g, "")}?text=${message}`,
      "_blank"
    );
  };

  const handleShareClick = async () => {
    trackClick("share");
    const url = `${window.location.origin}/ad/${ad.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: ad.title[language],
          text: ad.description[language].substring(0, 100),
          url: url,
        });
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        // You could show a toast here
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      // You could show a toast here
    }
  };

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(ad.id);
      setIsFavorite(false);
    } else {
      addToFavorites(ad);
      setIsFavorite(true);
    }

    // Notify parent component if callback provided
    if (onFavoriteChange) {
      onFavoriteChange(ad.id, !isFavorite);
    }
  };

  return (
    <motion.div
      id={`ad-${ad.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`card overflow-hidden ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={ad.images[0]}
          alt={ad.title[language]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Favorites Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFavoriteClick}
          className={`absolute top-2 ${
            isRTL ? "right-2" : "left-2"
          } bg-white/90 hover:bg-white`}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "text-red-500 fill-current" : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          {ad.featured && (
            <Badge variant="sponsored">{t("ads.sponsored")}</Badge>
          )}
          {ad.delivery && (
            <Badge variant="success">
              {language === "ar" ? "توصيل" : "Delivery"}
            </Badge>
          )}
        </div>

        {/* Title */}
        <Link to={`/ad/${ad.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {ad.title[language]}
          </h3>
        </Link>

        {/* Price */}
        <div className="text-xl font-bold text-primary mb-2">
          {ad.price > 0
            ? formatOMR(ad.price)
            : language === "ar"
            ? "اتصل للسعر"
            : "Contact for price"}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {ad.description[language]}
        </p>

        {/* Location and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
            <span>{getRegionName(ad.location, language)}</span>
          </div>
          <div className="flex items-center">
            <Clock className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
            <span>{formatPostedDate(ad.postedAt)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className={`flex ${
            isRTL ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handlePhoneClick}
            className="flex-1"
            icon={Phone}
          >
            {t("ads.call")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWhatsAppClick}
            className="flex-1"
            icon={MessageCircle}
          >
            {t("ads.whatsapp")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShareClick}
            icon={Share2}
            className="px-2"
          />
        </div>
      </div>
    </motion.div>
  );
});

AdCard.displayName = "AdCard";

export default AdCard;
