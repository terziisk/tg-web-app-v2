// src/init.tsx
import {
  init as initSDK,
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
  
  // Ключевое изменение: мы больше НЕ вызываем bindThemeParamsCssVars(),
  // чтобы взять управление темой на себя в компоненте App.tsx
  
   if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
  }
}
