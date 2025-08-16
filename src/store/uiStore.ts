// src/store/uiStore.ts
import { create } from 'zustand';

// Определяем типы для наших вкладок и темы для строгости
export type Tab = 'activities' | 'management' | 'advertiser';
export type Theme = 'light' | 'dark';

// Определяем, как будет выглядеть наше состояние
interface UiState {
  activeTab: Tab;
  theme: Theme;
  // Функции для изменения состояния
  setActiveTab: (tab: Tab) => void;
  toggleTheme: () => void;
}

// Создаем само хранилище
export const useUiStore = create<UiState>((set) => ({
  // Начальные значения
  isLoading: true,
  activeTab: 'activities', // Приложение всегда открывается на первой вкладке
  theme: 'dark', // Поставим темную по умолчанию

  // Действия (actions) для изменения состояния
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));