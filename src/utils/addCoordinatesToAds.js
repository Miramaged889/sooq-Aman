/**
 * Utility to add coordinates to ads based on their location
 */

// Location to coordinates mapping
const locationCoordinates = {
  muscat: [23.588, 58.3829],
  seeb: [23.6702, 58.1891],
  bawshar: [23.5557, 58.4008],
  sohar: [24.3641, 56.7466],
  nizwa: [22.9333, 57.5333],
  salalah: [17.0151, 54.0924],
  sur: [22.5667, 59.5289],
  ibri: [23.2254, 56.5158],
  saham: [24.1722, 56.8886],
  barka: [23.7028, 57.8894],
  rustaq: [23.3908, 57.4244],
};

/**
 * Add coordinates to an ad based on its location
 * @param {Object} ad - The ad object
 * @returns {Object} - The ad object with coordinates added
 */
export const addCoordinatesToAd = (ad) => {
  if (ad.location && locationCoordinates[ad.location]) {
    return {
      ...ad,
      coordinates: locationCoordinates[ad.location],
    };
  }
  return ad;
};

/**
 * Add coordinates to all ads in an array
 * @param {Array} ads - Array of ad objects
 * @returns {Array} - Array of ad objects with coordinates added
 */
export const addCoordinatesToAds = (ads) => {
  return ads.map(addCoordinatesToAd);
};
