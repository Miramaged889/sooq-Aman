/**
 * Oman governorates and wilayats data
 * Structure: Governorate -> Wilayats (cities/districts)
 */

// Complete list of Oman governorates with their wilayats
export const omanGovernorates = [
  {
    id: "muscat",
    name: { ar: "محافظة مسقط", en: "Muscat Governorate" },
    coordinates: [23.588, 58.3829],
    wilayats: [
      {
        id: "muscat_city",
        name: { ar: "مسقط", en: "Muscat" },
        coordinates: [23.588, 58.3829],
      },
      {
        id: "muttrah",
        name: { ar: "مطرح", en: "Muttrah" },
        coordinates: [23.6137, 58.5933],
      },
      {
        id: "seeb",
        name: { ar: "السيب", en: "Seeb" },
        coordinates: [23.6702, 58.1891],
      },
      {
        id: "bawshar",
        name: { ar: "بوشر", en: "Bawshar" },
        coordinates: [23.5557, 58.4008],
      },
      {
        id: "quriyat",
        name: { ar: "قريات", en: "Quriyat" },
        coordinates: [23.235, 58.9714],
      },
      {
        id: "amerat",
        name: { ar: "العامرات", en: "Amerat" },
        coordinates: [23.35, 58.5833],
      },
    ],
  },
  {
    id: "dhofar",
    name: { ar: "محافظة ظفار", en: "Dhofar Governorate" },
    coordinates: [17.0151, 54.0924],
    wilayats: [
      {
        id: "salalah",
        name: { ar: "صلالة", en: "Salalah" },
        coordinates: [17.0151, 54.0924],
      },
      {
        id: "taqah",
        name: { ar: "طاقة", en: "Taqah" },
        coordinates: [17.0394, 54.4006],
      },
      {
        id: "mirbat",
        name: { ar: "مرباط", en: "Mirbat" },
        coordinates: [16.9969, 54.7019],
      },
      {
        id: "sadah",
        name: { ar: "سدح", en: "Sadah" },
        coordinates: [16.7333, 53.2167],
      },
      {
        id: "thumrait",
        name: { ar: "ثمريت", en: "Thumrait" },
        coordinates: [17.6667, 54.0167],
      },
      {
        id: "dhalkut",
        name: { ar: "ضلكوت", en: "Dhalkut" },
        coordinates: [16.7486, 53.2681],
      },
      {
        id: "mugshin",
        name: { ar: "مقشن", en: "Mugshin" },
        coordinates: [18.5, 55.5],
      },
      {
        id: "shalim",
        name: {
          ar: "شليم وجزر الحلانيات",
          en: "Shalim and Hallaniyat Islands",
        },
        coordinates: [17.4833, 55.9667],
      },
      {
        id: "al_mazyunah",
        name: { ar: "المزيونة", en: "Al Mazyunah" },
        coordinates: [16.8667, 52.9667],
      },
      {
        id: "rakhyut",
        name: { ar: "رخيوت", en: "Rakhyut" },
        coordinates: [17.0167, 53.2833],
      },
    ],
  },
  {
    id: "musandam",
    name: { ar: "محافظة مسندم", en: "Musandam Governorate" },
    coordinates: [26.2, 56.0833],
    wilayats: [
      {
        id: "khasab",
        name: { ar: "خصب", en: "Khasab" },
        coordinates: [26.1798, 56.2517],
      },
      {
        id: "bukha",
        name: { ar: "بخاء", en: "Bukha" },
        coordinates: [26.1333, 56.0667],
      },
      {
        id: "daba",
        name: { ar: "دباء", en: "Daba" },
        coordinates: [25.6333, 56.2667],
      },
      {
        id: "madha",
        name: { ar: "مدحاء", en: "Madha" },
        coordinates: [25.2833, 56.3167],
      },
    ],
  },
  {
    id: "al_buraimi",
    name: { ar: "محافظة البريمي", en: "Al Buraimi Governorate" },
    coordinates: [24.25, 55.7833],
    wilayats: [
      {
        id: "al_buraimi_city",
        name: { ar: "البريمي", en: "Al Buraimi" },
        coordinates: [24.25, 55.7833],
      },
      {
        id: "mahadah",
        name: { ar: "محضة", en: "Mahadah" },
        coordinates: [24.15, 55.8667],
      },
      {
        id: "as_sunaynah",
        name: { ar: "السنينة", en: "As Sunaynah" },
        coordinates: [24.3667, 55.6667],
      },
    ],
  },
  {
    id: "al_dakhliyah",
    name: { ar: "محافظة الداخلية", en: "Al Dakhliyah Governorate" },
    coordinates: [22.9333, 57.5333],
    wilayats: [
      {
        id: "nizwa",
        name: { ar: "نزوى", en: "Nizwa" },
        coordinates: [22.9333, 57.5333],
      },
      {
        id: "bahla",
        name: { ar: "بهلا", en: "Bahla" },
        coordinates: [22.9667, 57.3],
      },
      {
        id: "manah",
        name: { ar: "منح", en: "Manah" },
        coordinates: [22.8667, 57.4167],
      },
      {
        id: "al_hamra",
        name: { ar: "الحمراء", en: "Al Hamra" },
        coordinates: [23.1167, 57.3],
      },
      {
        id: "adam",
        name: { ar: "أدم", en: "Adam" },
        coordinates: [22.3833, 57.5167],
      },
      {
        id: "izki",
        name: { ar: "إزكي", en: "Izki" },
        coordinates: [22.9333, 57.7667],
      },
      {
        id: "samayil",
        name: { ar: "سمائل", en: "Samayil" },
        coordinates: [23.3167, 57.95],
      },
      {
        id: "bidbid",
        name: { ar: "بدبد", en: "Bidbid" },
        coordinates: [23.4167, 58.1167],
      },
    ],
  },
  {
    id: "north_al_batinah",
    name: { ar: "محافظة شمال الباطنة", en: "North Al Batinah Governorate" },
    coordinates: [24.3641, 56.7466],
    wilayats: [
      {
        id: "sohar",
        name: { ar: "صحار", en: "Sohar" },
        coordinates: [24.3641, 56.7466],
      },
      {
        id: "shinas",
        name: { ar: "شناص", en: "Shinas" },
        coordinates: [24.7333, 56.4833],
      },
      {
        id: "liwa",
        name: { ar: "لوى", en: "Liwa" },
        coordinates: [24.4167, 56.5833],
      },
      {
        id: "saham",
        name: { ar: "صحم", en: "Saham" },
        coordinates: [24.1722, 56.8886],
      },
      {
        id: "al_khaburah",
        name: { ar: "الخابورة", en: "Al Khaburah" },
        coordinates: [23.9667, 57.0833],
      },
      {
        id: "as_suwaiq",
        name: { ar: "السويق", en: "As Suwaiq" },
        coordinates: [23.85, 57.4333],
      },
    ],
  },
  {
    id: "south_al_batinah",
    name: { ar: "محافظة جنوب الباطنة", en: "South Al Batinah Governorate" },
    coordinates: [23.7028, 57.8894],
    wilayats: [
      {
        id: "rustaq",
        name: { ar: "الرستاق", en: "Rustaq" },
        coordinates: [23.3908, 57.4244],
      },
      {
        id: "awabi",
        name: { ar: "العوابي", en: "Awabi" },
        coordinates: [23.2833, 57.5167],
      },
      {
        id: "nakhal",
        name: { ar: "نخل", en: "Nakhal" },
        coordinates: [23.3667, 57.8167],
      },
      {
        id: "wadi_al_maawil",
        name: { ar: "وادي المعاول", en: "Wadi Al Maawil" },
        coordinates: [23.2333, 57.8667],
      },
      {
        id: "barka",
        name: { ar: "بركاء", en: "Barka" },
        coordinates: [23.7028, 57.8894],
      },
      {
        id: "al_musannah",
        name: { ar: "المصنعة", en: "Al Musannah" },
        coordinates: [23.8167, 57.55],
      },
    ],
  },
  {
    id: "north_al_sharqiyah",
    name: { ar: "محافظة شمال الشرقية", en: "North Al Sharqiyah Governorate" },
    coordinates: [22.5667, 59.5289],
    wilayats: [
      {
        id: "sur",
        name: { ar: "صور", en: "Sur" },
        coordinates: [22.5667, 59.5289],
      },
      {
        id: "al_kamil_wal_wafi",
        name: { ar: "الكامل والوافي", en: "Al Kamil Wal Wafi" },
        coordinates: [22.6167, 59.3333],
      },
      {
        id: "ibra",
        name: { ar: "إبراء", en: "Ibra" },
        coordinates: [22.6833, 58.5333],
      },
      {
        id: "al_mudhaibi",
        name: { ar: "المضيبي", en: "Al Mudhaibi" },
        coordinates: [22.8833, 58.7667],
      },
      {
        id: "wadi_bani_khalid",
        name: { ar: "وادي بني خالد", en: "Wadi Bani Khalid" },
        coordinates: [22.4833, 59.1167],
      },
      {
        id: "dima_wa_taeen",
        name: { ar: "دماء والطائيين", en: "Dima Wa Taeen" },
        coordinates: [22.2833, 59.65],
      },
    ],
  },
  {
    id: "south_al_sharqiyah",
    name: { ar: "محافظة جنوب الشرقية", en: "South Al Sharqiyah Governorate" },
    coordinates: [20.65, 58.0833],
    wilayats: [
      {
        id: "sur_south",
        name: { ar: "صور", en: "Sur" },
        coordinates: [22.5667, 59.5289],
      },
      {
        id: "al_ashkharah",
        name: { ar: "الأشخرة", en: "Al Ashkharah" },
        coordinates: [20.6167, 59.4833],
      },
      {
        id: "masirah",
        name: { ar: "مصيرة", en: "Masirah" },
        coordinates: [20.6667, 58.8833],
      },
      {
        id: "jalan_bani_bu_hassan",
        name: { ar: "جعلان بني بو حسن", en: "Jalan Bani Bu Hassan" },
        coordinates: [21.8333, 59.2333],
      },
      {
        id: "jalan_bani_bu_ali",
        name: { ar: "جعلان بني بو علي", en: "Jalan Bani Bu Ali" },
        coordinates: [21.8, 59.1333],
      },
    ],
  },
  {
    id: "ad_dhahirah",
    name: { ar: "محافظة الظاهرة", en: "Ad Dhahirah Governorate" },
    coordinates: [23.2254, 56.5158],
    wilayats: [
      {
        id: "ibri",
        name: { ar: "عبري", en: "Ibri" },
        coordinates: [23.2254, 56.5158],
      },
      {
        id: "yanqul",
        name: { ar: "ينقل", en: "Yanqul" },
        coordinates: [23.5833, 56.55],
      },
      {
        id: "dhank",
        name: { ar: "ضنك", en: "Dhank" },
        coordinates: [23.6667, 56.8833],
      },
    ],
  },
  {
    id: "al_wusta",
    name: { ar: "محافظة الوسطى", en: "Al Wusta Governorate" },
    coordinates: [19.5333, 56.0833],
    wilayats: [
      {
        id: "haima",
        name: { ar: "هيماء", en: "Haima" },
        coordinates: [19.8667, 56.3167],
      },
      {
        id: "al_duqm",
        name: { ar: "الدقم", en: "Al Duqm" },
        coordinates: [19.6667, 57.9],
      },
      {
        id: "mahout",
        name: { ar: "محوت", en: "Mahout" },
        coordinates: [18.9167, 57.1833],
      },
      {
        id: "al_jazer",
        name: { ar: "الجازر", en: "Al Jazer" },
        coordinates: [19.5333, 56.0833],
      },
    ],
  },
];

// Legacy regions array for backward compatibility
export const omanRegions = omanGovernorates.flatMap((governorate) => [
  {
    id: governorate.id,
    name: governorate.name,
    coordinates: governorate.coordinates,
    type: "governorate",
  },
  ...governorate.wilayats.map((wilayat) => ({
    id: wilayat.id,
    name: wilayat.name,
    coordinates: wilayat.coordinates,
    type: "wilayat",
    governorate: governorate.id,
  })),
]);

/**
 * Get region name by language
 * @param {string} regionId - Region identifier
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {string} Region name
 */
export const getRegionName = (regionId, language = "ar") => {
  const region = omanRegions.find((r) => r.id === regionId);
  return region ? region.name[language] : regionId;
};

/**
 * Get region coordinates
 * @param {string} regionId - Region identifier
 * @returns {Array} [latitude, longitude]
 */
export const getRegionCoordinates = (regionId) => {
  const region = omanRegions.find((r) => r.id === regionId);
  return region ? region.coordinates : [23.588, 58.3829]; // Default to Muscat
};

/**
 * Get governorate by ID
 * @param {string} governorateId - Governorate identifier
 * @returns {Object|null} Governorate object
 */
export const getGovernorate = (governorateId) => {
  return omanGovernorates.find((g) => g.id === governorateId) || null;
};

/**
 * Get all wilayats for a governorate
 * @param {string} governorateId - Governorate identifier
 * @returns {Array} Array of wilayats
 */
export const getGovernorateWilayats = (governorateId) => {
  const governorate = getGovernorate(governorateId);
  return governorate ? governorate.wilayats : [];
};

/**
 * Get governorate name by language
 * @param {string} governorateId - Governorate identifier
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {string} Governorate name
 */
export const getGovernorrateName = (governorateId, language = "ar") => {
  const governorate = getGovernorate(governorateId);
  return governorate ? governorate.name[language] : governorateId;
};

/**
 * Find wilayat by ID across all governorates
 * @param {string} wilayatId - Wilayat identifier
 * @returns {Object|null} Wilayat object with governorate info
 */
export const findWilayat = (wilayatId) => {
  for (const governorate of omanGovernorates) {
    const wilayat = governorate.wilayats.find((w) => w.id === wilayatId);
    if (wilayat) {
      return {
        ...wilayat,
        governorate: governorate.id,
        governorateName: governorate.name,
      };
    }
  }
  return null;
};

/**
 * Get all governorates for select options
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {Array} Array of {value, label} objects
 */
export const getGovernorateOptions = (language = "ar") => {
  return omanGovernorates.map((governorate) => ({
    value: governorate.id,
    label: governorate.name[language],
  }));
};

/**
 * Get wilayat options for a specific governorate
 * @param {string} governorateId - Governorate identifier
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {Array} Array of {value, label} objects
 */
export const getWilayatOptions = (governorateId, language = "ar") => {
  const wilayats = getGovernorateWilayats(governorateId);
  return wilayats.map((wilayat) => ({
    value: wilayat.id,
    label: wilayat.name[language],
  }));
};
