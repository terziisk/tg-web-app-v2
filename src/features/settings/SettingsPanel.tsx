// src/features/settings/SettingsPanel.tsx
import { useRef, useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import { Icons } from '@/components/Icons';

export const SettingsPanel = () => {
  const { 
    isPanelOpen, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    closePanel,
    closePanelWithoutSaving, 
    hasUnsavedChanges, 
    isSaving, 
    discardChanges,
    saveSettings,
    language,
    colorScheme,
    setLanguage,
    setColorScheme
  } = useSettingsStore();

  const panelRef = useRef<HTMLDivElement>(null);

  console.log("🎛️ Рендерим SettingsPanel:", { 
    isPanelOpen, 
    hasUnsavedChanges, 
    isSaving,
    language,
    colorScheme
  });

  // Закрытие панели по клику вне её
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        handleDiscardAndClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPanelOpen]);

  // Если панель не открыта, ничего не рендерим
  if (!isPanelOpen) {
    return null;
  }

  const handleSaveAndClose = async () => {
    console.log("💾 Сохраняем настройки и закрываем панель");
    try {
      await saveSettings();
      closePanelWithoutSaving(); // Закрываем без повторного сохранения
    } catch (error) {
      console.error("❌ Ошибка сохранения настроек:", error);
    }
  };

  const handleDiscardAndClose = () => {
    console.log("🚫 Отменяем изменения и закрываем панель");
    if (hasUnsavedChanges) {
      discardChanges();
    }
    closePanelWithoutSaving();
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    console.log("🎨 Изменяем тему на:", theme);
    setColorScheme(theme);
  };

  const handleLanguageChange = (lang: 'ru' | 'en') => {
    console.log("🌍 Изменяем язык на:", lang);
    setLanguage(lang);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={panelRef}
        className="w-11/12 max-w-sm rounded-lg bg-secondary-bg-color p-6 shadow-lg"
      >
        <h2 className="mb-6 text-center text-xl font-bold text-text-color">
          Настройки
        </h2>
        
        {/* Тема оформления */}
        <div className="mb-6">
          <h4 className="mb-3 text-text-color font-medium">Тема оформления</h4>
          <div className="flex gap-2">
            <button 
              onClick={() => handleThemeChange('light')} 
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                colorScheme === 'light' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Светлая
            </button>
            <button 
              onClick={() => handleThemeChange('dark')} 
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                colorScheme === 'dark' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Тёмная
            </button>
          </div>
        </div>

        {/* Язык */}
        <div className="mb-6">
          <h4 className="mb-3 text-text-color font-medium">Язык</h4>
          <div className="flex gap-2">
            <button 
              onClick={() => handleLanguageChange('ru')} 
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                language === 'ru' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              RU
            </button>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                language === 'en' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Показываем индикатор изменений */}
        {hasUnsavedChanges && (
          <div className="mb-4 text-center text-sm text-yellow-500">
            Есть несохранённые изменения
          </div>
        )}

        {/* Кнопки действий */}
        <div className="space-y-3">
          {hasUnsavedChanges ? (
            <div className="flex space-x-3">
              <button 
                onClick={handleSaveAndClose}
                disabled={isSaving}
                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSaving ? (
                  <>
                    <Icons.spinner className="w-4 h-4 animate-spin mr-2" />
                    Сохранение...
                  </>
                ) : (
                  'Сохранить'
                )}
              </button>
              <button 
                onClick={handleDiscardAndClose}
                disabled={isSaving}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Отменить
              </button>
            </div>
          ) : (
            <button 
              onClick={closePanelWithoutSaving}
              className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Закрыть
            </button>
          )}
        </div>
      </div>
    </div>
  );
};