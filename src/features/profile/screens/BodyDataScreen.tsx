import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useUserData } from '@/hooks/useUserData';
import { useHealthData } from '@/hooks/useHealthData';
import { formatWeight } from '@/utils/format';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';

export function BodyDataScreen() {
  const navigate = useNavigate();
  const { bodyData } = useUserData();
  const { weightRecords } = useHealthData();

  const chartData = useMemo(
    () => weightRecords.map((r) => ({ date: r.date.slice(5), weight: r.weight })),
    [weightRecords],
  );

  const bmi = bodyData ? (bodyData.weight / ((bodyData.height / 100) ** 2)) : 0;
  const bmiCategory = bmi < 18.5 ? '偏瘦' : bmi < 24 ? '正常' : bmi < 28 ? '偏胖' : '肥胖';
  const bmiColor = bmi < 18.5 ? 'text-blue-500' : bmi < 24 ? 'text-green-500' : bmi < 28 ? 'text-orange-500' : 'text-red-500';
  const targetDiff = bodyData ? bodyData.weight - bodyData.targetWeight : 0;
  const idealWeightLow = bodyData ? (18.5 * (bodyData.height / 100) ** 2).toFixed(1) : 0;
  const idealWeightHigh = bodyData ? (24 * (bodyData.height / 100) ** 2).toFixed(1) : 0;

  return (
    <div>
      <PageHeader
        title="身体数据"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* BMI */}
        <div className="glass-card p-5 text-center">
          <p className="text-xs text-gray-400 mb-1">BMI 指数</p>
          <p className={`text-4xl font-extrabold ${bmiColor}`}>{bmi.toFixed(1)}</p>
          <p className={`text-sm font-semibold mt-1 ${bmiColor}`}>{bmiCategory}</p>
          <p className="text-xs text-gray-400 mt-2">健康范围: {idealWeightLow}kg - {idealWeightHigh}kg</p>
        </div>

        {/* Body Stats */}
        {bodyData && (
          <div className="glass-card p-4">
            <p className="text-sm font-semibold mb-3">身体测量</p>
            <div className="grid grid-cols-2 gap-y-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {bodyData.height}<span className="text-sm text-gray-400 font-normal">cm</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">身高</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{formatWeight(bodyData.weight)}</p>
                <p className="text-xs text-gray-400 mt-1">当前体重</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{formatWeight(bodyData.targetWeight)}</p>
                <p className="text-xs text-gray-400 mt-1">目标体重</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-orange">{formatWeight(Math.abs(targetDiff))}</p>
                <p className="text-xs text-gray-400 mt-1">还需{targetDiff > 0 ? '减重' : '增重'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Target Recommendation */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">目标体重推荐</p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">健康体重范围</span>
              <span className="font-semibold">{idealWeightLow} - {idealWeightHigh} kg</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">建议目标</span>
              <span className="font-semibold text-accent-purple">{((Number(idealWeightLow) + Number(idealWeightHigh)) / 2).toFixed(1)} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">当前进度</span>
              <span className="font-semibold text-green-500">
                {targetDiff > 0 ? `还需减 ${targetDiff.toFixed(1)}kg` : '已达到目标！'}
              </span>
            </div>
          </div>
        </div>

        {/* Weight Trend */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">体重趋势 (近14天)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="var(--color-accent-purple)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-accent-purple)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
