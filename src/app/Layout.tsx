// src/app/Layout.tsx
import { useMemo } from 'react';
import { useUiStore } from '../store/uiStore';

// Импортируем твои фичи и страницы
import { ProfileHeader } from '../features/ProfileHeader';
import { MainTabs } from '../features/MainTabs';
import { SettingsPanel } from '../features/settings/SettingsPanel';

// --- Заглушки ---
const ManagementHeader = () => <div className="p-4 text-center text-xl font-bold">Управление</div>;
const AdvertiserHeader = () => <div className="p-4 text-center text-xl font-bold">Рекламодателю</div>;
const ActivitiesPage = () => <div className="p-4">Контент страницы "Мои активности"</div>;
const ManagementPage = () => <div className="p-4">Контент страницы "Управление"</div>;
const AdvertiserPage = () => <div className="p-4">Контент страницы "Рекламодателю"</div>;
// ---

const Layout = () => {
  const { activeTab } = useUiStore();

  // Логика выбора компонентов остается той же
  const headerComponents = useMemo(() => ({
    activities: <ProfileHeader />,
    management: <ManagementHeader />,
    advertiser: <AdvertiserHeader />,
  }), []); // Зависимости больше не нужны, activeTab не влияет на рендер этих компонентов

  const pageComponents = useMemo(() => ({
    activities: <ActivitiesPage />,
    management: <ManagementPage />,
    advertiser: <AdvertiserPage />,
  }), []);

  // ВСЯ СЛОЖНАЯ ЛОГИКА useEffect УДАЛЕНА!

  return (
    <>
      <header>{headerComponents[activeTab]}</header>
      <MainTabs />
      <main>{pageComponents[activeTab]}</main>
      <SettingsPanel />
    </>
  );
};

export default Layout;