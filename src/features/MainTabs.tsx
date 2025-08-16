// src/features/MainTabs.tsx
import { useUiStore, type Tab } from '../store/uiStore';
import clsx from 'clsx'; // Утилита для условного соединения классов

const TABS: { id: Tab; label: string }[] = [
  { id: 'activities', label: 'Мои активности' },
  { id: 'management', label: 'Управление' },
  { id: 'advertiser', label: 'Рекламодателю' },
];

export const MainTabs = () => {
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
          {tab.label}
        </button>
      ))}
    </nav>
  );
};