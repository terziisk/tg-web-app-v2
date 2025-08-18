// src/app/App.tsx

import { AppRoot } from '@telegram-apps/telegram-ui';
import Layout from './Layout';
import { AppInitializer } from './AppInitializer';
import { useSettingsStore } from '../store/settingsStore';
import { useEffect } from 'react';
import { miniApp } from '@telegram-apps/sdk-react';

// Определяем цветовые палитры для тем
const lightTheme = {
  '--tg-theme-bg-color': '#ffffff',
  '--tg-theme-section-bg-color': '#ffffff',
  '--tg-theme-secondary-bg-color': '#f0f0f0',
  '--tg-theme-text-color': '#222222',
  '--tg-theme-hint-color': '#a8a8a8',
  '--tg-theme-link-color': '#17a393',
  '--tg-theme-button-color': '#37c4b5',
  '--tg-theme-button-text-color': '#ffffff',
  '--tg-theme-header-bg-color': '#408b85',
  '--tg-theme-accent-text-color': '#09b79f',
  '--tg-theme-section-header-text-color': '#10b096',
  '--tg-theme-subtitle-text-color': '#898f8e',
  '--tg-theme-destructive-text-color': '#cc2929',
  '--tg-theme-section-separator-color': '#d9d9d9',
  '--tg-theme-bottom-bar-bg-color': '#f0f0f0',
};

const darkTheme = {
  '--tg-theme-bg-color': '#213035',
  '--tg-theme-section-bg-color': '#1d292e',
  '--tg-theme-secondary-bg-color': '#152023',
  '--tg-theme-text-color': '#ffffff',
  '--tg-theme-hint-color': '#7b8d92',
  '--tg-theme-link-color': '#63b7c4',
  '--tg-theme-button-color': '#59bccd',
  '--tg-theme-button-text-color': '#ffffff',
  '--tg-theme-header-bg-color': '#242f34',
  '--tg-theme-accent-text-color': '#69c2d0',
  '--tg-theme-section-header-text-color': '#7acedc',
  '--tg-theme-subtitle-text-color': '#7b888a',
  '--tg-theme-destructive-text-color': '#ee686f',
  '--tg-theme-section-separator-color': '#0d1316',
  '--tg-theme-bottom-bar-bg-color': '#152023',
};


export default function App() {
  const { colorScheme } = useSettingsStore();

  useEffect(() => {
    if (colorScheme) {
      const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
      
      // 1. Устанавливаем CSS переменные для нашего приложения
      for (const key in theme) {
        document.documentElement.style.setProperty(key, theme[key as keyof typeof theme]);
      }

      // 2. Сообщаем клиенту Telegram изменить его UI
      miniApp.setHeaderColor(theme['--tg-theme-header-bg-color']);
      miniApp.setBackgroundColor(theme['--tg-theme-bg-color']);

      // 3. Управляем классом `dark` на `<html>` для TailwindCSS
      if (colorScheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [colorScheme]);

  return (
    <AppRoot appearance={colorScheme || 'light'}>
      <AppInitializer>
        <Layout />
      </AppInitializer>
    </AppRoot>
  );
}