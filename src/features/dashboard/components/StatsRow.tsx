import { useNavigate } from 'react-router-dom';
import { Footprints, Clock, Lightning } from '@phosphor-icons/react';
import { StatBadge } from '@/components/ui';
import { formatSteps, formatMinutes, intensityLabel } from '@/utils/format';
import type { DailyStats } from '@/types';

interface StatsRowProps {
  stats: DailyStats;
}

export function StatsRow({ stats }: StatsRowProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around py-3">
      <StatBadge
        icon={<Footprints weight="fill" />}
        value={formatSteps(stats.steps)}
        label="步数"
        color="var(--color-accent-blue)"
        onClick={() => navigate('/health/detail')}
      />
      <StatBadge
        icon={<Clock weight="fill" />}
        value={formatMinutes(stats.exerciseMinutes)}
        label="时长"
        color="var(--color-primary-light)"
        onClick={() => navigate('/health/detail')}
      />
      <StatBadge
        icon={<Lightning weight="fill" />}
        value={intensityLabel(stats.intensity)}
        label="强度"
        color="var(--color-accent-orange)"
        onClick={() => navigate('/health/detail')}
      />
    </div>
  );
}
