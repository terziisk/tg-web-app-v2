// src/app/AppLoader.tsx
import { LoadingSpinner } from '../components/LoadingSpinner';
import React from 'react';

const AppLoader: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#212121] text-white">
      <div className="text-center">
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default AppLoader;
