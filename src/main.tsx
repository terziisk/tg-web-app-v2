import "./sentry";  // <- ВСЕГДА ПЕРВЫМ
// src/main.tsx

// Сначала импортируем стили, чтобы наши кастомные стили могли их переопределять.
import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';


// Mock the environment in case, we are outside Telegram.
// СРАЗУ ПОСЛЕ СТИЛЕЙ ИМПОРТИРУЕМ НАШ МОК
// Это гарантирует, что он отработает до инициализации SDK.
import './mockEnv.ts';

import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react';

import App from './app/App';
import { init } from './init.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Запускаем инициализацию.
init().then(() => {
  // И только после того, как SDK настроен, мы рендерим React-приложение.
  
  root.render(
    // <StrictMode>
        <App />
    // </StrictMode>
    ,
  );
});