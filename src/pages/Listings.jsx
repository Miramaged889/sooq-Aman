import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, List, X } from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAds } from "../hooks/useAds.js";
import Container from "../components/layout/Container.jsx";
import SearchBar from "../components/search/SearchBar.jsx";
import Filters from "../components/search/Filters.jsx";
import AdGrid from "../components/ads/AdGrid.jsx";
import Button from "../components/common/Button.jsx";
import { usePageAnalytics } from "../hooks/useAnalytics.js";


const Listings = () => {
  const { t } = useI18n();
  const { filters, updateFilters, clearFilters, getFilteredAds } = useAds();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  usePageAnalytics("Listings");

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const priceMin = searchParams.get("priceMin") || "";
    const priceMax = searchParams.get("priceMax") || "";
    const sortBy = searchParams.get("sortBy") || "newest";

    updateFilters({ category, location, priceMin, priceMax, sortBy });
  }, [searchParams, updateFilters]);

  const handleSearch = ({ query, location }) => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (location) params.append("location", location);
    if (filters.category) params.append("category", filters.category);
    if (filters.priceMin) params.append("priceMin", filters.priceMin);
    if (filters.priceMax) params.append("priceMax", filters.priceMax);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);

    setSearchParams(params);
    updateFilters({ location });
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    updateFilters(updatedFilters);

    // Update URL params
    const params = new URLSearchParams();
    if (updatedFilters.category)
      params.append("category", updatedFilters.category);
    if (updatedFilters.location)
      params.append("location", updatedFilters.location);
    if (updatedFilters.priceMin)
      params.append("priceMin", updatedFilters.priceMin);
    if (updatedFilters.priceMax)
      params.append("priceMax", updatedFilters.priceMax);
    if (updatedFilters.sortBy) params.append("sortBy", updatedFilters.sortBy);

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  // Memoize filtered ads to prevent unnecessary re-renders
  const filteredAds = useMemo(() => {
    const ads = getFilteredAds();
    return ads;
  }, [getFilteredAds]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Container className="py-8">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 bg-primary rounded-lg"
            >
              <List className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t("listings.title")}
              </h1>
              <p className="text-gray-600 mt-1">
                {t("listings.subtitle", { count: filteredAds.length })}
              </p>
            </div>
          </div>

          <motion.div variants={itemVariants} className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div variants={sidebarVariants} className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? t("filters.hide") : t("filters.show")}
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              </Button>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:block lg:!h-auto lg:!opacity-100"
                >
                  <div className="bg-white rounded-lg shadow-sm border p-6 mb-4 lg:mb-0 lg:sticky lg:top-24">
                    <Filters
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Section */}
          <motion.div variants={itemVariants} className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 font-medium">
                    {t("listings.results", { count: filteredAds.length })}
                  </p>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.category ||
                filters.location ||
                filters.priceMin ||
                filters.priceMax) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm text-gray-500">
                    {t("filters.active")}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                        {filters.category}
                      </span>
                    )}
                    {filters.location && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">
                        {filters.location}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Ads Grid */}
            <motion.div variants={itemVariants} className="mb-8">
              <AdGrid ads={filteredAds} className="min-h-[400px]" />
            </motion.div>

            {/* Empty State */}
            {filteredAds.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("listings.noResults")}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t("listings.noResultsDescription")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    {t("filters.clear")}
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Listings;
