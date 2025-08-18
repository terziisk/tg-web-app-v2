/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Сканировать все файлы в папке src
  ],

  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        'tg-bg': 'var(--tg-theme-bg-color)',
        'tg-text': 'var(--tg-theme-text-color)',
        'tg-hint': 'var(--tg-theme-hint-color)',
        'tg-link': 'var(--tg-theme-link-color)',
        'tg-button': 'var(--tg-theme-button-color)',
        'tg-button-text': 'var(--tg-theme-button-text-color)',
        'tg-secondary-bg': 'var(--tg-theme-secondary-bg-color)',
        'tg-header-bg': 'var(--tg-theme-header-bg-color)',
        'tg-accent-text': 'var(--tg-theme-accent-text-color)',
        'tg-section-bg': 'var(--tg-theme-section-bg-color)',
        'tg-destructive-text': 'var(--tg-theme-destructive-text-color)',
        'tg-subtitle-text': 'var(--tg-theme-subtitle-text-color)',
      },
    },
  },
  plugins: [],
}