import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Heart,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAuth } from "../hooks/useAuth.js";
import { useAds } from "../hooks/useAds.js";
import Container from "../components/layout/Container.jsx";
import Button from "../components/common/Button.jsx";
import Badge from "../components/common/Badge.jsx";
import AdCard from "../components/ads/AdCard.jsx";
import { formatOMR } from "../utils/formatOMR.js";
import { getFavorites } from "../utils/storage.js";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const Profile = () => {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const { user, logout } = useAuth();
  const { userAds, deleteAd, canUserCreateAd, getRemainingAdsForUser } =
    useAds();
  const [activeTab, setActiveTab] = useState("profile");
  const [favorites, setFavorites] = useState([]);

  usePageAnalytics("Profile");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Load favorites from storage
    const userFavorites = getFavorites();
    setFavorites(userFavorites);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAd = (adId) => {
    if (window.confirm(t("profile.confirmDelete"))) {
      deleteAd(adId);
    }
  };

  const handleEditAd = (adId) => {
    navigate(`/create-ad?edit=${adId}`);
  };

  const handleCreateAd = () => {
    if (!canUserCreateAd()) {
      alert(t("profile.weeklyLimitReached"));
      return;
    }
    navigate("/create");
  };

  const handleFavoriteChange = (adId, isAdded) => {
    // Update favorites list when an ad is added/removed from favorites
    if (isAdded) {
      const ad = userAds.find((a) => a.id === adId);
      if (ad) {
        setFavorites((prev) => [...prev, ad]);
      }
    } else {
      setFavorites((prev) => prev.filter((fav) => fav.id !== adId));
    }
  };

  const tabs = [
    { id: "profile", label: t("profile.tabs.profile"), icon: User },
    { id: "ads", label: t("profile.tabs.myAds"), icon: Eye },
    { id: "favorites", label: t("profile.tabs.favorites"), icon: Heart },
  ];

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      initial="hidden"
      animate="visible"
      variants={animationVariants}
    >
      <Container className="py-8">
        {/* Header */}
        <motion.div variants={animationVariants} className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 bg-primary rounded-xl"
            >
              <User className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("profile.title")}
              </h1>
              <p className="text-gray-600 mt-1">{t("profile.subtitle")}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div variants={animationVariants} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user.name?.charAt(0) || "U"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {user.name || t("profile.anonymous")}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>

              {/* Weekly Ad Limit Info */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-blue-600 font-medium">
                    {language === "ar"
                      ? "الإعلانات المتبقية هذا الأسبوع"
                      : "Remaining Ads This Week"}
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {getRemainingAdsForUser()}/3
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  {t("profile.logout")}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={animationVariants} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Profile Information */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {t("profile.personalInfo")}
                      </h2>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        {t("profile.edit")}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("profile.name")}
                            </p>
                            <p className="font-medium">
                              {user.name || t("profile.notProvided")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("profile.email")}
                            </p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("profile.phone")}
                            </p>
                            <p className="font-medium">
                              {user.phone || t("profile.notProvided")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("profile.location")}
                            </p>
                            <p className="font-medium">
                              {user.location || t("profile.notProvided")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {userAds.length}
                      </h3>
                      <p className="text-gray-600">{t("profile.totalAds")}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {favorites.length}
                      </h3>
                      <p className="text-gray-600">{t("profile.favorites")}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        4.8
                      </h3>
                      <p className="text-gray-600">{t("profile.rating")}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "ads" && (
                <motion.div
                  key="ads"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {t("profile.myAds")} ({userAds.length})
                    </h2>
                    <Button
                      onClick={handleCreateAd}
                      className="flex items-center gap-2"
                      disabled={!canUserCreateAd()}
                    >
                      <Plus className="h-4 w-4" />
                      {t("profile.createAd")}
                    </Button>
                  </div>

                  {userAds.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t("profile.noAds")}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {t("profile.noAdsDescription")}
                      </p>
                      <Button
                        onClick={handleCreateAd}
                        disabled={!canUserCreateAd()}
                      >
                        {t("profile.createFirstAd")}
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userAds.map((ad) => (
                        <div
                          key={ad.id}
                          className="bg-white rounded-xl shadow-sm border overflow-hidden"
                        >
                          <div className="relative">
                            <img
                              src={ad.images?.[0] || ad.image}
                              alt={ad.title[language]}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditAd(ad.id)}
                                className="bg-white/90 hover:bg-white"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteAd(ad.id)}
                                className="bg-white/90 hover:bg-white text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            {ad.featured && (
                              <Badge
                                variant="featured"
                                className="absolute top-2 left-2"
                              />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                              {ad.title[language]}
                            </h3>
                            <p className="text-lg font-bold text-primary mb-2">
                              {formatOMR(ad.price)}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>{ad.location}</span>
                              <span>
                                {new Date(ad.postedAt).toLocaleDateString(
                                  language === "ar" ? "ar-OM" : "en-US"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "favorites" && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("profile.favorites")} ({favorites.length})
                  </h2>

                  {favorites.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t("profile.noFavorites")}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {t("profile.noFavoritesDescription")}
                      </p>
                      <Button onClick={() => navigate("/listings")}>
                        {t("profile.browseAds")}
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favorites.map((ad) => (
                        <AdCard
                          key={ad.id}
                          ad={ad}
                          onFavoriteChange={handleFavoriteChange}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Profile;
