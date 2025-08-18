// src/app/Layout.tsx
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUiStore } from '../store/uiStore';

// Импортируем твои фичи и страницы
import { ProfileHeader } from '../features/ProfileHeader';
import { MainTabs } from '../features/MainTabs';
import { SettingsPanel } from '../features/settings/SettingsPanel';
import { SettingsButton } from '../features/settings/SettingsButton';

const Layout = () => {
  const { t } = useTranslation();
  const { activeTab } = useUiStore();

  // --- Заглушки с переводами ---
  const ManagementHeader = () => <div className="p-4 text-center text-xl font-bold">{t('management_header')}</div>;
  const AdvertiserHeader = () => <div className="p-4 text-center text-xl font-bold">{t('advertiser_header')}</div>;
  const ActivitiesPage = () => <div className="p-4"><h2 className="text-2xl font-bold">{t('activities_content')}</h2></div>;
  const ManagementPage = () => <div className="p-4"><h2 className="text-2xl font-bold">{t('management_content')}</h2></div>;
  const AdvertiserPage = () => <div className="p-4"><h2 className="text-2xl font-bold">{t('advertiser_content')}</h2></div>;

  // Логика выбора компонентов
  const headerComponents = useMemo(() => ({
    activities: <ProfileHeader />,
    management: <ManagementHeader />,
    advertiser: <AdvertiserHeader />,
  }), [t]); // Добавляем зависимость от t для обновления при смене языка

  const pageComponents = useMemo(() => ({
    activities: <ActivitiesPage />,
    management: <ManagementPage />,
    advertiser: <AdvertiserPage />,
  }), [t]); // Добавляем зависимость от t для обновления при смене языка

  return (
    <>
      <div className="relative">
        <header>{headerComponents[activeTab]}</header>
        <div className="absolute top-4 right-4 z-10">
          <SettingsButton />
        </div>
      </div>
      <MainTabs />
      <main>{pageComponents[activeTab]}</main>
      <SettingsPanel />
    </>
  );
};

export default Layout;