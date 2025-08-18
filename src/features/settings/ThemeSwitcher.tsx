// src/features/settings/ThemeSwitcher.tsx
import { useSettingsStore, type ColorScheme } from '@/store/settingsStore';
import { SegmentedControl } from '@telegram-apps/telegram-ui';

export const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useSettingsStore();

  const handleThemeChange = (newScheme: ColorScheme) => {
    setColorScheme(newScheme);
  };
  
  if (!colorScheme) return null; // Не показываем, пока тема не загружена

  return (
    <div>
      <h3 className="mb-3 text-text-color font-medium">Тема оформления</h3>
      <SegmentedControl
        key={colorScheme} // Важно для корректного отображения
        defaultValue={colorScheme}
        onChange={(event: React.FormEvent<HTMLDivElement>) => {
          const value = (event.target as HTMLInputElement).value as ColorScheme;
          handleThemeChange(value);
        }}
      >
        <SegmentedControl.Item value="light">Светлая</SegmentedControl.Item>
        <SegmentedControl.Item value="dark">Тёмная</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
};