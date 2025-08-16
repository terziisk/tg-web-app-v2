// src/features/ProfileHeader.tsx
import { useAuthStore } from "../store/authStore";

export function ProfileHeader() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div className="p-1 text-center font-semibold">Профиль</div>;
  }

  // Отображаем имя и фамилию из стора
  return (
    <div className="p-1 text-center font-semibold">
      Name: {user.first_name} {user.last_name}
    </div>
  );
}