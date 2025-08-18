// src/features/Settings/SettingsPanel.tsx
import { useSettingsStore } from '@/store/settingsStore';
import { Button } from '@telegram-apps/telegram-ui';
import { ThemeSwitcher } from './ThemeSwitcher';     // ✅ Импорт
import { LanguageSwitcher } from './LanguageSwitcher'; // ✅ Импорт

export const SettingsPanel = () => {
  const { isPanelOpen, togglePanel } = useSettingsStore();

  // Если панель не открыта, ничего не рендерим
  if (!isPanelOpen) {
    return null;
  }

  return (
    // Полупрозрачный фон, который закрывает все приложение
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={togglePanel} // Закрытие по клику на фон
    >
      {/* Сама панель. onClick останавливает "всплытие" клика, чтобы он не закрывал панель */}
      <div 
        className="w-11/12 max-w-sm rounded-lg bg-secondary-bg-color p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center text-xl font-bold text-text-color">Настройки</h2>
        
        {/* Здесь будут переключатели языка и темы */}
       <div className="space-y-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>

        <Button size="l" className="mt-6 w-full" onClick={togglePanel}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};