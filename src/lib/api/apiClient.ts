// src/lib/api/apiClient.ts
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../store/authStore';
import { retrieveLaunchParams, retrieveRawInitData } from '@telegram-apps/sdk-react';
import { authenticateUser } from './authService';


// ✅ Определяем новый, более надежный тип для нашей очереди
interface QueuedRequestCallbacks {
  onSuccess: (token: string) => void;
  onFailure: (error: Error) => void;
}


// Переменные для управления процессом обновления токена
let isRefreshing = false;
// ✅ Очередь теперь хранит объекты с двумя колбэками
let failedQueue: QueuedRequestCallbacks[] = [];

// ✅ Обновляем логику обработки очереди
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(callbacks => {
    if (error) {
      callbacks.onFailure(error);
    } else {
      callbacks.onSuccess(token!);
    }
  });
  failedQueue = [];
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});



// ▼▼▼ ОБНОВЛЕННЫЙ ПЕРЕХВАТЧИК ЗАПРОСОВ ▼▼▼
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Не добавляем токен к запросу на логин
    if (config.url?.endsWith('/auth/login')) {
      return config;
    }

    const { accessToken, login, logout } = useAuthStore.getState();

    if (!accessToken) {
      console.warn("Нет токена для запроса");
      // Можно либо реджектить, либо позволить пройти, чтобы бэкенд вернул 401
      return config;
    }

    // Проверяем срок жизни токена
    const decodedToken = jwtDecode<{ exp: number }>(accessToken);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (!isExpired) {
      // Если токен валиден, просто добавляем его и выполняем запрос
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    console.log("Токен истек. Начинаем процесс обновления.... Время жизни токена: ", new Date(decodedToken.exp * 1000).toLocaleString());
    console.log("Текущая дата: ", Date.now());
    console.log("Из токена: ",  decodedToken.exp * 1000);

    // Если уже идет процесс обновления, ставим текущий запрос в очередь
    if (isRefreshing) {
     // ✅ Теперь мы возвращаем промис, который правильно обрабатывает и успех, и ошибку
      return new Promise((resolve, reject) => {
        failedQueue.push({
          onSuccess: (token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          },
          onFailure: (error: Error) => {
            reject(error);
          },
        });
      });
    }

    // Начинаем процесс обновления
    isRefreshing = true;

    try {
      // Получаем свежие данные для ре-аутентификации
      const launchParams = retrieveLaunchParams();
      const rawInitData = await retrieveRawInitData();

      if (!rawInitData) {
        throw new Error("Не удалось получить initData для обновления токена.");
      }
      
      const { accessToken: newAccessToken } = await authenticateUser(rawInitData, launchParams);
      const { user, profile } = useAuthStore.getState(); // Берем текущего юзера
      // Важно: в authService функция authenticateUser должна вызывать apiClient.post,
      // но для самого запроса на логин токен не нужен. Наш if в начале это обрабатывает.

       // Обновляем данные в сторе
      // Вызываем login с обновленным токеном и старыми данными пользователя/профиля
      login(newAccessToken, user, profile);
      
      
      
      // Добавляем новый токен в текущий запрос
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      
      console.log("Токен успешно обновлен.");
      // Выполняем все запросы из очереди с новым токеном
      processQueue(null, newAccessToken);
      return config;
     
      
    
    } catch (error) {
      console.error("❌ Ошибка обновления токена:", error);
      processQueue(error as Error, null);
      logout(); // Если обновить не удалось - разлогиниваем пользователя
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Перехватчик ответов можно оставить для обработки 401 в крайних случаях
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
       console.error("Получен 401, который не был обработан при обновлении токена. Выполняется выход.");
       useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;