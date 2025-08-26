/**
 * Storage utility functions for localStorage and analytics
 */

const STORAGE_KEYS = {
  LANGUAGE: "sooq_language",
  USER_ADS: "sooq_user_ads",
  ANALYTICS: "sooq_analytics",
  AUTH_USER: "sooq_auth_user",
  FAVORITES: "sooq_favorites",
  WEEKLY_AD_COUNT: "sooq_weekly_ad_count",
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Stored value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

/**
 * Get current language
 * @returns {string} Language code ('ar' or 'en')
 */
export const getLanguage = () => {
  return getStorageItem(STORAGE_KEYS.LANGUAGE, "ar");
};

/**
 * Set language
 * @param {string} language - Language code ('ar' or 'en')
 */
export const setLanguage = (language) => {
  setStorageItem(STORAGE_KEYS.LANGUAGE, language);
};

/**
 * Get user ads
 * @returns {Array} User's ads
 */
export const getUserAds = () => {
  return getStorageItem(STORAGE_KEYS.USER_ADS, []);
};

/**
 * Set user ads
 * @param {Array} ads - User's ads
 */
export const setUserAds = (ads) => {
  setStorageItem(STORAGE_KEYS.USER_ADS, ads);
};

/**
 * Add user ad
 * @param {Object} ad - Ad to add
 */
export const addUserAd = (ad) => {
  const userAds = getUserAds();
  userAds.push(ad);
  setUserAds(userAds);
};

/**
 * Update user ad
 * @param {string} adId - Ad ID to update
 * @param {Object} updatedAd - Updated ad object
 */
export const updateUserAd = (adId, updatedAd) => {
  const userAds = getUserAds();
  const index = userAds.findIndex((ad) => ad.id === adId);
  if (index !== -1) {
    userAds[index] = { ...userAds[index], ...updatedAd };
    setUserAds(userAds);
  }
};

/**
 * Delete user ad
 * @param {string} adId - Ad ID to delete
 */
export const deleteUserAd = (adId) => {
  const userAds = getUserAds();
  const filteredAds = userAds.filter((ad) => ad.id !== adId);
  setUserAds(filteredAds);
};

/**
 * Get analytics data
 * @returns {Object} Analytics data
 */
export const getAnalytics = () => {
  return getStorageItem(STORAGE_KEYS.ANALYTICS, {
    adViews: {},
    adClicks: {},
    totalViews: 0,
    totalClicks: 0,
  });
};

/**
 * Set analytics data
 * @param {Object} analytics - Analytics data
 */
export const setAnalytics = (analytics) => {
  setStorageItem(STORAGE_KEYS.ANALYTICS, analytics);
};

/**
 * Track ad view
 * @param {string} adId - Ad ID
 */
export const trackAdView = (adId) => {
  const analytics = getAnalytics();

  if (!analytics.adViews[adId]) {
    analytics.adViews[adId] = 0;
  }

  analytics.adViews[adId]++;
  analytics.totalViews++;

  setAnalytics(analytics);
};

/**
 * Track ad click
 * @param {string} adId - Ad ID
 * @param {string} type - Click type ('phone', 'whatsapp', 'share')
 */
export const trackAdClick = (adId, type) => {
  const analytics = getAnalytics();

  if (!analytics.adClicks[adId]) {
    analytics.adClicks[adId] = {
      phone: 0,
      whatsapp: 0,
      share: 0,
    };
  }

  analytics.adClicks[adId][type]++;
  analytics.totalClicks++;

  setAnalytics(analytics);
};

/**
 * Get auth user
 * @returns {Object|null} Authenticated user
 */
export const getAuthUser = () => {
  return getStorageItem(STORAGE_KEYS.AUTH_USER, null);
};

/**
 * Set auth user
 * @param {Object} user - User object
 */
export const setAuthUser = (user) => {
  setStorageItem(STORAGE_KEYS.AUTH_USER, user);
};

/**
 * Clear auth user
 */
export const clearAuthUser = () => {
  removeStorageItem(STORAGE_KEYS.AUTH_USER);
};

/**
 * Check if user has reached ad limit
 * @returns {boolean} True if limit reached
 */
export const hasReachedAdLimit = () => {
  const ads = getUserAds();
  const activeAds = ads.filter((ad) => ad.status === "active");
  return activeAds.length >= 3;
};

/**
 * Get user's active ads count
 * @returns {number} Number of active ads
 */
export const getActiveAdsCount = () => {
  const ads = getUserAds();
  return ads.filter((ad) => ad.status === "active").length;
};

/**
 * Get user favorites
 * @returns {Array} User's favorite ads
 */
export const getFavorites = () => {
  return getStorageItem(STORAGE_KEYS.FAVORITES, []);
};

/**
 * Set user favorites
 * @param {Array} favorites - User's favorite ads
 */
export const setFavorites = (favorites) => {
  setStorageItem(STORAGE_KEYS.FAVORITES, favorites);
};

/**
 * Add ad to favorites
 * @param {Object} ad - Ad to add to favorites
 */
export const addToFavorites = (ad) => {
  const favorites = getFavorites();
  const existingIndex = favorites.findIndex((fav) => fav.id === ad.id);

  if (existingIndex === -1) {
    favorites.push(ad);
    setFavorites(favorites);
  }
};

/**
 * Remove ad from favorites
 * @param {string} adId - Ad ID to remove from favorites
 */
export const removeFromFavorites = (adId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.id !== adId);
  setFavorites(updatedFavorites);
};

/**
 * Check if ad is in favorites
 * @param {string} adId - Ad ID to check
 * @returns {boolean} True if ad is in favorites
 */
export const isInFavorites = (adId) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === adId);
};

// Weekly Ad Limit Management
export const getWeeklyAdCount = (userId) => {
  const weeklyData = getStorageItem(STORAGE_KEYS.WEEKLY_AD_COUNT, {});
  const userData = weeklyData[userId] || { count: 0, weekStart: null };

  // Check if it's a new week
  const now = new Date();
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay()
  );
  const weekStartString = weekStart.toISOString().split("T")[0];

  if (userData.weekStart !== weekStartString) {
    // Reset for new week
    return { count: 0, weekStart: weekStartString };
  }

  return userData;
};

export const incrementWeeklyAdCount = (userId) => {
  const weeklyData = getStorageItem(STORAGE_KEYS.WEEKLY_AD_COUNT, {});
  const userData = getWeeklyAdCount(userId);

  userData.count += 1;
  weeklyData[userId] = userData;
  setStorageItem(STORAGE_KEYS.WEEKLY_AD_COUNT, weeklyData);

  return userData.count;
};

export const canCreateAd = (userId) => {
  const userData = getWeeklyAdCount(userId);
  return userData.count < 3;
};

export const getRemainingAds = (userId) => {
  const userData = getWeeklyAdCount(userId);
  return Math.max(0, 3 - userData.count);
};
