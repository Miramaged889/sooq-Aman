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

const Categories = () => {
  const { t, language } = useI18n();
  const navigate = useNavigate();

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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div
                className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                {getIconComponent(category.icon)}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {category.name[language]}
              </h3>

              <p className="text-gray-600 mb-4">
                {category.count.toLocaleString()}{" "}
                {language === "ar" ? "إعلان" : "ads"}
              </p>

              <div className="text-primary font-semibold">
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
