// src/features/ProfileHeader.tsx
import { useAuthStore } from "../store/authStore";

export const ProfileHeader = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center p-4">
      <div className="flex items-center space-x-3">
        {user?.photo_url && (
          <img src={user.photo_url} alt="avatar" className="h-12 w-12 rounded-full" />
        )}
        <div>
          <h1 className="text-lg font-bold">{user?.first_name} {user?.last_name}</h1>
          <p className="text-sm text-tg-hint">@{user?.username}</p>
        </div>
      </div>
    </div>
  );
};