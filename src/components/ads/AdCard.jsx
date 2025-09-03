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

  // const handleShareClick = async () => {
  //   trackClick("share");
  //   const url = `${window.location.origin}/ad/${ad.id}`;

  //   if (navigator.share) {
  //     try {
  //       await navigator.share({
  //         title: ad.title[language],
  //         text: ad.description[language].substring(0, 100),
  //         url: url,
  //       });
  //     } catch {
  //       // Fallback to clipboard
  //       navigator.clipboard.writeText(url);
  //       // You could show a toast here
  //     }
  //   } else {
  //     // Fallback to clipboard
  //     navigator.clipboard.writeText(url);
  //     // You could show a toast here
  //   }
  // };

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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className={`card overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <motion.img
          src={ad.images[0]}
          alt={ad.title[language]}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Favorites Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={`absolute top-2 ${
              isRTL ? "right-2" : "left-2"
            } bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200`}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "text-red-500 fill-current" : "text-gray-600"
                }`}
              />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Badges */}
        <motion.div
          className="flex gap-2 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {ad.featured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <Badge variant="sponsored">{t("ads.sponsored")}</Badge>
            </motion.div>
          )}
          {ad.delivery && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Badge variant="success">
                {language === "ar" ? "توصيل" : "Delivery"}
              </Badge>
            </motion.div>
          )}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to={`/ad/${ad.id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
              {ad.title[language]}
            </h3>
          </Link>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-bold text-primary mb-2"
        >
          {ad.price > 0
            ? formatOMR(ad.price)
            : language === "ar"
            ? "اتصل للسعر"
            : "Contact for price"}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 text-sm mb-3 line-clamp-2"
        >
          {ad.description[language]}
        </motion.p>

        {/* Location and Date */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between text-sm text-gray-500 mb-4"
        >
          <div className="flex items-center">
            <MapPin className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
            <span>{getRegionName(ad.location, language)}</span>
          </div>
          <div className="flex items-center">
            <Clock className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
            <span>{formatPostedDate(ad.postedAt)}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`flex ${
            isRTL ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              size="sm"
              onClick={handlePhoneClick}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Phone className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              <span>{t("ads.call")}</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
              className="w-full  bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <MessageCircle className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              <span>{t("ads.whatsapp")}</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

AdCard.displayName = "AdCard";

export default AdCard;
