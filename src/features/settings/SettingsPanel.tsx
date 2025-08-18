// src/features/settings/SettingsPanel.tsx
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../store/settingsStore';
import { Icons } from '../../components/Icons';
import clsx from 'clsx';

export const SettingsPanel = () => {
  const { t } = useTranslation();
  const { 
    isPanelOpen, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        ref={panelRef}
        className="w-11/12 max-w-sm rounded-xl shadow-2xl"
        style={{
          backgroundColor: 'var(--tg-theme-secondary-bg-color)',
          color: 'var(--tg-theme-text-color)',
          border: `1px solid var(--tg-theme-section-separator-color)`
        }}
      >
        {/* Заголовок */}
        <div className="p-6 pb-4">
          <h2 className="text-center text-xl font-bold">
            {t('settings')}
          </h2>
        </div>

        {/* Контент */}
        <div className="px-6 pb-6">
          {/* Тема оформления */}
          <div className="mb-6">
            <h4 className="mb-3 font-medium" style={{ color: 'var(--tg-theme-text-color)' }}>
              {t('appearance')}
            </h4>
            <div className="flex gap-2">
              <button 
                onClick={() => handleThemeChange('light')} 
                className={clsx(
                  'flex-1 rounded-lg px-4 py-2.5 font-medium transition-all duration-200',
                  colorScheme === 'light' 
                    ? 'border-2 shadow-sm' 
                    : 'border border-opacity-30 hover:border-opacity-60'
                )}
                style={{
                  backgroundColor: colorScheme === 'light' 
                    ? 'var(--tg-theme-bg-color)' 
                    : 'transparent',
                  borderColor: colorScheme === 'light' 
                    ? 'var(--tg-theme-link-color)' 
                    : 'var(--tg-theme-hint-color)',
                  color: 'var(--tg-theme-text-color)'
                }}
              >
                {t('light_theme')}
              </button>
              <button 
                onClick={() => handleThemeChange('dark')} 
                className={clsx(
                  'flex-1 rounded-lg px-4 py-2.5 font-medium transition-all duration-200',
                  colorScheme === 'dark' 
                    ? 'border-2 shadow-sm' 
                    : 'border border-opacity-30 hover:border-opacity-60'
                )}
                style={{
                  backgroundColor: colorScheme === 'dark' 
                    ? 'var(--tg-theme-bg-color)' 
                    : 'transparent',
                  borderColor: colorScheme === 'dark' 
                    ? 'var(--tg-theme-link-color)' 
                    : 'var(--tg-theme-hint-color)',
                  color: 'var(--tg-theme-text-color)'
                }}
              >
                {t('dark_theme')}
              </button>
            </div>
          </div>

          {/* Язык */}
          <div className="mb-6">
            <h4 className="mb-3 font-medium" style={{ color: 'var(--tg-theme-text-color)' }}>
              {t('language')}
            </h4>
            <div className="flex gap-2">
              <button 
                onClick={() => handleLanguageChange('ru')} 
                className={clsx(
                  'flex-1 rounded-lg px-4 py-2.5 font-medium transition-all duration-200',
                  language === 'ru' 
                    ? 'border-2 shadow-sm' 
                    : 'border border-opacity-30 hover:border-opacity-60'
                )}
                style={{
                  backgroundColor: language === 'ru' 
                    ? 'var(--tg-theme-bg-color)' 
                    : 'transparent',
                  borderColor: language === 'ru' 
                    ? 'var(--tg-theme-link-color)' 
                    : 'var(--tg-theme-hint-color)',
                  color: 'var(--tg-theme-text-color)'
                }}
              >
                RU
              </button>
              <button 
                onClick={() => handleLanguageChange('en')} 
                className={clsx(
                  'flex-1 rounded-lg px-4 py-2.5 font-medium transition-all duration-200',
                  language === 'en' 
                    ? 'border-2 shadow-sm' 
                    : 'border border-opacity-30 hover:border-opacity-60'
                )}
                style={{
                  backgroundColor: language === 'en' 
                    ? 'var(--tg-theme-bg-color)' 
                    : 'transparent',
                  borderColor: language === 'en' 
                    ? 'var(--tg-theme-link-color)' 
                    : 'var(--tg-theme-hint-color)',
                  color: 'var(--tg-theme-text-color)'
                }}
              >
                EN
              </button>
            </div>
          </div>

          {/* Показываем индикатор изменений */}
          {hasUnsavedChanges && (
            <div className="mb-4 text-center text-sm" style={{ color: 'var(--tg-theme-link-color)' }}>
              {t('unsaved_changes')}
            </div>
          )}

          {/* Кнопки действий */}
          <div className="space-y-3">
            {hasUnsavedChanges ? (
              <div className="flex space-x-3">
                <button 
                  onClick={handleSaveAndClose}
                  disabled={isSaving}
                  className="flex flex-1 items-center justify-center rounded-lg px-4 py-3 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--tg-theme-button-color)',
                    color: 'var(--tg-theme-button-text-color)',
                    border: 'none'
                  }}
                >
                  {isSaving ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      {t('saving')}
                    </>
                  ) : (
                    t('save')
                  )}
                </button>
                <button 
                  onClick={handleDiscardAndClose}
                  disabled={isSaving}
                  className="flex-1 rounded-lg border px-4 py-3 font-medium transition-all duration-200 disabled:opacity-50 hover:opacity-80"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'var(--tg-theme-hint-color)',
                    color: 'var(--tg-theme-text-color)'
                  }}
                >
                  {t('cancel')}
                </button>
              </div>
            ) : (
              <button 
                onClick={closePanelWithoutSaving}
                className="w-full rounded-lg border px-4 py-3 font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'var(--tg-theme-hint-color)',
                  color: 'var(--tg-theme-text-color)'
                }}
              >
                {t('close')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};