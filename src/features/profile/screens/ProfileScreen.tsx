import { PageHeader } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { useUserData } from '@/hooks/useUserData';
import { ProfileHeader } from '../components/ProfileHeader';
import { BodyDataCard } from '../components/BodyDataCard';
import { AchievementGrid } from '../components/AchievementGrid';
import { SettingsList } from '../components/SettingsList';

export function ProfileScreen() {
  const { profile, bodyData, isLoading } = useUserData();

  if (isLoading || !profile) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton height={160} />
        <Skeleton height={100} />
        <Skeleton height={120} />
        <Skeleton height={200} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="我的" />
      <ProfileHeader profile={profile} />
      <div className="px-4 space-y-3 pb-4">
        {bodyData && <BodyDataCard data={bodyData} />}
        <AchievementGrid />
        <SettingsList />
      </div>
    </div>
  );
}
