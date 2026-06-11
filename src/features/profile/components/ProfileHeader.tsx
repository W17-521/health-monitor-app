import { UserCircle } from '@phosphor-icons/react';
import type { UserProfile } from '@/types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
        {profile.avatarUrl ? (
          <img src={profile.avatarUrl} alt={profile.nickname} className="w-full h-full rounded-full object-cover" />
        ) : (
          <UserCircle size={48} className="text-gray-400" />
        )}
      </div>
      <h2 className="text-lg font-bold">{profile.nickname}</h2>
      <div className="flex items-center gap-1 mt-1">
        <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
          Lv.{profile.level}
        </span>
        <span className="text-xs text-gray-500">累计运动 {profile.totalExerciseDays} 天</span>
      </div>
    </div>
  );
}
