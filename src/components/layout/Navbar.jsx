import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Menu, X, Globe, User, LogOut } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { useAuth } from "../../hooks/useAuth.js";
import Button from "../common/Button.jsx";
import Badge from "../common/Badge.jsx";
import { getActiveAdsCount } from "../../utils/storage.js";

const Navbar = () => {
  const { t, language, changeLanguage } = useI18n();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const activeAdsCount = getActiveAdsCount();
  const isRTL = language === "ar";

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.categories"), href: "/categories" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLanguageToggle = () => {
    changeLanguage(language === "ar" ? "en" : "ar");
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <nav
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center ${
              isRTL ? "space-x-reverse space-x-2" : "space-x-2"
            }`}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {isRTL ? "س" : "S"}
              </span>
            </div>
            <span className="text-xl font-bold text-primary">
              {isRTL ? "سوق عمان" : "Souk Oman"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center ${
              isRTL ? "space-x-reverse space-x-8" : "space-x-8"
            }`}
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div
            className={`flex items-center ${
              isRTL ? "space-x-reverse space-x-4" : "space-x-4"
            }`}
          >
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="p-2 text-gray-600 hover:text-primary transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center p-2 text-gray-600 hover:text-primary transition-colors ${
                    isRTL ? "space-x-reverse space-x-2" : "space-x-2"
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:block text-sm font-medium">
                    {typeof user.name === "object"
                      ? user.name[language]
                      : user.name}
                  </span>
                  {activeAdsCount > 0 && (
                    <Badge variant="primary" size="sm">
                      {activeAdsCount}/3
                    </Badge>
                  )}
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t("nav.profile")}
                    </Link>
                    <Link
                      to="/create"
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      {t("nav.postAd")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <LogOut
                        className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`}
                      />
                      {t("common.logout")}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div
                className={`hidden sm:flex items-center ${
                  isRTL ? "space-x-reverse space-x-2" : "space-x-2"
                }`}
              >
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  } ${isRTL ? "text-right" : "text-left"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!user && (
                <div className="px-4 space-y-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      {t("nav.register")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
