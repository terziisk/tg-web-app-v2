// src/types/telegram.d.ts

// Основные типы из документации Telegram WebApp
interface WebAppInitData {
  query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: WebAppChat;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

interface WebAppChat {
  id: number;
  type: string;
  title: string;
  username?: string;
  photo_url?: string;
}

interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

// Интерфейс для Telegram.WebApp
interface WebApp {
  initData: string;
  initDataUnsafe: WebAppInitData;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: ThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: BackButton;
  MainButton: MainButton;
  HapticFeedback: HapticFeedback;
  CloudStorage: CloudStorage;
  BiometricManager: BiometricManager;

  ready(): void;
  expand(): void;
  close(): void;
  switchInlineQuery(query: string, chooseChatTypes?: string[]): void;
  // Другие методы (добавьте по необходимости из документации)
  onEvent(eventType: string, callback: () => void): void;
  offEvent(eventType: string, callback: () => void): void;
  // ... (полный список методов см. в документации)
}

// Дополнительные интерфейсы (для полноты, если используете)
interface BackButton {
  isVisible: boolean;
  onClick(callback: () => void): BackButton;
  offClick(callback: () => void): BackButton;
  show(): BackButton;
  hide(): BackButton;
}

interface MainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  setText(text: string): MainButton;
  onClick(callback: () => void): MainButton;
  offClick(callback: () => void): MainButton;
  show(): MainButton;
  hide(): MainButton;
  enable(): MainButton;
  disable(): MainButton;
  showProgress(leaveActive?: boolean): MainButton;
  hideProgress(): MainButton;
  setParams(params: MainButtonParams): MainButton;
}

interface MainButtonParams {
  text?: string;
  color?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
}

interface HapticFeedback {
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): HapticFeedback;
  notificationOccurred(type: 'error' | 'success' | 'warning'): HapticFeedback;
  selectionChanged(): HapticFeedback;
}

interface CloudStorage {
  setItem(key: string, value: string, callback?: (error: Error | null, result?: boolean) => void): CloudStorage;
  getItem(key: string, callback: (error: Error | null, result?: string) => void): CloudStorage;
  getItems(keys: string[], callback: (error: Error | null, result?: Record<string, string>) => void): CloudStorage;
  removeItem(key: string, callback?: (error: Error | null, result?: boolean) => void): CloudStorage;
  removeItems(keys: string[], callback?: (error: Error | null, result?: boolean) => void): CloudStorage;
  getKeys(callback: (error: Error | null, result?: string[]) => void): CloudStorage;
}

interface BiometricManager {
  isInited: boolean;
  isBiometricAvailable: boolean;
  biometricType: 'finger' | 'face' | 'unknown';
  isAccessGranted: boolean;
  isAccessRequested: boolean;
  isBiometricTokenSaved: boolean;
  deviceId: string;
  init(callback?: () => void): BiometricManager;
  requestAccess(params: { reason?: string }, callback: (error: Error | null, granted: boolean) => void): BiometricManager;
  authenticate(params: { reason?: string }, callback: (error: Error | null, success: boolean, token?: string) => void): BiometricManager;
  updateBiometricToken(token: string, callback: (error: Error | null, success: boolean) => void): BiometricManager;
  openSettings(): BiometricManager;
}

// Глобальное расширение Window
declare global {
  interface Window {
    Telegram: {
      WebApp: WebApp;
    };
  }
}