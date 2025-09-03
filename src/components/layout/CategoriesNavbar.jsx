import React from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Car,
  Home as HomeIcon,
  Smartphone,
  Briefcase,
  Wrench,
  Heart,
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
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { categories } from "../../utils/mockData.js";

const CategoriesNavbar = () => {
  const { language } = useI18n();
  const location = useLocation();

  const getIconComponent = (iconName) => {
    const iconProps = { size: 16, className: "text-current" };
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
      default:
        return <HomeIcon {...iconProps} />;
    }
  };

  return (
    <div className={`relative bg-white border-b border-gray-200 shadow-sm top-0 left-0 right-0 z-50 ${language === "ar" ? "rtl" : "ltr"}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between py-2">
          {/* All Categories - Scrollable */}
          <div className={`flex-1 ${language === "ar" ? "ml-4" : "mr-4"} overflow-hidden`}>
            <div className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"} overflow-x-auto pb-2 -mb-2 scroll-smooth custom-scrollbar`}>
              {categories.map((category, index) => {
                const isActive = location.search.includes(category.id);
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group flex-shrink-0"
                  >
                    <Link
                      to={`/listings?category=${category.id}`}
                      className={`relative flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"} px-3 py-2 rounded-full transition-all duration-200 border min-w-[90px] justify-center ${
                        isActive
                          ? "bg-primary text-white border-primary-600 shadow-md"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`p-1 rounded-full transition-all duration-200 ${
                          isActive ? "bg-white/20" : "bg-white"
                        }`}
                      >
                        {getIconComponent(category.icon)}
                      </div>

                      <span className="text-xs font-medium whitespace-nowrap">
                        {category.name[language]}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Commercial Ads Button */}
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Link
                to="/listings"
                className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"} bg-gradient-to-r from-primary to-blue-500 text-white px-3 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden group`}
              >
                <Megaphone size={14} className="relative z-10" />
                <span className="text-xs relative z-10">
                  {language === "ar" ? "الإعلانات التجارية" : "Commercial Ads"}
                </span>
                <TrendingUp size={12} className="relative z-10" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesNavbar;
