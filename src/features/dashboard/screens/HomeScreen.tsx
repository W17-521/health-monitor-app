import { Bell, ChatDots } from '@phosphor-icons/react';
import { PageHeader } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { useHealthData } from '@/hooks/useHealthData';
import { useExerciseData } from '@/hooks/useExerciseData';
import { CalorieRing } from '../components/CalorieRing';
import { StatsRow } from '../components/StatsRow';
import { WeightCard } from '../components/WeightCard';
import { WomenHealthCard } from '../components/WomenHealthCard';
import { PetCard } from '../components/PetCard';
import { CourseRecommend } from '../components/CourseRecommend';
import { DietSummary } from '../components/DietSummary';

export function HomeScreen() {
  const { dailyStats, weightRecords, womenHealth, petStatus, dietSummary, isLoading } = useHealthData();
  const { courses } = useExerciseData();

  if (isLoading || !dailyStats) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton height={200} />
        <Skeleton height={80} />
        <div className="flex gap-3">
          <Skeleton height={100} width="48%" />
          <Skeleton height={100} width="48%" />
        </div>
        <Skeleton height={120} />
        <Skeleton height={100} />
      </div>
    );
  }

  const latestWeight = weightRecords.length > 0
    ? weightRecords[weightRecords.length - 1].weight
    : 65.3;

  return (
    <div>
      <PageHeader
        title="健康监测"
        leftAction={<Bell size={22} className="text-gray-700" />}
        rightAction={<ChatDots size={22} className="text-gray-700" />}
      />

      <div className="px-4 space-y-3 pb-4">
        {/* Today's Overview */}
        <div className="jelly-card p-4">
          <p className="text-xs text-gray-500 mb-1">今日目标</p>
          <CalorieRing stats={dailyStats} />
          <StatsRow stats={dailyStats} />
        </div>

        {/* Weight + Women Health row */}
        <div className="flex gap-3">
          <WeightCard current={latestWeight} records={weightRecords} />
          {womenHealth && <WomenHealthCard data={womenHealth} />}
        </div>

        {/* Pet Card */}
        {petStatus && <PetCard pet={petStatus} />}

        {/* Course Recommendations */}
        {courses.length > 0 && <CourseRecommend courses={courses} />}

        {/* Diet Summary */}
        {dietSummary && <DietSummary data={dietSummary} />}
      </div>
    </div>
  );
}
