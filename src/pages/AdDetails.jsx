import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  MapPin,
  Calendar,
  Eye,
  Star,
} from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAds } from "../hooks/useAds.js";
import Container from "../components/layout/Container.jsx";
import Button from "../components/common/Button.jsx";
import Badge from "../components/common/Badge.jsx";
import AdMediaViewer from "../components/ads/AdMediaViewer.jsx";
import { formatOMR } from "../utils/formatOMR.js";
import {
  addToFavorites,
  removeFromFavorites,
  isInFavorites,
} from "../utils/storage.js";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const { getAdById, viewAd, clickAd } = useAds();
  const [ad, setAd] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const viewCounted = useRef(false);

  usePageAnalytics("AdDetails");

  useEffect(() => {
    const foundAd = getAdById(id);
    if (foundAd) {
      setAd(foundAd);
      setIsFavorite(isInFavorites(id));

      // Only count view once per component mount
      if (!viewCounted.current) {
        viewAd(id);
        viewCounted.current = true;
      }
    } else {
      navigate("/listings");
    }
  }, [id, getAdById, viewAd, navigate]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowImageViewer(true);
  };

  const handleContactClick = (type) => {
    clickAd(id, type);
    // Mock contact action
    if (type === "call") {
      window.open(`tel:${ad?.phone}`);
    } else if (type === "whatsapp") {
      window.open(`https://wa.me/${ad?.phone?.replace(/\s/g, "")}`);
    }
  };

  const handleShare = () => {
    clickAd(id, "share");
    if (navigator.share) {
      navigator.share({
        title: ad?.title[language],
        text: ad?.description[language],
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(id);
      setIsFavorite(false);
    } else {
      addToFavorites(ad);
      setIsFavorite(true);
    }
  };

  if (!ad) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{t("adDetails.loading")}</p>
          <Button variant="outline" onClick={() => navigate("/listings")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("adDetails.backToListings")}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/listings")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("adDetails.backToListings")}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <img
                    src={ad.images[selectedImage]}
                    alt={ad.title[language]}
                    className="w-full h-96 object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageClick(selectedImage)}
                  />
                </div>
                {ad.images.length > 1 && (
                  <div className="md:col-span-2 grid grid-cols-4 gap-2">
                    {ad.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${ad.title[language]} ${index + 1}`}
                        className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                          selectedImage === index
                            ? "opacity-100 ring-2 ring-primary"
                            : "opacity-60 hover:opacity-80"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ad Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {ad.title[language]}
                  </h1>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {formatOMR(ad.price)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleFavoriteToggle}
                  className={`p-2 rounded-full ${
                    isFavorite
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`}
                  />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{ad.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {new Date(ad.postedAt).toLocaleDateString(
                      language === "ar" ? "ar-OM" : "en-US"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="h-5 w-5" />
                  <span>
                    {ad.views || 0} {t("adDetails.views")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="h-5 w-5" />
                  <span>4.8 (24 {t("adDetails.reviews")})</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {t("adDetails.description")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {ad.description[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Actions */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("adDetails.contactSeller")}
                </h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => handleContactClick("call")}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    {t("adDetails.call")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleContactClick("whatsapp")}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("adDetails.whatsapp")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    {t("adDetails.share")}
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t("adDetails.features")}
                </h3>
                <div className="space-y-2">
                  {ad.featured && (
                    <Badge variant="featured" className="w-full justify-center">
                      {t("ads.featured")}
                    </Badge>
                  )}
                  {ad.delivery && (
                    <Badge variant="success" className="w-full justify-center">
                      {language === "ar" ? "توصيل" : "Delivery"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Image Viewer */}
      <AnimatePresence>
        {showImageViewer && (
          <AdMediaViewer
            images={ad.images}
            initialIndex={selectedImage}
            onClose={() => setShowImageViewer(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdDetails;
