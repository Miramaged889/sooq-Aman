/**
 * Validation utility functions
 */



/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} Is valid
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length required
 * @returns {boolean} Is valid
 */
export const validateMinLength = (value, minLength) => {
  return value && value.trim().length >= minLength;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length allowed
 * @returns {boolean} Is valid
 */
export const validateMaxLength = (value, maxLength) => {
  return !value || value.trim().length <= maxLength;
};

/**
 * Validate price (positive number)
 * @param {number|string} price - Price to validate
 * @returns {boolean} Is valid
 */
export const validatePrice = (price) => {
  if (!price) return false;
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return !isNaN(numPrice) && numPrice >= 0;
};

/**
 * Validate ad title
 * @param {string} title - Title to validate
 * @returns {object} Validation result with isValid and message
 */
export const validateAdTitle = (title) => {
  if (!validateRequired(title)) {
    return { isValid: false, message: 'Title is required' };
  }
  
  if (!validateMinLength(title, 5)) {
    return { isValid: false, message: 'Title must be at least 5 characters' };
  }
  
  if (!validateMaxLength(title, 100)) {
    return { isValid: false, message: 'Title must be less than 100 characters' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate ad description
 * @param {string} description - Description to validate
 * @returns {object} Validation result with isValid and message
 */
export const validateAdDescription = (description) => {
  if (!validateRequired(description)) {
    return { isValid: false, message: 'Description is required' };
  }
  
  if (!validateMinLength(description, 20)) {
    return { isValid: false, message: 'Description must be at least 20 characters' };
  }
  
  if (!validateMaxLength(description, 1000)) {
    return { isValid: false, message: 'Description must be less than 1000 characters' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate ad price
 * @param {number|string} price - Price to validate
 * @returns {object} Validation result with isValid and message
 */
export const validateAdPrice = (price) => {
  if (!validateRequired(price)) {
    return { isValid: false, message: 'Price is required' };
  }
  
  if (!validatePrice(price)) {
    return { isValid: false, message: 'Price must be a valid positive number' };
  }
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (numPrice > 100000) {
    return { isValid: false, message: 'Price cannot exceed 100,000 OMR' };
  }
  
  return { isValid: true, message: '' };
};
