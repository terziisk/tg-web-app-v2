// src/lib/api/apiClient.ts
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../store/authStore';
import { retrieveLaunchParams, retrieveRawInitData } from '@telegram-apps/sdk-react';
import { authenticateUser } from './authService';

interface QueuedRequestCallbacks {
  onSuccess: (token: string) => void;
  onFailure: (error: Error) => void;
}

// Переменные для управления процессом обновления токена
let isRefreshing = false;
let failedQueue: QueuedRequestCallbacks[] = [];

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

// Перехватчик запросов
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Не добавляем токен к запросу на логин
    if (config.url?.endsWith('/auth/login')) {
      return config;
    }

    const { accessToken, login, logout } = useAuthStore.getState();

    if (!accessToken) {
      console.warn("⚠️ Нет токена для запроса");
      return config;
    }

    // Проверяем срок жизни токена (добавляем буфер в 30 секунд)
    const decodedToken = jwtDecode<{ exp: number }>(accessToken);
    const bufferTime = 30 * 1000; // 30 секунд в миллисекундах
    const isExpired = (decodedToken.exp * 1000) < (Date.now() + bufferTime);

    if (!isExpired) {
      // Если токен валиден, просто добавляем его и выполняем запрос
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    console.log("🔄 Токен истекает, начинаем обновление...");

    // Если уже идет процесс обновления, ставим текущий запрос в очередь
    if (isRefreshing) {
      console.log("⏳ Процесс обновления уже идет, добавляем запрос в очередь");
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
    console.log("🔑 Начинаем процесс обновления токена...");

    try {
      // Получаем свежие данные для ре-аутентификации
      const launchParams = retrieveLaunchParams();
      const rawInitData = await retrieveRawInitData();

      if (!rawInitData) {
        throw new Error("Не удалось получить initData для обновления токена.");
      }
      
      const { accessToken: newAccessToken } = await authenticateUser(rawInitData, launchParams);
      const { user, profile } = useAuthStore.getState();

      // Обновляем данные в сторе
      login(newAccessToken, user, profile);
      
      // Добавляем новый токен в текущий запрос
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      
      console.log("✅ Токен успешно обновлен");
      
      // Выполняем все запросы из очереди с новым токеном
      processQueue(null, newAccessToken);
      return config;
    } catch (error) {
      console.error("❌ Ошибка обновления токена:", error);
      processQueue(error as Error, null);
      logout();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Упрощенный перехватчик ответов
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Только логируем 401 ошибки, не предпринимаем действий
    // (так как обновление токена должно происходить в request interceptor)
    if (error.response?.status === 401) {
      console.warn("⚠️ Получен 401 ответ:", error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default apiClient;