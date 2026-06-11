import { useNavigate } from 'react-router-dom';
import { formatWeight } from '@/utils/format';
import type { BodyData } from '@/types';

interface BodyDataCardProps {
  data: BodyData;
}

export function BodyDataCard({ data }: BodyDataCardProps) {
  const navigate = useNavigate();
  const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1);
  const targetDiff = data.weight - data.targetWeight;

  return (
    <button
      onClick={() => navigate('/profile/body-data')}
      className="glass-card p-4 w-full text-left active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">身体数据</p>
        <span className="text-xs text-accent-purple">查看详情 →</span>
      </div>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-xl font-bold text-gray-800">{data.height}<span className="text-xs text-gray-400 font-normal">cm</span></p>
          <p className="text-[10px] text-gray-400">身高</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">{formatWeight(data.weight)}</p>
          <p className="text-[10px] text-gray-400">体重</p>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800">BMI {bmi}</p>
          <p className="text-[10px] text-gray-400">指数</p>
        </div>
        <div>
          <p className={`text-xl font-bold ${targetDiff > 0 ? 'text-accent-orange' : 'text-green-500'}`}>
            {targetDiff > 0 ? `-${targetDiff.toFixed(1)}` : '✓'}
          </p>
          <p className="text-[10px] text-gray-400">距目标</p>
        </div>
      </div>
    </button>
  );
}
