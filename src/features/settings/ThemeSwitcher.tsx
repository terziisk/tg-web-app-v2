
// src/features/Settings/ThemeSwitcher.tsx
import React from 'react';
import { useUiStore, type ColorScheme } from '@/store/uiStore';
import { updateUserSettings } from '@/lib/api/authService';
import { SegmentedControl } from '@telegram-apps/telegram-ui';

export const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useUiStore();

   const handleThemeChange = async (newScheme: ColorScheme) => {
    // 1. Оптимистично обновляем UI
    setColorScheme(newScheme);
    try {
      // 2. Отправляем изменение на бэкенд
      await updateUserSettings({ appColorScheme: newScheme });
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
      // TODO: Можно показать уведомление об ошибке и откатить изменение
    }
  };
  
  if (!colorScheme) return null; // Не показываем, пока тема не загружена

  return (
    <div>
      <h3 className="mb-2 text-text-color">Тема оформления</h3>
      <SegmentedControl
        // Важно: key нужен, чтобы React пересоздал компонент при смене значения извне
        key={colorScheme} 
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