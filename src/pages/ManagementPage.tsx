// src/pages/ManagementPage.tsx
import { useTranslation } from "react-i18next";
//

// import { useLaunchParams, useRawInitData, isColorDark, isRGB, switchInlineQuery } from "@telegram-apps/sdk-react";

const ManagementPage = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    // if (window.Telegram?.WebApp) {
    //   window.Telegram.WebApp.switchInlineQuery('some_query', ['channels']);
    // } else {
    //   console.warn("Telegram WebApp not available");
    //   // Опционально: fallback, например, alert("Эта функция доступна только в Telegram Mini App");
    // }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{t("management_content")}</h2>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleClick}
      >
        Нажми меня
      </button>
    </div>
  );
};

export default ManagementPage;