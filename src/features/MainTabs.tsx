// src/features/MainTabs.tsx
import { useTranslation } from 'react-i18next';
import { useUiStore, type Tab } from '../store/uiStore';
import clsx from 'clsx';

const TABS: { id: Tab; labelKey: string }[] = [
  { id: 'activities', labelKey: 'my_activities' },
  { id: 'management', labelKey: 'management' },
  { id: 'advertiser', labelKey: 'advertiser' },
];

export const MainTabs = () => {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useUiStore();

  return (
    <nav className="flex justify-around border-b border-gray-700">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={clsx(
            'flex-1 py-3 text-center font-medium transition-colors',
            activeTab === tab.id
              ? 'border-b-2 border-blue-500 text-blue-400'
              : 'text-gray-400 hover:bg-white/5'
          )}
        >
          {t(tab.labelKey)}
        </button>
      ))}
    </nav>
  );
};