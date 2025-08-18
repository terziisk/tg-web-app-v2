// src/store/languageStore.ts
import { create } from 'zustand';

export type Language = 'ru' | 'en';

interface LanguageState {
  language: Language | null;
  setLanguage: (lang: Language) => void;
  initializeLanguage: (tgLang?: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: null,
  setLanguage: (lang) => set({ language: lang }),
  initializeLanguage: (tgLang) => {
    set((state) => {
      if (state.language === null) {
        const lang = tgLang === 'ru' ? 'ru' : 'en'; // По умолчанию 'en'
        return { language: lang };
      }
      return {};
    });
  },
}));