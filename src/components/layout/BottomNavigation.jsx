import React from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Home, Grid3X3, Plus, Megaphone, User } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { useDeviceType } from "../../hooks/useResponsive.js";

const BottomNavigation = () => {
  const { language } = useI18n();
  const location = useLocation();
  const deviceType = useDeviceType();

  // Only show on mobile devices
  if (!deviceType.includes("mobile")) {
    return null;
  }

  // Responsive sizing based on device type
  const getIconSize = () => {
    if (deviceType.includes("mobile-portrait")) return 18;
    if (deviceType.includes("mobile-landscape")) return 16;
    return 20;
  };

  const getTextSize = () => {
    if (deviceType.includes("mobile-portrait")) return "text-xs";
    if (deviceType.includes("mobile-landscape")) return "text-xs";
    return "text-sm";
  };

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: language === "ar" ? "الرئيسية" : "Home",
      key: "home",
      color: "bg-blue-500",
    },
    {
      path: "/categories",
      icon: Grid3X3,
      label: language === "ar" ? "الأقسام" : "Categories",
      key: "categories",
      color: "bg-green-500",
    },
    {
      path: "/create-ad",
      icon: Plus,
      label: language === "ar" ? "انشر إعلان" : "Post Ad",
      key: "create",
      color: "bg-primary",
    },
    {
      path: "/listings",
      icon: Megaphone,
      label: language === "ar" ? "الإعلانات" : "Listings",
      key: "listings",
      color: "bg-purple-500",
    },
    {
      path: "/profile",
      icon: User,
      label: language === "ar" ? "حسابي" : "My Account",
      key: "profile",
      color: "bg-orange-500",
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    if (path === "/create-ad") {
      return location.pathname === "/create-ad";
    }
    if (path === "/listings") {
      return location.pathname === "/listings";
    }
    return location.pathname.startsWith(path);
  };

  // Animation variants
  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <motion.div key={item.key} variants={itemVariants} custom={index}>
              <Link
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  active
                    ? "text-primary bg-gradient-to-b from-primary-50 to-primary-100"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {/* Background animation for active state */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 ${item.color} opacity-10 rounded-xl`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    size={getIconSize()}
                    className={`transition-all duration-300 ${
                      active
                        ? "text-primary drop-shadow-sm"
                        : "text-gray-500 group-hover:text-gray-700"
                    }`}
                  />

                  {/* Active indicator */}
                </motion.div>

                <motion.span
                  className={`${getTextSize()} mt-1 font-medium transition-all duration-300 ${
                    active
                      ? "text-primary font-semibold"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {item.label}
                </motion.span>

                {/* Ripple effect on tap */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-xl opacity-0"
                  whileTap={{
                    scale: 1.2,
                    opacity: [0, 0.3, 0],
                    transition: { duration: 0.3 },
                  }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
