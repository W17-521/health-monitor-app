import { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MetricCard } from '@/components/ui';
import { formatWeight } from '@/utils/format';
import type { WeightRecord } from '@/types';
import { useNavigate } from 'react-router-dom';

interface WeightCardProps {
  current: number;
  records: WeightRecord[];
}

export function WeightCard({ current, records }: WeightCardProps) {
  const navigate = useNavigate();
  const chartData = useMemo(() => records.map((r) => ({ date: r.date, w: r.weight })), [records]);

  return (
    <MetricCard onClick={() => navigate('/profile/body-data')} className="flex-1">
      <p className="text-xs text-gray-500 mb-1">体重</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold tabular-nums">{formatWeight(current)}</span>
        <span className="text-[10px] text-primary">▼ 0.3</span>
      </div>
      <div className="h-10 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="w" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
}
