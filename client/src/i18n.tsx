import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageEN from "./locales/en/translation.json";
import languageAR from "./locales/ar/translation.json";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(";").shift();
    }
  }
  return null;
};

const defaultLanguage = getCookie("language") || "en";
export const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: languageEN,
    },
    ar: {
      translation: languageAR,
    },
  },
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
