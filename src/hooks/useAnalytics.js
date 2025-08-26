import { useEffect, useRef, useCallback, useMemo } from "react";
import { trackAdView, trackAdClick, getAnalytics } from "../utils/storage.js";

/**
 * Hook for tracking ad analytics with intersection observer
 * @param {string} adId - The ID of the ad to track
 * @returns {Object} Analytics tracking functions
 */
export const useAnalytics = (adId) => {
  const hasTrackedView = useRef(false);

  // Track view when ad comes into viewport
  useEffect(() => {
    if (!adId || hasTrackedView.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackAdView(adId);
            hasTrackedView.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`ad-${adId}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [adId]);

  // Track click events with memoization
  const trackClick = useCallback(
    (type) => {
      if (adId) {
        trackAdClick(adId, type);
      }
    },
    [adId]
  );

  // Get analytics data with memoization
  const getAnalyticsData = useCallback(() => {
    return getAnalytics();
  }, []);

  return useMemo(
    () => ({
      trackClick,
      getAnalyticsData,
    }),
    [trackClick, getAnalyticsData]
  );
};

/**
 * Hook for tracking page views
 * @param {string} pageName - The name of the page being tracked
 */
export const usePageAnalytics = (pageName) => {
  useEffect(() => {
    if (!pageName) return;

    // Track page view

    // In a real app, you would send this to your analytics service
    // Example: analytics.track('page_view', { page: pageName });
  }, [pageName]);
};

/**
 * Hook for tracking user actions
 * @returns {Object} Action tracking functions
 */
export const useActionAnalytics = () => {
  const trackAction = useCallback((action, properties = {}) => {
    if (!action) return;

    console.log(`Action tracked: ${action}`, properties);

    // In a real app, you would send this to your analytics service
    // Example: analytics.track(action, properties);
  }, []);

  return useMemo(() => ({ trackAction }), [trackAction]);
};
