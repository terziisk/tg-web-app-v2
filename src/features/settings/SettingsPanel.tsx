// src/features/settings/SettingsPanel.tsx
import { useSettingsStore } from '@/store/settingsStore';
import { Button } from '@telegram-apps/telegram-ui';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Icons } from '@/components/Icons';

export const SettingsPanel = () => {
  const { 
    isPanelOpen, 
    closePanel, 
    hasUnsavedChanges, 
    isSaving, 
    discardChanges,
    saveSettings 
  } = useSettingsStore();

  // Если панель не открыта, ничего не рендерим
  if (!isPanelOpen) {
    return null;
  }

  const handleSaveAndClose = async () => {
    try {
      await saveSettings();
      closePanel();
    } catch (error) {
      // Ошибка уже залогирована в store, можно показать уведомление
      console.error("Ошибка при сохранении настроек:", error);
    }
  };

  const handleDiscardAndClose = () => {
    if (hasUnsavedChanges) {
      discardChanges();
    }
    closePanel();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleDiscardAndClose} // Закрытие без сохранения по клику на фон
    >
      <div 
        className="w-11/12 max-w-sm rounded-lg bg-secondary-bg-color p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-xl font-bold text-text-color">
          Настройки
        </h2>
        
        <div className="space-y-6">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>

        {/* Показываем индикатор изменений */}
        {hasUnsavedChanges && (
          <div className="mt-4 text-center text-sm text-yellow-500">
            Есть несохранённые изменения
          </div>
        )}

        {/* Кнопки действий */}
        <div className="mt-6 space-y-3">
          {hasUnsavedChanges ? (
            <div className="flex space-x-3">
              <Button 
                size="l" 
                className="flex-1" 
                onClick={handleSaveAndClose}
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="flex items-center justify-center">
                    <Icons.spinner className="w-4 h-4 animate-spin mr-2" />
                    Сохранение...
                  </div>
                ) : (
                  'Сохранить'
                )}
              </Button>
              <Button 
                size="l" 
                mode="outline"
                className="flex-1" 
                onClick={handleDiscardAndClose}
                disabled={isSaving}
              >
                Отменить
              </Button>
            </div>
          ) : (
            <Button size="l" className="w-full" onClick={closePanel}>
              Закрыть
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};