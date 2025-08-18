// src/store/uiStore.ts
import { create } from "zustand";

// Определяем типы для наших вкладок и темы для строгости
export type Tab = "activities" | "management" | "advertiser";
export type ColorScheme = "light" | "dark";

// Определяем, как будет выглядеть наше состояние
interface UiState {
  activeTab: Tab;
  colorScheme: ColorScheme | null;
  // Функции для изменения состояния
  setActiveTab: (tab: Tab) => void;

  // ✅ Добавляем метод для установки темы
  setColorScheme: (scheme: ColorScheme) => void;
  // ✅ Добавляем метод для инициализации из Telegram
  initializeTheme: (tgTheme: "light" | "dark" | undefined) => void;
}

// Создаем само хранилище
export const useUiStore = create<UiState>((set) => ({
  // Начальные значения
  isLoading: true,
  activeTab: "activities", // Приложение всегда открывается на первой вкладке
  colorScheme: null, // Поставим темную по умолчанию

  // Действия (actions) для изменения состояния
  setActiveTab: (tab) => set({ activeTab: tab }),
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  initializeTheme: (tgTheme) => {
    // Устанавливаем тему только если она еще не была установлена (null)
    set((state) => {
      if (
        state.colorScheme === null &&
        (tgTheme === "light" || tgTheme === "dark")
      ) {
        return { colorScheme: tgTheme as ColorScheme };
      }
      return {};
    });
  },
}));
