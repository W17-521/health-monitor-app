import { useNavigate } from 'react-router-dom';
import { MetricCard } from '@/components/ui';
import { formatWeight } from '@/utils/format';
import type { BodyData } from '@/types';

interface BodyDataCardProps {
  data: BodyData;
}

export function BodyDataCard({ data }: BodyDataCardProps) {
  const navigate = useNavigate();

  return (
    <MetricCard onClick={() => navigate('/profile/body-data')}>
      <p className="text-xs text-gray-500 mb-2">身体数据</p>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-lg font-bold">{data.height}<span className="text-xs text-gray-500 font-normal">cm</span></p>
          <p className="text-[10px] text-gray-400">身高</p>
        </div>
        <div>
          <p className="text-lg font-bold">{formatWeight(data.weight)}</p>
          <p className="text-[10px] text-gray-400">体重</p>
        </div>
        <div>
          <p className="text-lg font-bold">{formatWeight(data.targetWeight)}</p>
          <p className="text-[10px] text-gray-400">目标</p>
        </div>
      </div>
      <p className="text-xs text-primary text-center mt-2">查看详情 →</p>
    </MetricCard>
  );
}
