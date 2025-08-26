// src/app/Layout.tsx
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUiStore } from '../store/uiStore';
import { useAuthStore } from '../store/authStore';
import { backButton } from '@telegram-apps/sdk-react';

// Импортируем твои фичи и страницы
import { ProfileHeader } from '../features/ProfileHeader';
import ManagementHeader from '../features/ManagementHeader';
import ManagementPage from '../pages/ManagementPage';
import { MainTabs } from '../features/MainTabs';
import { SettingsPanel } from '../features/settings/SettingsPanel';
import { SettingsButton } from '../features/settings/SettingsButton';
import ChannelOwnerCarousel from '../features/carousel/ChannelOwnerCarousel';
import AdvertiserCarousel from '../features/carousel/AdvertiserCarousel';

const Layout = () => {
  const { t } = useTranslation();
   const { activeTab, setActiveTab } = useUiStore();
  const { profile } = useAuthStore();

  const showManagementOnboarding = activeTab === 'management' && !profile?.owner;
  const showAdvertiserOnboarding = activeTab === 'advertiser' && !profile?.advertiser;

  // --- Заглушки с переводами ---
  const AdvertiserHeader = () => <div className="p-4 text-center text-xl font-bold">{t('advertiser_header')}</div>;
  const ActivitiesPage = () => <div className="p-4"><h2 className="text-2xl font-bold">{t('activities_content')}</h2></div>;
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

  
  
  useEffect(() => {
    console.log("showManagementOnboarding = ", showManagementOnboarding);
    console.log("showAdvertiserOnboarding = ", showAdvertiserOnboarding);
    if (showManagementOnboarding || showAdvertiserOnboarding) {
      const handleBackClick = () => {
        setActiveTab("activities");
      };

      try {
        console.log("Back button is supported ", backButton.isSupported());
        console.log("Back button is mounted ", backButton.isMounted());

        backButton.mount();
        backButton.show();
        const offClick = backButton.onClick(handleBackClick);

        return () => {
          offClick();
          backButton.hide();
          backButton.unmount();
        };
      } catch (error) {
        console.error("Error handling back button:", error);
        return;
      }
    }
  }, [showManagementOnboarding, showAdvertiserOnboarding, setActiveTab]);
  
 
  const handleStartAdvertising = () => {
    // TODO: Implement start advertising flow
    console.log("Start advertising button clicked");
  };
  
  const handleAddChannel = () => {
    // TODO: Implement add channel flow
    console.log("Add channel button clicked");
  };

  if (showManagementOnboarding) {
    return <ChannelOwnerCarousel onStart={handleAddChannel} />;
  }
  if (showAdvertiserOnboarding) {
    return <AdvertiserCarousel onStart={handleStartAdvertising} />;
  }

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