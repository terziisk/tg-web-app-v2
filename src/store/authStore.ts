// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type User as TelegramUser } from '@telegram-apps/sdk-react'; // Импортируем готовый тип
import { type BackendProfile } from '../lib/api/authService'; // Импортируем наш тип


type PersistedAuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

interface AuthState extends PersistedAuthState {
  isLoading: boolean;
  user: TelegramUser | null; // Для данных из initData
  profile: BackendProfile | null; // Для данных с нашего бэкенда
  login: (accessToken: string, user: TelegramUser | null, profile: BackendProfile | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}



export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      user: null,
      profile: null, // Начальное значение
      isLoading: true,
      isAuthenticated: false,

      
      login: (accessToken, user, profile) => {
        set({
          accessToken,
          user,
          profile,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      logout: () => {
        set({
          accessToken: null,
          user: null,
          profile: null,
          isAuthenticated: false,
        });
      },
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      // В localStorage сохраняем только токен. Данные всегда будем грузить свежие.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      partialize: (state) => ({ accessToken: state.accessToken } as any),
    }
  )
);