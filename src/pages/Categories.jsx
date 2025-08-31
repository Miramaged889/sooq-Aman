import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Grid3X3,
  Plus,
  Car,
  Home,
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
import { categories } from "../utils/mockData.js";
import { usePageAnalytics } from "../hooks/useAnalytics.js";
import { useResponsiveColumns, useDeviceType } from "../hooks/useResponsive.js";

const Categories = () => {
  const { t, language } = useI18n();
  const navigate = useNavigate();

  // Responsive hooks for dynamic layout
  const deviceType = useDeviceType();
  const columns = useResponsiveColumns({
    minItemWidth: 250,
    gap: 24,
    maxCols: 4,
    containerPadding: 64,
  });

  usePageAnalytics("Categories");

  const handleCategoryClick = (categoryId) => {
    navigate(`/listings?category=${categoryId}`);
  };

  const getIconComponent = (iconName) => {
    const iconProps = { size: 32, color: "white" };
    switch (iconName) {
      case "Car":
        return <Car {...iconProps} />;
      case "Home":
        return <Home {...iconProps} />;
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid3X3 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">
              {t("categories.title")}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "اختر الفئة التي تبحث عنها أو انشر إعلانك في الفئة المناسبة"
              : "Choose the category you're looking for or post your ad in the right category"}
          </p>
        </motion.div>

        {/* Categories Grid - Dynamic responsive layout */}
        <div
          className="transition-all duration-300 ease-in-out gap-6"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: deviceType.includes("mobile") ? "16px" : "24px",
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-white rounded-xl text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 ${
                deviceType.includes("mobile") ? "p-4" : "p-6 md:p-8"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div
                className={`${
                  deviceType.includes("mobile")
                    ? "w-16 h-16 mb-4"
                    : "w-20 h-20 mb-6"
                } ${
                  category.color
                } rounded-full flex items-center justify-center mx-auto`}
              >
                {getIconComponent(category.icon)}
              </div>

              <h3
                className={`font-bold text-gray-900 mb-3 ${
                  deviceType.includes("mobile")
                    ? "text-lg"
                    : "text-xl md:text-2xl"
                }`}
              >
                {category.name[language]}
              </h3>

              <p
                className={`text-gray-600 ${
                  deviceType.includes("mobile") ? "text-sm mb-3" : "mb-4"
                }`}
              >
                {category.count.toLocaleString()}{" "}
                {language === "ar" ? "إعلان" : "ads"}
              </p>

              <div
                className={`text-primary font-semibold ${
                  deviceType.includes("mobile") ? "text-sm" : ""
                }`}
              >
                {language === "ar" ? "تصفح الإعلانات" : "Browse Ads"} →
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === "ar"
                ? "لا تجد الفئة المناسبة؟"
                : "Can't find the right category?"}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === "ar"
                ? "يمكنك نشر إعلانك في فئة أخرى أو التواصل معنا للمساعدة"
                : "You can post your ad in the Others category or contact us for help"}
            </p>
            <button
              onClick={() => navigate("/create")}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              {t("nav.postAd")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
