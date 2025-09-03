import React, { useState, useEffect, useRef } from "react";
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
  Star,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAds } from "../hooks/useAds.js";
import { categories } from "../utils/mockData.js";
import AdCard from "../components/ads/AdCard.jsx";
import Button from "../components/common/Button.jsx";
import Container from "../components/layout/Container.jsx";
import LocationDropdown from "../components/forms/LocationDropdown.jsx";
import { usePageAnalytics } from "../hooks/useAnalytics.js";
import { useDeviceType } from "../hooks/useResponsive.js";

const Home = () => {
  const { t, language } = useI18n();
  const { getFeaturedAds, getRecentAds } = useAds();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const canvasRef = useRef(null);

  // Responsive hooks
  const deviceType = useDeviceType();

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 50;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

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
    const iconProps = {
      size: deviceType.includes("mobile") ? 18 : 20,
      color: "white",
    };
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
      <section className="bg-gradient-to-br from-primary via-blue-600 to-blue-800 text-white py-16 md:py-24 relative overflow-hidden">
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-600/20 to-blue-800/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <HomeIcon className="h-10 w-10 md:h-12 md:w-12 text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
              >
                {t("hero.title")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              >
                {t("hero.subtitle")}
              </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 max-w-4xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    10K+
                  </span>
                </div>
                <span className="text-sm text-blue-100 font-medium">
                  {language === "ar" ? "مستخدم نشط" : "Active Users"}
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-400" />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    50K+
                  </span>
                </div>
                <span className="text-sm text-blue-100 font-medium">
                  {language === "ar" ? "إعلان منشور" : "Ads Posted"}
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-400" />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    99%
                  </span>
                </div>
                <span className="text-sm text-blue-100 font-medium">
                  {language === "ar" ? "رضا العملاء" : "Satisfaction"}
                </span>
              </motion.div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2 shadow-2xl"
              >
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col md:flex-row gap-3"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex-1 relative"
                  >
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder={t("hero.searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200 bg-white/95 backdrop-blur-sm"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <LocationDropdown
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      placeholder={t("hero.locationPlaceholder")}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      {t("hero.searchButton")}
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t("categories.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === "ar"
                ? "اكتشف آلاف الإعلانات في مختلف الفئات"
                : "Discover thousands of ads across different categories"}
            </p>
          </motion.div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="bg-white rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 ${category.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    {getIconComponent(category.icon)}
                  </motion.div>

                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-center group-hover:text-primary transition-colors duration-200">
                    {category.name[language]}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Ads Section */}
      {getFeaturedAds().length > 0 && (
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-secondary via-orange-400 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Star className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                </div>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-primary via-secondary to-blue-600 bg-clip-text text-transparent">
                {t("ads.featured")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                {language === "ar"
                  ? "اكتشف أفضل الإعلانات المميزة والموثوقة من بائعين معتمدين"
                  : "Discover the best featured and trusted advertisements from verified sellers"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getFeaturedAds()
                .slice(0, 4)
                .map((ad, index) => (
                  <motion.div
                    key={ad.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-secondary to-orange-500 rounded-full flex items-center justify-center shadow-lg z-10">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <AdCard ad={ad} />
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button
                  onClick={() => navigate("/listings")}
                  className="group bg-gradient-to-r from-primary via-blue-600 to-blue-700 hover:from-primary-600 hover:via-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
                >
                  <span className="flex items-center gap-3">
                    {t("ads.viewAll")}
                    <motion.div
                      animate={{
                        x: language === "ar" ? [-5, 0, -5] : [0, 5, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {language === "ar" ? "←" : "→"}
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Ads Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-primary-50 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 via-primary to-blue-700 bg-clip-text text-transparent">
              {t("ads.recent")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === "ar"
                ? "اكتشف أحدث الإعلانات المضافة حديثاً مع أفضل العروض"
                : "Discover the latest ads with the best offers and deals"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {getRecentAds()
              .slice(0, 4)
              .map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg z-10">
                      <span className="text-white text-xs font-bold">NEW</span>
                    </div>
                    <AdCard ad={ad} />
                  </div>
                </motion.div>
              ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                onClick={() => navigate("/listings")}
                className="group bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                <span className="flex items-center gap-3">
                  {t("ads.viewAll")}
                  <motion.div
                    animate={{ x: language === "ar" ? [-5, 0, -5] : [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {language === "ar" ? "←" : "→"}
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
