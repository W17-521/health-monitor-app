import { useNavigate } from 'react-router-dom';
import { MetricCard } from '@/components/ui';
import type { WomenHealth } from '@/types';

interface WomenHealthCardProps {
  data: WomenHealth;
}

export function WomenHealthCard({ data }: WomenHealthCardProps) {
  const navigate = useNavigate();

  return (
    <MetricCard onClick={() => navigate('/health/women')} className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50">
      <p className="text-xs text-pink-500 mb-1">女性健康</p>
      <p className="text-lg font-bold text-pink-600">经期第 {data.cycleDay} 天</p>
      <p className="text-xs text-pink-400 mt-1">
        预计 {data.ovulationDate.split('-')[2]}日 排卵期
      </p>
    </MetricCard>
  );
}
