// src/features/Settings/LanguageSwitcher.tsx
import { useLanguageStore, type Language } from "@/store/languageStore";
import { updateUserSettings } from "@/lib/api/authService";
import { SegmentedControl } from "@telegram-apps/telegram-ui";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore();

  const handleLangChange = async (newLang: string) => {
    const lang = newLang as Language;
    setLanguage(lang);
    try {
      await updateUserSettings({ appLanguageCode: lang });
    } catch (error) {
      console.error("Ошибка сохранения языка:", error);
    }
  };

  if (!language) return null;

  return (
    <div>
      <h3 className="mb-2 text-text-color">Язык</h3>
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