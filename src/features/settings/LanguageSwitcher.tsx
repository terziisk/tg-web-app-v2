// src/features/settings/LanguageSwitcher.tsx
import { useSettingsStore, type Language } from '@/store/settingsStore';
import { SegmentedControl } from '@telegram-apps/telegram-ui';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useSettingsStore();

  const handleLangChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  if (!language) return null;

  return (
    <div>
      <h3 className="mb-3 text-text-color font-medium">Язык</h3>
      <SegmentedControl
        key={language}
        defaultValue={language}
        onChange={(event: React.FormEvent<HTMLDivElement>) => {
          const value = (event.target as HTMLInputElement).value as Language;
          handleLangChange(value);
        }}
      >
        <SegmentedControl.Item value="ru">Русский</SegmentedControl.Item>
        <SegmentedControl.Item value="en">English</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
};