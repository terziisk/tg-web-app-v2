// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User as TelegramUser } from '@telegram-apps/sdk-react';
import { type BackendProfile } from '../lib/api/authService';

type PersistedAuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

interface AuthState extends PersistedAuthState {
  isLoading: boolean;
  user: TelegramUser | null;
  profile: BackendProfile | null;
  login: (accessToken: string, user: TelegramUser | null, profile: BackendProfile | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      accessToken: null,
      user: null,
      profile: null,
      isLoading: true,
      isAuthenticated: false,

      login: (accessToken, user, profile) => {
        console.log("🔐 Выполняем логин с токеном:", accessToken ? "есть" : "нет");
        set({
          accessToken,
          user,
          profile,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        console.log("🚪 Выполняем выход");
        set({
          accessToken: null,
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: true, // После выхода снова включаем загрузку
        });
      },

      setLoading: (loading) => {
        const currentLoading = get().isLoading;
        if (currentLoading !== loading) {
          console.log("⏳ Изменяем состояние загрузки:", loading);
          set({ isLoading: loading });
        }
      },
    }),
    {
      name: "auth-storage",
      // Сохраняем только токен и статус аутентификации
      partialize: (state) => ({ 
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
      
      // Правильная инициализация после восстановления из localStorage
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("💾 Ошибка при восстановлении состояния:", error);
          return;
        }
        
        console.log("💾 Восстанавливаем состояние из localStorage:", {
          hasToken: !!state?.accessToken,
          isAuthenticated: state?.isAuthenticated
        });

        // КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: устанавливаем isLoading в зависимости от того, 
        // есть ли у нас токен и аутентифицированы ли мы
        if (state && state.isAuthenticated && state.accessToken) {
          // Если есть токен и мы аутентифицированы, но нужно будет проверить токен
          state.isLoading = true; // Оставляем true, чтобы AppInitializer мог корректно обработать
        } else if (state) {
          // Если нет токена или не аутентифицированы, все равно нужна инициализация
          state.isLoading = true;
          state.isAuthenticated = false; // На всякий случай сбрасываем флаг
        }
      },
    }
  )
);