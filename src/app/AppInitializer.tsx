// src/app/AppInitializer.tsx
import { useEffect, useRef } from "react";
import { useLaunchParams, useRawInitData, isColorDark, isRGB } from "@telegram-apps/sdk-react";
import { useAuthStore } from "../store/authStore";
import { authenticateUser, verifyAndFetchUser } from "../lib/api/authService";
import { useSettingsStore, type ColorScheme, type Language } from "../store/settingsStore";
import AppLoader from "./AppLoader";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, login, logout, setLoading, isLoading, profile } = useAuthStore();
  const { initializeSettings } = useSettingsStore();
  const launchParams = useLaunchParams();
  const user = launchParams.tgWebAppData?.user;
  const rawInitData = useRawInitData();
  
  // Флаг для предотвращения повторных запусков
  const initializationStarted = useRef(false);

  useEffect(() => {
    // Если инициализация уже началась, не запускаем повторно
    if (initializationStarted.current) {
      console.log("⏭️ Пропускаем инициализацию: инициализация уже в процессе");
      return;
    }

    // Ждем, пока SDK будет готов
    if (!rawInitData || !user) {
      console.log("⏳ Ждем готовности SDK...");
      return;
    }

    // Проверяем, нужна ли нам инициализация:
    // 1. Если нет токена - точно нужна
    // 2. Если есть токен, но нет профиля - нужна (случай перезагрузки страницы)
    // 3. Если есть и токен, и профиль - не нужна
    const needsInitialization = !accessToken || !profile;
    
    if (!needsInitialization) {
      console.log("⏭️ Инициализация не нужна: токен и профиль уже загружены");
      setLoading(false);
      return;
    }

    console.log("🚀 Запускаем инициализацию приложения", {
      hasToken: !!accessToken,
      hasProfile: !!profile,
      reason: !accessToken ? "нет токена" : "нет профиля"
    });
    
    initializationStarted.current = true;

    const startup = async () => {
      try {
        // Получаем начальные настройки из Telegram
        const tgLanguage = (user as { languageCode?: string })?.languageCode;
        
        let tgColorScheme: ColorScheme = 'light'; // Default to light
        const bgColor = launchParams.tgWebAppThemeParams?.bg_color;
        if (bgColor && isRGB(bgColor) && isColorDark(bgColor)) {
          tgColorScheme = 'dark';
        }

        const initialLanguage: Language = tgLanguage === 'ru' ? 'ru' : 'en';
        const initialColorScheme: ColorScheme = tgColorScheme;

        console.log("🎨 Начальные настройки из Telegram:", { 
          tgLanguage, 
          tgColorScheme, 
          initialLanguage, 
          initialColorScheme 
        });

        // Если токен есть, проверяем его валидность
        if (accessToken) {
          try {
            console.log("🔍 Проверяем существующий токен...");
            const backendData = await verifyAndFetchUser();
            
            // Инициализируем настройки из бэкенда
            const backendLanguage = backendData.settings.languageCode as Language || initialLanguage;
            const backendColorScheme = backendData.settings.colorScheme as ColorScheme || initialColorScheme;
            
            console.log("🎨 Настройки из бэкенда:", { 
              backendLanguage, 
              backendColorScheme,
              backendSettings: backendData.settings
            });
            
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
        
        // Обновляем данные из бэкенда
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
    accessToken, // Добавляем токен как зависимость
    profile // Добавляем профиль как зависимость
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