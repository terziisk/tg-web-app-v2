// src/store/settingsStore.ts
import { create } from 'zustand';

interface SettingsState {
  isPanelOpen: boolean;
  togglePanel: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  isPanelOpen: false,
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
}));