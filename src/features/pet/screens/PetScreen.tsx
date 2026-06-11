import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';

const FOODS = [
  { emoji: '🍎', name: '苹果', kcal: 50 },
  { emoji: '🥩', name: '牛排', kcal: 200 },
  { emoji: '🍰', name: '蛋糕', kcal: 300 },
  { emoji: '🥗', name: '沙拉', kcal: 80 },
];

const ACCESSORIES = [
  { emoji: '🎀', name: '蝴蝶结', points: 200 },
  { emoji: '👓', name: '墨镜', points: 500 },
  { emoji: '🎩', name: '礼帽', points: 350 },
  { emoji: '🧣', name: '围巾', points: 150 },
];

const ART_LINES = [
  '  /)/)  ',
  ' ( . .) ',
  ' (  >🍎',
];

export function PetScreen() {
  const navigate = useNavigate();
  const { petStatus, dailyStats } = useHealthData();

  const pet = petStatus;
  const energy = dailyStats ? Math.round(dailyStats.caloriesBurned * 0.1) : 85;

  const moodEmoji = pet?.mood === 'happy' ? '😊' : pet?.mood === 'neutral' ? '😐' : '😢';

  return (
    <div>
      <PageHeader
        title="我的宠物"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
        rightAction={<span className="text-xl">🛒</span>}
      />

      <div className="px-4 space-y-4 pb-8">
        {/* Pet Avatar */}
        <div className="glass-card p-6 flex flex-col items-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-3 font-mono text-gray-700 text-center leading-relaxed">
            {ART_LINES.map((line, i) => (
              <div key={i} className="text-sm">{line}</div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span>{pet?.name ?? '小柯基'}</span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-normal">
              Lv.{pet?.level ?? 5}
            </span>
          </div>
          <div className="w-full mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">饥饿</span>
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all"
                style={{ width: `${pet?.hunger ?? 80}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{pet?.hunger ?? 80}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">心情 {moodEmoji}</p>
        </div>

        {/* Energy & Food */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">今日可用运动能量: {energy} 千卡</p>
          <p className="text-xs text-gray-500 mb-2">可兑换食物:</p>
          <div className="grid grid-cols-2 gap-2">
            {FOODS.map((food) => (
              <button
                key={food.name}
                className="jelly-btn p-3 flex items-center gap-3 text-left"
              >
                <span className="text-2xl">{food.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{food.name}</p>
                  <p className="text-xs text-gray-400">{food.kcal}千卡</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Log */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">运动日志</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>今日消耗 {dailyStats?.caloriesBurned ?? 850}千卡</span>
              <span className="text-accent-purple font-medium">→ 获得{energy}能量</span>
            </div>
            <div className="flex justify-between">
              <span>连续运动3天</span>
              <span>奖励胡萝卜 🥕</span>
            </div>
          </div>
        </div>

        {/* Accessory Shop */}
        <div className="glass-card p-4">
          <p className="text-sm font-semibold mb-3">配饰商店</p>
          <div className="grid grid-cols-2 gap-2">
            {ACCESSORIES.map((item) => (
              <button key={item.name} className="jelly-btn p-3 flex items-center gap-3 text-left">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.points}积分</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back to home */}
        <button
          onClick={() => navigate('/home')}
          className="w-full py-3 jelly-btn text-sm text-gray-600 font-medium"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}
