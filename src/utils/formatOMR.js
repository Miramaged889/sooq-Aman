/**
 * Format price in Omani Rial (OMR)
 * @param {number} amount - The amount to format
 * @param {boolean} showCurrency - Whether to show the currency symbol
 * @param {string} language - The language for formatting (ar/en)
 * @returns {string} Formatted price string
 */
export const formatOMR = (amount, showCurrency = true, language = "en") => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return showCurrency
      ? language === "ar"
        ? "0.000 ر.ع"
        : "0.000 OMR"
      : "0.000";
  }

  const locale = language === "ar" ? "ar-OM" : "en-OM";
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount);

  if (showCurrency) {
    return language === "ar" ? `${formatted} ر.ع` : `${formatted} OMR`;
  }

  return formatted;
};

/**
 * Parse OMR string to number
 * @param {string} omrString - The OMR string to parse
 * @returns {number} Parsed number
 */
export const parseOMR = (omrString) => {
  if (!omrString) return 0;

  // Remove currency symbol and spaces, then parse
  const cleanString = omrString.replace(/[^\d.,]/g, "");
  const number = parseFloat(cleanString.replace(",", ""));

  return isNaN(number) ? 0 : number;
};
