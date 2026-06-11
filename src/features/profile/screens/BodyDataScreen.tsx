import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { MetricCard } from '@/components/ui';
import { useUserData } from '@/hooks/useUserData';
import { useHealthData } from '@/hooks/useHealthData';
import { formatWeight } from '@/utils/format';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { useMemo } from 'react';

export function BodyDataScreen() {
  const navigate = useNavigate();
  const { bodyData } = useUserData();
  const { weightRecords } = useHealthData();

  const chartData = useMemo(
    () => weightRecords.map((r) => ({ date: r.date.slice(5), weight: r.weight })),
    [weightRecords],
  );

  return (
    <div>
      <PageHeader
        title="身体数据"
        leftAction={
          <button onClick={() => navigate(-1)} className="text-sm text-gray-700">← 返回</button>
        }
      />

      <div className="px-4 space-y-4 pb-8">
        {bodyData && (
          <MetricCard>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{bodyData.height}<span className="text-sm text-gray-500 font-normal">cm</span></p>
                <p className="text-xs text-gray-400 mt-1">身高</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{formatWeight(bodyData.weight)}</p>
                <p className="text-xs text-gray-400 mt-1">当前体重</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{formatWeight(bodyData.targetWeight)}</p>
                <p className="text-xs text-gray-400 mt-1">目标体重</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-orange">
                  {formatWeight(Math.abs(bodyData.weight - bodyData.targetWeight))}
                </p>
                <p className="text-xs text-gray-400 mt-1">还需减重</p>
              </div>
            </div>
          </MetricCard>
        )}

        <MetricCard>
          <p className="text-xs text-gray-500 mb-3">体重趋势 (近14天)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MetricCard>
      </div>
    </div>
  );
}
