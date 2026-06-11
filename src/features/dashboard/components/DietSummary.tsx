import { MetricCard } from '@/components/ui';
import { formatKcal, formatPercent } from '@/utils/format';
import type { DietSummary } from '@/types';

interface DietSummaryProps {
  data: DietSummary;
}

export function DietSummary({ data }: DietSummaryProps) {
  return (
    <MetricCard>
      <p className="text-xs text-gray-500 mb-2">饮食摘要</p>
      <p className="text-sm font-semibold">
        今日已摄入 <span className="text-accent-orange">{formatKcal(data.caloriesConsumed)}</span>
      </p>
      <div className="flex gap-2 mt-3">
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${data.carbsPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">碳水{formatPercent(data.carbsPercent)}</p>
        </div>
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${data.proteinPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">蛋白{formatPercent(data.proteinPercent)}</p>
        </div>
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${data.fatPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">脂肪{formatPercent(data.fatPercent)}</p>
        </div>
      </div>
    </MetricCard>
  );
}
