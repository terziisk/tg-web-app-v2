// src/features/Settings/SettingsButton.tsx
import { useSettingsStore } from '@/store/settingsStore'; 

export const SettingsButton = () => {
  const { togglePanel } = useSettingsStore();

  return (
    <button onClick={togglePanel} className="text-link-color">
       <span className="material-icons">settings</span>
    </button>
  );
};