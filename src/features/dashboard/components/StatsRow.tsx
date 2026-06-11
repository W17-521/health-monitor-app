import { Footprints, Clock, Lightning } from '@phosphor-icons/react';
import { StatBadge } from '@/components/ui';
import { formatSteps, formatMinutes, intensityLabel } from '@/utils/format';
import type { DailyStats } from '@/types';

interface StatsRowProps {
  stats: DailyStats;
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="flex justify-around py-3">
      <StatBadge
        icon={<Footprints weight="fill" />}
        value={formatSteps(stats.steps)}
        label="步数"
        color="var(--color-accent-blue)"
      />
      <StatBadge
        icon={<Clock weight="fill" />}
        value={formatMinutes(stats.exerciseMinutes)}
        label="时长"
        color="var(--color-primary)"
      />
      <StatBadge
        icon={<Lightning weight="fill" />}
        value={intensityLabel(stats.intensity)}
        label="强度"
        color="var(--color-accent-orange)"
      />
    </div>
  );
}
