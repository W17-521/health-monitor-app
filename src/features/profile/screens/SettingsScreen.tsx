import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';

export function SettingsScreen() {
  const navigate = useNavigate();
  const [calorieGoal, setCalorieGoal] = useState(1200);
  const [stepGoal, setStepGoal] = useState(8000);
  const [reminders, setReminders] = useState(true);
  const [privacy, setPrivacy] = useState(false);

  return (
    <div>
      <PageHeader
        title="设置"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Goals */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">目标设定</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">每日卡路里目标</span>
                <span className="font-semibold">{calorieGoal}千卡</span>
              </div>
              <input
                type="range" min="500" max="3000" step="100" value={calorieGoal}
                onChange={(e) => setCalorieGoal(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">每日步数目标</span>
                <span className="font-semibold">{stepGoal.toLocaleString()}步</span>
              </div>
              <input
                type="range" min="2000" max="20000" step="1000" value={stepGoal}
                onChange={(e) => setStepGoal(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">提醒通知</p>
          <label className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">运动提醒</span>
            <input type="checkbox" checked={reminders} onChange={(e) => setReminders(e.target.checked)} className="accent-purple-500" />
          </label>
          <label className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">隐私模式</span>
            <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="accent-purple-500" />
          </label>
        </div>

        {/* Connect Device */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">连接设备</p>
          <p className="text-sm text-gray-400 mb-2">支持品牌: 华为 / 小米 / Apple Watch</p>
          <button className="w-full py-2.5 jelly-btn-primary text-sm">搜索设备</button>
        </div>

        {/* About */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-2">关于</p>
          <p className="text-sm text-gray-500">健康监测 App v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">Phase A · 2026</p>
        </div>
      </div>
    </div>
  );
}
