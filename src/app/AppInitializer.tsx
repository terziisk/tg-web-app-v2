// src/app/AppInitializer.tsx
import { useEffect } from 'react';
import { useLaunchParams, useRawInitData } from '@telegram-apps/sdk-react';
import { useAuthStore } from '../store/authStore';
import { authenticateUser, verifyAndFetchUser } from '../lib/api/authService';
import AppLoader from './AppLoader';

// Этот компонент-обертка будет управлять всем процессом загрузки
export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, login, logout, setLoading, isLoading } = useAuthStore();
  const launchParams = useLaunchParams();
  console.log("🚀 Запущен AppInitializer с launchParams:", launchParams);
  const user = launchParams.tgWebAppData?.user;
  const rawInitData = useRawInitData();

  useEffect(() => {
    const startup = async () => {
        
      // Ждем, пока SDK будет готов
      if (!rawInitData || !user) {
        return;
      }

      // Если токен есть, сначала проверим его валидность
      if (accessToken) {
        try {
          console.log('Проверяем существующий токен...');
          // Пытаемся получить данные пользователя с бэкенда
          const backendData = await verifyAndFetchUser();
          // Если успешно, обновляем данные в сторе и завершаем загрузку
          login(accessToken, user, backendData);
          return;
        } catch (error) {
          console.warn('Токен невалиден или истек. Выполняем выход...', error);
          // Если токен невалиден (сервер вернул 401), выходим и начинаем заново
          logout();
          // Не выходим из функции, позволяя ей перейти к логике логина
        }
      }

      // Если мы здесь, значит токена нет или он был невалиден
      try {
        console.log('Токена нет. Запускаем новую аутентификацию...');
          // 1. Получаем токен
        const authData = await authenticateUser(rawInitData, launchParams);

        // 2. СРАЗУ ЖЕ сохраняем его в стор. Профиль пока null.
        login(authData.accessToken, user, null);
        // После успешного логина, сразу запрашиваем данные профиля
        const backendData = await verifyAndFetchUser();

        login(authData.accessToken, user, backendData);
        console.log('✅ Успешная аутентификация и получение данных.');
      } catch (error) {
        console.error('❌ Ошибка полной аутентификации:', error);
        setLoading(false); // Выключаем загрузчик в случае ошибки
      }
    };

    startup();
  }, [rawInitData, user, accessToken, login, logout, setLoading, launchParams]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <AppLoader />
      </div>
    );
  }

  return <>{children}</>;
};