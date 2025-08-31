import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ar from "../i18n/ar.json";
import en from "../i18n/en.json";

const I18nContext = createContext();

export { I18nContext };

// Translation dictionaries
const TRANSLATIONS = {
  ar,
  en,
};

// Language configuration
const LANGUAGE_CONFIG = {
  ar: { dir: "rtl", lang: "ar" },
  en: { dir: "ltr", lang: "en" },
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("LANGUAGE");
      return saved && TRANSLATIONS[saved] ? saved : "ar";
    } catch {
      return "ar";
    }
  });

  const [translations, setTranslations] = useState(
    () => TRANSLATIONS[language] || ar
  );

  // Update document attributes when language changes
  const updateDocumentAttributes = useCallback((lang) => {
    const config = LANGUAGE_CONFIG[lang];
    if (config) {
      document.documentElement.dir = config.dir;
      document.documentElement.lang = config.lang;
    }
  }, []);

  // Change language function with validation
  const changeLanguage = useCallback(
    (newLanguage) => {
      if (!TRANSLATIONS[newLanguage]) {
        console.warn(`Unsupported language: ${newLanguage}`);
        return;
      }

      try {
        setLanguage(newLanguage);
        localStorage.setItem("LANGUAGE", newLanguage);
        updateDocumentAttributes(newLanguage);
      } catch (error) {
        console.error("Failed to change language:", error);
      }
    },
    [updateDocumentAttributes]
  );

  // Update translations when language changes
  useEffect(() => {
    const newTranslations = TRANSLATIONS[language];
    if (newTranslations) {
      setTranslations(newTranslations);
      updateDocumentAttributes(language);
    }
  }, [language, updateDocumentAttributes]);

  // Translation function with memoization and error handling
  const t = useCallback(
    (key, params = {}) => {
      if (!key || typeof key !== "string") {
        console.warn("Invalid translation key:", key);
        return key || "";
      }

      try {
        const keys = key.split(".");
        let value = translations;

        for (const k of keys) {
          value = value?.[k];
          if (value === undefined) {
            console.warn(`Translation key not found: ${key}`);
            return key;
          }
        }

        if (typeof value === "string") {
          return Object.keys(params).reduce((str, param) => {
            return str.replace(new RegExp(`{${param}}`, "g"), params[param]);
          }, value);
        }

        return value || key;
      } catch (error) {
        console.error("Translation error:", error);
        return key;
      }
    },
    [translations]
  );

  // Memoized context value
  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      t,
      isRTL: language === "ar",
      availableLanguages: Object.keys(TRANSLATIONS),
    }),
    [language, changeLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
