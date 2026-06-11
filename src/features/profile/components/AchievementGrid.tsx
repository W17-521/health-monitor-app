import { MetricCard } from '@/components/ui';
import type { Achievement } from '@/types';

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: '🏅', title: '连续7天', description: '连续运动7天', unlockedAt: '2026-05-20' },
  { id: 'a2', icon: '🔥', title: '100天', description: '累计运动100天', unlockedAt: '2026-04-10' },
  { id: 'a3', icon: '💪', title: '万步达人', description: '首次单日1万步', unlockedAt: '2026-03-15' },
  { id: 'a4', icon: '⭐', title: '早起打卡', description: '连续30天7点前运动', unlockedAt: '2026-06-01' },
];

export function AchievementGrid() {
  return (
    <MetricCard>
      <p className="text-xs text-gray-500 mb-3">成就徽章</p>
      <div className="grid grid-cols-4 gap-3">
        {MOCK_ACHIEVEMENTS.map((a) => (
          <div key={a.id} className="flex flex-col items-center text-center gap-1">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl">
              {a.icon}
            </div>
            <p className="text-[10px] leading-tight font-medium text-gray-700">{a.title}</p>
          </div>
        ))}
      </div>
    </MetricCard>
  );
}
