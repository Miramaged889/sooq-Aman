/**
 * Oman regions and cities data
 */
export const omanRegions = [
  { id: 'muscat', name: { ar: 'مسقط', en: 'Muscat' }, coordinates: [23.5880, 58.3829] },
  { id: 'seeb', name: { ar: 'السيب', en: 'Seeb' }, coordinates: [23.6702, 58.1891] },
  { id: 'bawshar', name: { ar: 'بوشر', en: 'Bawshar' }, coordinates: [23.5557, 58.4008] },
  { id: 'sohar', name: { ar: 'صحار', en: 'Sohar' }, coordinates: [24.3641, 56.7466] },
  { id: 'nizwa', name: { ar: 'نزوى', en: 'Nizwa' }, coordinates: [22.9333, 57.5333] },
  { id: 'salalah', name: { ar: 'صلالة', en: 'Salalah' }, coordinates: [17.0151, 54.0924] },
  { id: 'sur', name: { ar: 'صور', en: 'Sur' }, coordinates: [22.5667, 59.5289] },
  { id: 'ibri', name: { ar: 'عبري', en: 'Ibri' }, coordinates: [23.2254, 56.5158] },
  { id: 'saham', name: { ar: 'صحار', en: 'Saham' }, coordinates: [24.1722, 56.8886] },
  { id: 'barka', name: { ar: 'بركاء', en: 'Barka' }, coordinates: [23.7028, 57.8894] },
  { id: 'rustaq', name: { ar: 'الرستاق', en: 'Rustaq' }, coordinates: [23.3908, 57.4244] },
];

/**
 * Get region name by language
 * @param {string} regionId - Region identifier
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {string} Region name
 */
export const getRegionName = (regionId, language = 'ar') => {
  const region = omanRegions.find(r => r.id === regionId);
  return region ? region.name[language] : regionId;
};

/**
 * Get region coordinates
 * @param {string} regionId - Region identifier
 * @returns {Array} [latitude, longitude]
 */
export const getRegionCoordinates = (regionId) => {
  const region = omanRegions.find(r => r.id === regionId);
  return region ? region.coordinates : [23.5880, 58.3829]; // Default to Muscat
};
