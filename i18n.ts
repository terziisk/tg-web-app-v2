import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './src/locales/en.json';
import ru from './src/locales/ru.json';

const resources = {
  ru: {
    translation: ru
  },
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // язык по умолчанию
    fallbackLng: "en",
    
    // Настройки интерполяции
    interpolation: {
      escapeValue: false, // React сам экранирует HTML
    },
    
    // Настройки для отладки (отключить в продакшене)
    debug: import.meta.env.DEV,
    
    // Настройки кеширования
    react: {
      useSuspense: false, // Отключаем Suspense для более простой интеграции
    }
  });

  export default i18n;