// src/features/settings/SettingsButton.tsx
import { useSettingsStore } from '@/store/settingsStore';
import { Icons } from '@/components/Icons';

export const SettingsButton = () => {
  const { openPanel, hasUnsavedChanges } = useSettingsStore();

  return (
    <button 
      onClick={openPanel} 
      className="relative text-link-color hover:text-text-color transition-colors"
    >
      <Icons.management className="w-6 h-6" />
      
      {/* Индикатор несохранённых изменений */}
      {hasUnsavedChanges && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      )}
    </button>
  );
};