// src/features/ProfileHeader.tsx
import { useAuthStore } from "../store/authStore";
import { SettingsButton } from './settings/SettingsButton';

export const ProfileHeader = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        {user?.photo_url && (
          <img src={user.photo_url} alt="avatar" className="h-12 w-12 rounded-full" />
        )}
        <div>
          <h1 className="text-lg font-bold text-text-color">{user?.first_name} {user?.last_name}</h1>
          <p className="text-sm text-hint-color">@{user?.username}</p>
        </div>
      </div>
      
      <SettingsButton />
    </div>
  );
};