import React, { useState, useEffect, useCallback } from "react";
import { mockAds } from "../utils/mockData.js";
import {
  getUserAds,
  addUserAd,
  updateUserAd,
  deleteUserAd,
  canCreateAd,
  incrementWeeklyAdCount,
  getRemainingAds,
} from "../utils/storage.js";
import { useAuth } from "../hooks/useAuth.js";
import { AdsContext } from "../context/AdsContext.jsx";

export const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [userAds, setUserAdsState] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    priceRange: "",
    date: "",
    priceMin: "",
    priceMax: "",
    sortBy: "newest",
  });
  const { user } = useAuth();

  // Load ads from mock data and local storage
  useEffect(() => {
    const storedUserAds = getUserAds();
    const allAds = [...mockAds, ...storedUserAds];
    setAds(allAds);
    setUserAdsState(storedUserAds);
  }, []);

  // Create new ad with weekly limit check
  const createAd = useCallback(
    (adData) => {
      if (!user) {
        throw new Error("User must be logged in to create an ad");
      }

      // Check weekly limit
      if (!canCreateAd(user.id)) {
        throw new Error(
          "Weekly ad limit reached. You can create 3 ads per week."
        );
      }

      const newAd = {
        id: Date.now().toString(),
        ...adData,
        userId: user.id,
        postedAt: new Date().toISOString(),
        views: 0,
        clicks: { phone: 0, whatsapp: 0, share: 0 },
        featured: false,
        delivery: false,
        images: adData.images || [],
        phone: adData.phone || "",
      };

      // Add to local storage
      addUserAd(newAd);

      // Increment weekly count
      incrementWeeklyAdCount(user.id);

      // Update state
      setAds((prev) => [...prev, newAd]);
      setUserAdsState((prev) => [...prev, newAd]);

      return newAd;
    },
    [user]
  );

  // Update ad
  const updateAd = useCallback((adId, updatedData) => {
    updateUserAd(adId, updatedData);

    setAds((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, ...updatedData } : ad))
    );
    setUserAdsState((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, ...updatedData } : ad))
    );
  }, []);

  // Delete ad
  const deleteAd = useCallback((adId) => {
    deleteUserAd(adId);

    setAds((prev) => prev.filter((ad) => ad.id !== adId));
    setUserAdsState((prev) => prev.filter((ad) => ad.id !== adId));
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      category: "",
      location: "",
      priceRange: "",
      date: "",
      priceMin: "",
      priceMax: "",
      sortBy: "newest",
    });
  }, []);

  // Track ad view
  const viewAd = useCallback((adId) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === adId ? { ...ad, views: (ad.views || 0) + 1 } : ad
      )
    );
    setUserAdsState((prev) =>
      prev.map((ad) =>
        ad.id === adId ? { ...ad, views: (ad.views || 0) + 1 } : ad
      )
    );
  }, []);

  // Track ad click
  const clickAd = useCallback((adId, action) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? {
              ...ad,
              clicks: {
                ...ad.clicks,
                [action]: (ad.clicks?.[action] || 0) + 1,
              },
            }
          : ad
      )
    );
    setUserAdsState((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? {
              ...ad,
              clicks: {
                ...ad.clicks,
                [action]: (ad.clicks?.[action] || 0) + 1,
              },
            }
          : ad
      )
    );
  }, []);

  // Get ad by ID
  const getAdById = useCallback(
    (id) => {
      return ads.find((ad) => ad.id === id);
    },
    [ads]
  );

  // Get featured ads
  const getFeaturedAds = useCallback(() => {
    return ads.filter((ad) => ad.featured);
  }, [ads]);

  // Get filtered ads
  const getFilteredAds = useCallback(() => {
    let filtered = [...ads];

    if (filters.category) {
      filtered = filtered.filter((ad) => ad.category === filters.category);
    }
    if (filters.location) {
      filtered = filtered.filter((ad) => ad.location === filters.location);
    }
    if (filters.priceMin) {
      filtered = filtered.filter(
        (ad) => ad.price >= parseFloat(filters.priceMin)
      );
    }
    if (filters.priceMax) {
      filtered = filtered.filter(
        (ad) => ad.price <= parseFloat(filters.priceMax)
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      filtered = filtered.filter((ad) => {
        const price = parseFloat(ad.price);
        return price >= min && (max ? price <= max : true);
      });
    }
    if (filters.date) {
      const today = new Date();
      const filterDate = new Date(filters.date);
      filtered = filtered.filter((ad) => {
        const adDate = new Date(ad.postedAt);
        return adDate >= filterDate && adDate <= today;
      });
    }

    // Sort by posted date (newest first) or other criteria
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        break;
    }

    return filtered;
  }, [ads, filters]);

  // Get recent ads
  const getRecentAds = useCallback(
    (limit = 6) => {
      const sortedAds = [...ads].sort(
        (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
      );
      return sortedAds.slice(0, limit);
    },
    [ads]
  );

  // Get ads by category
  const getAdsByCategory = useCallback(
    (category) => {
      return ads.filter((ad) => ad.category === category);
    },
    [ads]
  );

  // Get user's ads
  const getUserAdsList = useCallback(() => {
    if (!user) return [];
    return userAds.filter((ad) => ad.userId === user.id);
  }, [user, userAds]);

  // Check if user can create ad
  const canUserCreateAd = useCallback(() => {
    if (!user) return false;
    return canCreateAd(user.id);
  }, [user]);

  // Get remaining ads for user
  const getRemainingAdsForUser = useCallback(() => {
    if (!user) return 0;
    return getRemainingAds(user.id);
  }, [user]);

  const value = {
    ads,
    userAds: getUserAdsList(),
    filters,
    setFilters,
    updateFilters,
    clearFilters,
    createAd,
    updateAd,
    deleteAd,
    viewAd,
    clickAd,
    getAdById,
    getFilteredAds,
    getFeaturedAds,
    getRecentAds,
    getAdsByCategory,
    canUserCreateAd,
    getRemainingAdsForUser,
  };

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
};
