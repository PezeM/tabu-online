import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationPL from "./locales/pl/translation.json";

export const defaultNS = "translation";
export const resources = {
  en: {
    translation: translationEN,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: ["en", "pl"],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      pl: {
        translation: translationPL,
      },
    },
  });

export default i18n;
