// src/store/uiStore.ts
import { create } from "zustand";

// Определяем типы для наших вкладок
export type Tab = "activities" | "management" | "advertiser";

// Определяем, как будет выглядеть наше состояние
interface UiState {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

// Создаем само хранилище
export const useUiStore = create<UiState>((set) => ({
  activeTab: "activities", // Приложение всегда открывается на первой вкладке
  setActiveTab: (tab) => set({ activeTab: tab }),
}));