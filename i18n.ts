import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import en from './locales/en.json';
// import ru from './locales/ru.json';

const resources = {
  ru: {
    translation: {
      settings: 'Настройки',
      light_theme: 'Светлая тема',
      dark_theme: 'Тёмная тема',
      language: 'Язык',
      // ... другие ключи ...
    }
  },
  en: {
    translation: {
      settings: 'Settings',
      light_theme: 'Light theme',
      dark_theme: 'Dark theme',
      language: 'Language',
      // ... другие ключи ...
    }
  }
};

i18n
  .use(initReactI18next) // подключаем к React
  .init({
    resources,
    lng: "en", // язык по умолчанию
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React сам экранирует HTML
    },
  });

export default i18n;
