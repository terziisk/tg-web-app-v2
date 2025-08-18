// src/app/AppInitializer.tsx
import { useEffect, useRef } from "react";
import { useLaunchParams, useRawInitData } from "@telegram-apps/sdk-react";
import { useAuthStore } from "../store/authStore";
import { authenticateUser, verifyAndFetchUser } from "../lib/api/authService";
import { useSettingsStore, type ColorScheme, type Language } from "@/store/settingsStore";
import AppLoader from "./AppLoader";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, login, logout, setLoading, isLoading, isAuthenticated } = useAuthStore();
  const { initializeSettings } = useSettingsStore();
  const launchParams = useLaunchParams();
  const user = launchParams.tgWebAppData?.user;
  const rawInitData = useRawInitData();
  
  // Флаг для предотвращения повторных запусков
  const initializationStarted = useRef(false);

  useEffect(() => {
    // Если уже аутентифицированы или инициализация уже началась, не запускаем повторно
    if (isAuthenticated || initializationStarted.current) {
      console.log("⏭️ Пропускаем инициализацию: уже аутентифицированы или инициализация в процессе");
      return;
    }

    // Ждем, пока SDK будет готов
    if (!rawInitData || !user) {
      console.log("⏳ Ждем готовности SDK...");
      return;
    }

    console.log("🚀 Запускаем инициализацию приложения");
    initializationStarted.current = true;

    const startup = async () => {
      try {
        // Получаем начальные настройки из Telegram
        const tgLanguage = (user as { languageCode?: string })?.languageCode;
        const tgColorScheme = launchParams.tgWebAppThemeParams?.bg_color ? 
          (launchParams.tgWebAppThemeParams.bg_color === '#ffffff' ? 'light' : 'dark') : 'dark';

        const initialLanguage: Language = tgLanguage === 'ru' ? 'ru' : 'en';
        const initialColorScheme: ColorScheme = tgColorScheme as ColorScheme;

        // Если токен есть, проверяем его валидность
        if (accessToken) {
          try {
            console.log("🔍 Проверяем существующий токен...");
            const backendData = await verifyAndFetchUser();
            
            // Инициализируем настройки из бэкенда
            const backendLanguage = backendData.settings.languageCode as Language || initialLanguage;
            const backendColorScheme = backendData.settings.colorScheme as ColorScheme || initialColorScheme;
            
            initializeSettings(backendLanguage, backendColorScheme);
            login(accessToken, user, backendData);
            console.log("✅ Токен валиден, данные загружены");
            return;
          } catch (error) {
            console.warn("⚠️ Токен невалиден, выполняем выход:", error);
            logout();
          }
        }

        // Новая аутентификация
        console.log("🔑 Выполняем новую аутентификацию...");
        
        // Временно инициализируем настройки из Telegram
        initializeSettings(initialLanguage, initialColorScheme);
        
        const authData = await authenticateUser(rawInitData, launchParams);
        
        // Сначала логинимся с токеном
        login(authData.accessToken, user, null);
        
        // Затем получаем данные профиля
        const backendData = await verifyAndFetchUser();
        
        // Обновляем настройки данными из бэкенда
        const backendLanguage = backendData.settings.languageCode as Language || initialLanguage;
        const backendColorScheme = backendData.settings.colorScheme as ColorScheme || initialColorScheme;
        
        initializeSettings(backendLanguage, backendColorScheme);
        login(authData.accessToken, user, backendData);
        
        console.log("✅ Успешная аутентификация и загрузка данных");
      } catch (error) {
        console.error("❌ Ошибка инициализации:", error);
        // В случае ошибки все равно инициализируем базовые настройки
        const initialLanguage: Language = (user as { languageCode?: string })?.languageCode === 'ru' ? 'ru' : 'en';
        const initialColorScheme: ColorScheme = 'dark';
        initializeSettings(initialLanguage, initialColorScheme);
        setLoading(false);
      } finally {
        initializationStarted.current = false;
      }
    };

    startup();
  }, [
    // Убираем лишние зависимости, оставляем только критически важные
    rawInitData, 
    user?.id, // Только ID пользователя, чтобы не реагировать на изменения объекта
    isAuthenticated // Добавляем, чтобы не запускать если уже аутентифицированы
  ]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  return <>{children}</>;
};