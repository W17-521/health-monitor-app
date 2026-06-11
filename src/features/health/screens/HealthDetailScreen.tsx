import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';
import { formatKcal } from '@/utils/format';

export function HealthDetailScreen() {
  const navigate = useNavigate();
  const { dailyStats, weightRecords } = useHealthData();
  const stats = dailyStats;

  if (!stats) return null;

  return (
    <div>
      <PageHeader
        title="健康详情"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Calorie Breakdown */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">卡路里消耗分析</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">基础代谢 (BMR)</span>
                <span className="font-semibold">{formatKcal(1400)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">活动消耗</span>
                <span className="font-semibold">{formatKcal(stats.caloriesBurned)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" style={{ width: `${(stats.caloriesBurned / stats.calorieGoal) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">食物热效应</span>
                <span className="font-semibold">{formatKcal(200)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-300 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between text-sm">
            <span className="font-semibold">今日总消耗</span>
            <span className="font-bold text-accent-purple">{formatKcal(stats.caloriesBurned + 1400 + 200)}</span>
          </div>
        </div>

        {/* Steps detail */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">步数详情</p>
          <div className="flex justify-around text-center">
            <div><p className="text-2xl font-bold">{stats.steps.toLocaleString()}</p><p className="text-xs text-gray-400">今日步数</p></div>
            <div><p className="text-2xl font-bold">4.2</p><p className="text-xs text-gray-400">公里</p></div>
            <div><p className="text-2xl font-bold">580</p><p className="text-xs text-gray-400">千卡</p></div>
          </div>
        </div>

        {/* Weight trend */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">体重变化</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">7天前</span>
            <span className="font-semibold">{weightRecords.length > 7 ? (weightRecords[weightRecords.length - 8]?.weight ?? 66) : 66}kg</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">今天</span>
            <span className="font-bold text-accent-purple">{weightRecords.length > 0 ? weightRecords[weightRecords.length - 1].weight : 65.3}kg</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">变化</span>
            <span className="text-green-500 font-semibold">▼ 0.7kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
