// src/init.tsx
import {
  init as initSDK,
  bindThemeParamsCssVars,
  restoreInitData,
  miniApp,
} from '@telegram-apps/sdk-react';

/**
 * Инициализирует SDK Telegram и связывает переменные темы.
 */
export async function init() {
  // Инициализируем основной SDK.
  initSDK();

  // Восстанавливаем данные запуска. Это делает их доступными
  // для хуков типа `useWebApp()` в компонентах.
  restoreInitData();
  
  // Эта функция — ключевая для темы. Она создает и автоматически
  // обновляет CSS-переменные (например, --tg-theme-bg-color)
  // на основе темы пользователя в Telegram.
  // Компоненты из @telegram-apps/telegram-ui будут их использовать.
   if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    bindThemeParamsCssVars();
  }
}