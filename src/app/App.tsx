// src/app/App.tsx

import { AppRoot } from '@telegram-apps/telegram-ui';
import Layout from './Layout';
import { AppInitializer } from './AppInitializer';

export default function App() {
  return (
    <AppRoot>
      <AppInitializer>
        <Layout />
      </AppInitializer>
    </AppRoot>
  );
}