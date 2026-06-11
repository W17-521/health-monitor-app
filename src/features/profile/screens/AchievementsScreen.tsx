import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import type { Achievement } from '@/types';

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: '🏅', title: '连续7天', description: '连续运动7天', unlockedAt: '2026-05-20' },
  { id: 'a2', icon: '🔥', title: '100天', description: '累计运动100天', unlockedAt: '2026-04-10' },
  { id: 'a3', icon: '💪', title: '万步达人', description: '首次单日1万步', unlockedAt: '2026-03-15' },
  { id: 'a4', icon: '⭐', title: '早起打卡', description: '连续30天7点前运动', unlockedAt: '2026-06-01' },
  { id: 'a5', icon: '🏆', title: '卡路里王者', description: '单日消耗2000千卡' },
  { id: 'a6', icon: '🎯', title: '完美一周', description: '连续7天达成目标' },
  { id: 'a7', icon: '🌙', title: '夜跑达人', description: '累计夜间运动50次' },
  { id: 'a8', icon: '🧘', title: '瑜伽大师', description: '累计瑜伽练习100小时' },
  { id: 'a9', icon: '🦵', title: '马拉松之星', description: '累计跑步500公里' },
  { id: 'a10', icon: '🥇', title: '减重10kg', description: '累计减重10公斤' },
  { id: 'a11', icon: '📅', title: '365天', description: '累计运动365天' },
  { id: 'a12', icon: '💎', title: '社交达人', description: '社区发布100条动态' },
];

export function AchievementsScreen() {
  const navigate = useNavigate();
  const unlocked = ALL_ACHIEVEMENTS.filter((a) => a.unlockedAt);
  const locked = ALL_ACHIEVEMENTS.filter((a) => !a.unlockedAt);
  const progress = Math.round((unlocked.length / ALL_ACHIEVEMENTS.length) * 100);

  return (
    <div>
      <PageHeader
        title="成就徽章"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Progress */}
        <div className="glass-card p-4 text-center">
          <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            {unlocked.length}/{ALL_ACHIEVEMENTS.length}
          </p>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2 mb-1">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">已解锁 {progress}%</p>
        </div>

        {/* Unlocked */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">已获得 ({unlocked.length})</p>
          <div className="grid grid-cols-4 gap-3">
            {unlocked.map((a) => (
              <div key={a.id} className="flex flex-col items-center text-center gap-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-2xl">
                  {a.icon}
                </div>
                <p className="text-[10px] font-medium text-gray-700">{a.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Locked */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3 text-gray-400">未获得 ({locked.length})</p>
          <div className="grid grid-cols-4 gap-3">
            {locked.map((a) => (
              <div key={a.id} className="flex flex-col items-center text-center gap-1 opacity-40">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl grayscale">
                  {a.icon}
                </div>
                <p className="text-[10px] text-gray-400">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
