import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Home as HomeIcon,
  Car,
  Smartphone,
  Briefcase,
  Wrench,
  Heart,
  MoreHorizontal,
  Shirt,
  Sofa,
  BookOpen,
  Dumbbell,
  Sparkles,
  Utensils,
  HeartPulse,
  GraduationCap,
  Gamepad2,
  Hammer,
  TreePine,
  Music,
  Palette,
  Baby,
  Printer,
} from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAds } from "../hooks/useAds.js";
import { categories } from "../utils/mockData.js";
import { omanRegions } from "../utils/regionsOM.js";
import AdCard from "../components/ads/AdCard.jsx";
import Button from "../components/common/Button.jsx";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const Home = () => {
  const { t, language } = useI18n();
  const { getFeaturedAds, getRecentAds } = useAds();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  usePageAnalytics("Home");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (selectedLocation) params.append("location", selectedLocation);

    navigate(`/listings?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/listings?category=${categoryId}`);
  };

  const getIconComponent = (iconName) => {
    const iconProps = { size: 24, color: "white" };
    switch (iconName) {
      case "Car":
        return <Car {...iconProps} />;
      case "Home":
        return <HomeIcon {...iconProps} />;
      case "Smartphone":
        return <Smartphone {...iconProps} />;
      case "Briefcase":
        return <Briefcase {...iconProps} />;
      case "Wrench":
        return <Wrench {...iconProps} />;
      case "Heart":
        return <Heart {...iconProps} />;
      case "Shirt":
        return <Shirt {...iconProps} />;
      case "Sofa":
        return <Sofa {...iconProps} />;
      case "BookOpen":
        return <BookOpen {...iconProps} />;
      case "Dumbbell":
        return <Dumbbell {...iconProps} />;
      case "Sparkles":
        return <Sparkles {...iconProps} />;
      case "Utensils":
        return <Utensils {...iconProps} />;
      case "HeartPulse":
        return <HeartPulse {...iconProps} />;
      case "GraduationCap":
        return <GraduationCap {...iconProps} />;
      case "Gamepad2":
        return <Gamepad2 {...iconProps} />;
      case "Hammer":
        return <Hammer {...iconProps} />;
      case "TreePine":
        return <TreePine {...iconProps} />;
      case "Music":
        return <Music {...iconProps} />;
      case "Palette":
        return <Palette {...iconProps} />;
      case "Baby":
        return <Baby {...iconProps} />;
      case "Printer":
        return <Printer {...iconProps} />;
      case "MoreHorizontal":
        return <MoreHorizontal {...iconProps} />;
      default:
        return <MoreHorizontal {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <HomeIcon className="h-12 w-12 md:h-16 md:w-16 text-white" />
              <h1 className="text-4xl md:text-6xl font-bold">
                {t("hero.title")}
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-12 text-primary-100"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSearch}
              className="max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg p-2 shadow-lg">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder={t("hero.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-10 pr-8 py-3 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-w-[200px]"
                  >
                    <option value="">{t("hero.locationPlaceholder")}</option>
                    {omanRegions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name[language]}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="px-8">
                  {t("hero.searchButton")}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("categories.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {getIconComponent(category.icon)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name[language]}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.count.toLocaleString()}{" "}
                  {language === "ar" ? "إعلان" : "ads"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ads Section */}
      {getFeaturedAds().length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                {t("ads.featured")}
              </h2>
              <Button variant="outline" onClick={() => navigate("/listings")}>
                {t("ads.viewAll")}
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFeaturedAds()
                .slice(0, 4)
                .map((ad, index) => (
                  <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AdCard ad={ad} />
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Ads Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {t("ads.recent")}
            </h2>
            <Button variant="outline" onClick={() => navigate("/listings")}>
              {t("ads.viewAll")}
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getRecentAds()
              .slice(0, 8)
              .map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AdCard ad={ad} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              {language === "ar"
                ? "جاهز لنشر إعلانك؟"
                : "Ready to post your ad?"}
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              {language === "ar"
                ? "انضم إلى آلاف المستخدمين الذين يبيعون ويشترون يومياً"
                : "Join thousands of users buying and selling daily"}
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/create")}
            >
              {t("nav.postAd")}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
