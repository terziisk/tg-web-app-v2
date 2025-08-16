// src/lib/api/authService.ts

import axios from 'axios';
import apiClient from './apiClient';
import { type RetrieveLPResult } from "@telegram-apps/sdk-react"; // Используем утилиту из базового SDK

interface AuthResponse {
  accessToken: string;
}

// ✅ Создадим тип для данных, которые приходят с нашего бэкенда

export interface BackendProfile {
  user: UserPart;
  owner?: OwnerPart;
  advertiser?: AdvertiserPart;
  settings: Settings;
}

export interface Settings {
  languageCode: string;
  colorScheme: string;
}

export interface UserPart {
  id: string; // UUID в TypeScript обычно представляется как string
  telegramId: number;
  channels: unknown[];
  giveaways: unknown[];
}

export interface OwnerPart {
  channels: Channel[];
}

export interface AdvertiserPart {
  ads: string[]; 
}

export interface Channel {
  id: string; // UUID как string
  name: string;
  telegramUsername: string;
  stats: Record<string, unknown>;
  achievements: Record<string, unknown>;
  level: number;
  posts: unknown[];
  giveaways: unknown[];
}
/**
 * Собирает все данные о пользователе и устройстве и отправляет на бэкенд для аутентификации.
 * @param initDataRaw - Сырая строка initData из useRawLaunchParams().
 * @returns Промис с токенами доступа.
 */
export async function authenticateUser(
  initDataRaw: string,
  launchParams: RetrieveLPResult
): Promise<AuthResponse> {
  console.log("Собираем данные для отправки на бэкенд...");

  // Используем глобальный объект, как и предлагает документация Telegram для таких данных
  // const webApp = window.Telegram.WebApp;
  // Распарсим параметры на клиенте, чтобы получить startParam
  // const launchParams = retrieveLaunchParams();

  const payload = {
    initDataRaw: initDataRaw, // Самая важная строка для валидации
    telegramContext: {
      platform: launchParams.tgWebAppPlatform,
      appVersion: launchParams.tgWebAppVersion,
      //colorScheme: webApp.colorScheme,
      startParam: launchParams.tgWebAppStartParam,
    },
    deviceContext: {
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezoneOffset: new Date().getTimezoneOffset(),
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio,
      },
    },
  };

  console.log("Отправляемый payload:", payload);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка для теста

// ✅ Для запроса на логин используем "чистый" axios, чтобы избежать рекурсии в перехватчике
  const response = await axios.post<AuthResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`, 
    payload
  );
  console.log("Ответ от бэкенда /login:", response.data);
  return response.data;
}

// ✅ НОВЫЙ МЕТОД для проверки токена и получения данных
export async function verifyAndFetchUser(): Promise<BackendProfile> {
  // Этот эндпоинт должен быть защищен JWT на бэкенде
  const response = await apiClient.get<BackendProfile>('/users/me');

  console.log("Ответ от бэкенда /me:", response.data);
  return response.data;
}