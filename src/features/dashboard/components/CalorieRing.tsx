import { useNavigate } from 'react-router-dom';
import { ProgressRing } from '@/components/ui';
import type { DailyStats } from '@/types';

interface CalorieRingProps {
  stats: DailyStats;
}

export function CalorieRing({ stats }: CalorieRingProps) {
  const navigate = useNavigate();
  const percent = Math.round((stats.caloriesBurned / stats.calorieGoal) * 100);

  return (
    <div className="flex flex-col items-center py-4">
      <ProgressRing percent={percent} size={150} onClick={() => navigate('/health/detail')}>
        <span className="text-2xl font-extrabold tabular-nums text-gray-900">
          {Math.round(stats.caloriesBurned)}
        </span>
        <span className="text-xs text-gray-500 mt-0.5">
          / {stats.calorieGoal} 千卡
        </span>
      </ProgressRing>
      <span className="mt-2 text-sm font-medium text-accent-purple">{percent}%</span>
    </div>
  );
}
