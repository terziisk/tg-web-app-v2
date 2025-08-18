// src/store/settingsStore.ts
import { create } from 'zustand';
import { updateUserSettings } from '@/lib/api/authService';

export type Language = 'ru' | 'en';
export type ColorScheme = 'light' | 'dark';

interface SettingsState {
  // UI состояние панели
  isPanelOpen: boolean;
  
  // Настройки
  language: Language | null;
  colorScheme: ColorScheme | null;
  
  // Исходные значения (для отката изменений)
  initialLanguage: Language | null;
  initialColorScheme: ColorScheme | null;
  
  // Флаги состояния
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  
  // Действия для UI
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  
  // Действия для настроек
  setLanguage: (lang: Language) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  
  // Инициализация настроек
  initializeSettings: (lang: Language, scheme: ColorScheme) => void;
  
  // Сохранение и отмена
  saveSettings: () => Promise<void>;
  discardChanges: () => void;
  
  // Проверка изменений
  checkForChanges: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Начальные значения
  isPanelOpen: false,
  language: null,
  colorScheme: null,
  initialLanguage: null,
  initialColorScheme: null,
  hasUnsavedChanges: false,
  isSaving: false,
  
  // UI действия
  togglePanel: () => {
    const state = get();
    if (state.isPanelOpen) {
      // При закрытии панели сохраняем изменения
      state.closePanel();
    } else {
      state.openPanel();
    }
  },
  
  openPanel: () => {
    set((state) => ({
      isPanelOpen: true,
      // Запоминаем исходные значения при открытии
      initialLanguage: state.language,
      initialColorScheme: state.colorScheme,
      hasUnsavedChanges: false,
    }));
  },
  
  closePanel: async () => {
    const state = get();
    if (state.hasUnsavedChanges) {
      await state.saveSettings();
    }
    set({ isPanelOpen: false });
  },
  
  // Действия для настроек
  setLanguage: (lang) => {
    set({ language: lang });
    get().checkForChanges();
  },
  
  setColorScheme: (scheme) => {
    set({ colorScheme: scheme });
    get().checkForChanges();
  },
  
  // Инициализация (вызывается при загрузке профиля)
  initializeSettings: (lang, scheme) => {
    set({
      language: lang,
      colorScheme: scheme,
      initialLanguage: lang,
      initialColorScheme: scheme,
      hasUnsavedChanges: false,
    });
  },
  
  // Проверка изменений
  checkForChanges: () => {
    const state = get();
    const hasChanges = 
      state.language !== state.initialLanguage || 
      state.colorScheme !== state.initialColorScheme;
    
    set({ hasUnsavedChanges: hasChanges });
  },
  
  // Сохранение настроек
  saveSettings: async () => {
    const state = get();
    
    if (!state.hasUnsavedChanges) return;
    
    set({ isSaving: true });
    
    try {
      await updateUserSettings({
        appLanguageCode: state.language || undefined,
        appColorScheme: state.colorScheme || undefined,
      });
      
      // Обновляем исходные значения после успешного сохранения
      set({
        initialLanguage: state.language,
        initialColorScheme: state.colorScheme,
        hasUnsavedChanges: false,
        isSaving: false,
      });
      
      console.log('✅ Настройки успешно сохранены');
    } catch (error) {
      console.error('❌ Ошибка сохранения настроек:', error);
      set({ isSaving: false });
      throw error;
    }
  },
  
  // Отмена изменений
  discardChanges: () => {
    const state = get();
    set({
      language: state.initialLanguage,
      colorScheme: state.initialColorScheme,
      hasUnsavedChanges: false,
    });
  },
}));