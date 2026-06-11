import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';

const PET_TYPES = [
  {
    id: 'corgi',
    name: '小柯基',
    emoji: '🐕',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f415.svg',
    desc: '活泼好动的小短腿',
  },
  {
    id: 'cat',
    name: '小猫咪',
    emoji: '🐈',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f408.svg',
    desc: '优雅傲娇的毛球',
  },
  {
    id: 'bunny',
    name: '小兔子',
    emoji: '🐰',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f430.svg',
    desc: '温柔可爱的长耳朵',
  },
  {
    id: 'hamster',
    name: '小仓鼠',
    emoji: '🐹',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f439.svg',
    desc: '软萌圆滚的小团子',
  },
  {
    id: 'panda',
    name: '小熊猫',
    emoji: '🐼',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f43c.svg',
    desc: '呆萌贪吃的黑白团',
  },
  {
    id: 'fox',
    name: '小狐狸',
    emoji: '🦊',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f98a.svg',
    desc: '机灵俏皮的大尾巴',
  },
];

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

export function PetScreen() {
  const navigate = useNavigate();
  const { petStatus, dailyStats } = useHealthData();

  const pet = petStatus;
  const energy = dailyStats ? Math.round(dailyStats.caloriesBurned * 0.1) : 85;
  const moodEmoji = pet?.mood === 'happy' ? '😊' : pet?.mood === 'neutral' ? '😐' : '😢';

  const [activePetId, setActivePetId] = useState(pet?.type === 'dog' ? 'corgi' : pet?.type === 'cat' ? 'cat' : 'corgi');
  const [showSelector, setShowSelector] = useState(false);

  const activePet = PET_TYPES.find((p) => p.id === activePetId) ?? PET_TYPES[0];

  return (
    <div>
      <PageHeader
        title="我的宠物"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
        rightAction={
          <button onClick={() => setShowSelector(!showSelector)} className="text-xl active:scale-90 transition-transform">
            🔄
          </button>
        }
      />

      <div className="px-4 space-y-4 pb-8">
        {/* Pet Avatar */}
        <div className="jelly-card p-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 flex items-center justify-center p-4 mb-3 shadow-inner">
            <img
              src={activePet.img}
              alt={activePet.name}
              className="w-full h-full object-contain drop-shadow-lg"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span>{activePet.name}</span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-normal">
              Lv.{pet?.level ?? 5}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{activePet.desc}</p>
          <div className="w-full mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">饥饿</span>
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all" style={{ width: `${pet?.hunger ?? 80}%` }} />
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{pet?.hunger ?? 80}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">心情 {moodEmoji}</p>
        </div>

        {/* Pet Selector */}
        {showSelector && (
          <div className="jelly-card p-4">
            <p className="text-sm font-semibold mb-3">选择宠物</p>
            <div className="grid grid-cols-3 gap-3">
              {PET_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => { setActivePetId(pt.id); setShowSelector(false); }}
                  className={`p-3 rounded-2xl text-center transition-all active:scale-90 ${
                    activePetId === pt.id
                      ? 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-purple-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <img src={pt.img} alt={pt.name} className="w-10 h-10 mx-auto mb-1 drop-shadow" />
                  <p className="text-xs font-medium text-gray-700">{pt.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Energy & Food */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">今日可用运动能量: {energy} 千卡</p>
          <p className="text-xs text-gray-500 mb-2">可兑换食物:</p>
          <div className="grid grid-cols-2 gap-2">
            {FOODS.map((food) => (
              <button key={food.name} className="jelly-btn p-3 flex items-center gap-3 text-left">
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
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">运动日志</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between py-1">
              <span>今日消耗 {dailyStats?.caloriesBurned ?? 850}千卡</span>
              <span className="text-accent-purple font-medium">→ 获得{energy}能量</span>
            </div>
            <div className="flex justify-between py-1">
              <span>连续运动3天</span>
              <span>奖励胡萝卜 🥕</span>
            </div>
          </div>
        </div>

        {/* Accessory Shop */}
        <div className="jelly-card p-4">
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

        <button onClick={() => navigate('/home')} className="w-full py-3 jelly-btn text-sm text-gray-600 font-medium">
          返回首页
        </button>
      </div>
    </div>
  );
}
