import { MetricCard } from '@/components/ui';
import type { WomenHealth } from '@/types';

interface WomenHealthCardProps {
  data: WomenHealth;
}

export function WomenHealthCard({ data }: WomenHealthCardProps) {
  return (
    <MetricCard className="flex-1 bg-[#FFF0F5]">
      <p className="text-xs text-pink-600 mb-1">女性健康</p>
      <p className="text-lg font-bold text-pink-700">经期第 {data.cycleDay} 天</p>
      <p className="text-xs text-pink-500 mt-1">
        预计 {data.ovulationDate.split('-')[2]}日 排卵期
      </p>
    </MetricCard>
  );
}
