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
        className="w-11/12 max-w-sm rounded-lg bg-tg-secondary-bg p-6 shadow-lg border border-tg-section-separator-color"
      >
        <h2 className="mb-6 text-center text-xl font-bold">
          {t('settings')}
        </h2>

        {/* Тема оформления */}
        <div className="mb-6">
          <h4 className="mb-3 font-medium">{t('appearance')}</h4>
          <div className="flex gap-2">
            <button 
              onClick={() => handleThemeChange('light')} 
              className={clsx('flex-1 rounded-lg px-4 py-2 font-medium transition-colors border', {
                'border-transparent': colorScheme !== 'light',
                'bg-transparent border-tg-hint': colorScheme === 'light',
              })}
            >
              {t('light_theme')}
            </button>
            <button 
              onClick={() => handleThemeChange('dark')} 
              className={clsx('flex-1 rounded-lg px-4 py-2 font-medium transition-colors border', {
                'border-transparent': colorScheme !== 'dark',
                'bg-transparent border-tg-hint': colorScheme === 'dark',
              })}
            >
              {t('dark_theme')}
            </button>
          </div>
        </div>

        {/* Язык */}
        <div className="mb-6">
          <h4 className="mb-3 font-medium">{t('language')}</h4>
          <div className="flex gap-2">
            <button 
              onClick={() => handleLanguageChange('ru')} 
              className={clsx('flex-1 rounded-lg px-4 py-2 font-medium transition-colors border', {
                'border-transparent': language !== 'ru',
                'bg-transparent border-tg-hint': language === 'ru',
              })}
            >
              RU
            </button>
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={clsx('flex-1 rounded-lg px-4 py-2 font-medium transition-colors border', {
                'border-transparent': language !== 'en',
                'bg-transparent border-tg-hint': language === 'en',
              })}
            >
              EN
            </button>
          </div>
        </div>

        {/* Показываем индикатор изменений */}
        {hasUnsavedChanges && (
          <div className="mb-4 text-center text-sm text-tg-link">
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
                className="flex flex-1 items-center border border-tg-hint justify-center rounded-lg px-4 py-3 font-medium transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="flex-1 rounded-lg border px-4 py-3 font-medium transition-colors disabled:opacity-50"
              >
                {t('cancel')}
              </button>
            </div>
          ) : (
            <button 
              onClick={closePanelWithoutSaving}
              className="w-full rounded-lg border border-tg-hint px-4 py-3 font-medium transition-colors"
            >
              {t('close')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};