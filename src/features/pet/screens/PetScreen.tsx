import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';

interface PetType {
  id: string;
  name: string;
  emoji: string;
  img: string;
  desc: string;
  bgColor: string;
  earStyle: string;
  faceStyle: string;
}

const PET_TYPES: PetType[] = [
  {
    id: 'corgi', name: '小柯基', emoji: '🐕',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f415.svg',
    desc: '活泼好动的小短腿',
    bgColor: 'from-amber-100 via-orange-50 to-yellow-100',
    earStyle: 'rounded-tl-3xl rounded-tr-3xl',
    faceStyle: 'rounded-3xl',
  },
  {
    id: 'cat', name: '小猫咪', emoji: '🐈',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f408.svg',
    desc: '优雅傲娇的毛球',
    bgColor: 'from-pink-100 via-rose-50 to-purple-100',
    earStyle: 'rounded-tl-2xl rounded-tr-3xl',
    faceStyle: 'rounded-2xl',
  },
  {
    id: 'bunny', name: '小兔子', emoji: '🐰',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f430.svg',
    desc: '温柔可爱的长耳朵',
    bgColor: 'from-rose-100 via-pink-50 to-fuchsia-100',
    earStyle: 'rounded-t-full',
    faceStyle: 'rounded-full',
  },
  {
    id: 'hamster', name: '小仓鼠', emoji: '🐹',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f439.svg',
    desc: '软萌圆滚的小团子',
    bgColor: 'from-orange-100 via-amber-50 to-yellow-100',
    earStyle: 'rounded-full',
    faceStyle: 'rounded-full',
  },
  {
    id: 'panda', name: '小熊猫', emoji: '🐼',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f43c.svg',
    desc: '呆萌贪吃的黑白团',
    bgColor: 'from-gray-100 via-slate-50 to-gray-200',
    earStyle: 'rounded-full',
    faceStyle: 'rounded-full',
  },
  {
    id: 'fox', name: '小狐狸', emoji: '🦊',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f98a.svg',
    desc: '机灵俏皮的大尾巴',
    bgColor: 'from-orange-100 via-amber-50 to-red-100',
    earStyle: 'rounded-tl-3xl rounded-tr-lg',
    faceStyle: 'rounded-2xl',
  },
];

const FOODS = [
  { id: 'apple', emoji: '🍎', name: '苹果', kcal: 50 },
  { id: 'steak', emoji: '🥩', name: '牛排', kcal: 200 },
  { id: 'cake', emoji: '🍰', name: '蛋糕', kcal: 300 },
  { id: 'salad', emoji: '🥗', name: '沙拉', kcal: 80 },
];

const ACCESSORIES = [
  { emoji: '🎀', name: '蝴蝶结', points: 200 },
  { emoji: '👓', name: '墨镜', points: 500 },
  { emoji: '🎩', name: '礼帽', points: 350 },
  { emoji: '🧣', name: '围巾', points: 150 },
];

const REACTIONS = ['😋 好吃！', '😍 太棒了！', '🥰 还要还要~', '😆 开心！', '🤩 美味！', '🎉 好幸福！'];

export function PetScreen() {
  const navigate = useNavigate();
  const { petStatus, dailyStats } = useHealthData();

  const [activePetId, setActivePetId] = useState(petStatus?.type === 'dog' ? 'corgi' : petStatus?.type === 'cat' ? 'cat' : 'corgi');
  const [showSelector, setShowSelector] = useState(false);
  const [hunger, setHunger] = useState(petStatus?.hunger ?? 80);
  const [feedMsg, setFeedMsg] = useState('');
  const [feedBounce, setFeedBounce] = useState(false);
  const [petReaction, setPetReaction] = useState('😊');
  const [shakeHead, setShakeHead] = useState(false);
  const energy = dailyStats ? Math.round(dailyStats.caloriesBurned * 0.1) : 85;
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const activePet = PET_TYPES.find((p) => p.id === activePetId) ?? PET_TYPES[0];

  const handleFeed = useCallback((foodKcal: number, foodName: string, foodEmoji: string) => {
    if (foodKcal > energy) {
      setFeedMsg(`能量不足！${foodName}需要${foodKcal}千卡`);
      setShakeHead(true);
      setPetReaction('😣');
      setTimeout(() => { setShakeHead(false); setPetReaction('😊'); setFeedMsg(''); }, 2000);
      return;
    }
    const newHunger = Math.min(100, hunger + foodKcal / 10);
    setHunger(newHunger);
    setFeedBounce(true);
    setPetReaction(REACTIONS[Math.floor(Math.random() * REACTIONS.length)]);
    setFeedMsg(`${foodEmoji} 喂食成功！${foodName} 消耗${foodKcal}千卡`);
    setTimeout(() => { setFeedBounce(false); setPetReaction('😊'); }, 1500);
    setTimeout(() => setFeedMsg(''), 2500);
  }, [hunger, energy]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    try {
      const { id, name, kcal } = JSON.parse(data);
      handleFeed(kcal, name, FOODS.find((f) => f.id === id)?.emoji ?? '🍎');
    } catch { /* ignore */ }
  };

  return (
    <div>
      <PageHeader
        title="我的宠物"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
        rightAction={
          <button onClick={() => setShowSelector(!showSelector)} className="text-xl active:scale-75 transition-transform">🔄</button>
        }
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Pet Avatar - Drop Zone */}
        <div
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`jelly-card p-6 flex flex-col items-center transition-all duration-300 ${
            dragOver ? 'ring-4 ring-purple-300 scale-[1.02] bg-purple-50/50' : ''
          } ${feedBounce ? 'animate-bounce' : ''} ${shakeHead ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        >
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${activePet.bgColor} flex items-center justify-center p-3 mb-3 shadow-inner relative overflow-hidden`}>
            <img
              src={activePet.img} alt={activePet.name}
              className="w-full h-full object-contain drop-shadow-xl relative z-10 transition-transform duration-300"
              style={{ transform: feedBounce ? 'scale(1.3)' : shakeHead ? 'rotate-12' : 'scale(1)' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {feedBounce && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-4xl animate-ping">💕</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span>{activePet.name}</span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-normal">Lv.{petStatus?.level ?? 5}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{activePet.desc}</p>
          {/* Pet reaction */}
          <div className="text-2xl mt-2 h-8 transition-all">{petReaction}</div>
          {feedMsg && <p className="text-xs text-accent-purple mt-1 text-center animate-pulse">{feedMsg}</p>}
          {/* Hunger bar */}
          <div className="w-full mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10 shrink-0">饥饿</span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${hunger}%` }} />
            </div>
            <span className="text-xs text-gray-400 tabular-nums shrink-0">{Math.round(hunger)}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">把食物拖到我身上来喂我吧~</p>
        </div>

        {/* Pet Selector */}
        {showSelector && (
          <div className="jelly-card p-4">
            <p className="text-sm font-semibold mb-3">选择宠物品种</p>
            <div className="grid grid-cols-3 gap-3">
              {PET_TYPES.map((pt) => (
                <button key={pt.id} onClick={() => { setActivePetId(pt.id); setShowSelector(false); setHunger(80); }}
                  className={`p-3 rounded-2xl text-center transition-all active:scale-90 ${
                    activePetId === pt.id ? 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-purple-300 scale-105' : 'bg-gray-50/70 hover:bg-gray-100'
                  }`}>
                  <div className={`w-14 h-14 mx-auto rounded-full bg-gradient-to-br ${pt.bgColor} flex items-center justify-center p-2 mb-1`}>
                    <img src={pt.img} alt={pt.name} className="w-8 h-8 object-contain drop-shadow" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{pt.name}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{pt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Food - Draggable */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-2">今日可用运动能量: <span className="text-accent-purple">{energy}</span> 千卡</p>
          <p className="text-xs text-gray-400 mb-2">可兑换食物 (拖到宠物身上喂食):</p>
          <div className="grid grid-cols-2 gap-2">
            {FOODS.map((food) => (
              <div
                key={food.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/json', JSON.stringify({ id: food.id, name: food.name, kcal: food.kcal }));
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => handleFeed(food.kcal, food.name, food.emoji)}
                className="jelly-btn p-3 flex items-center gap-3 text-left cursor-grab active:cursor-grabbing active:scale-90"
              >
                <span className="text-2xl select-none">{food.emoji}</span>
                <div className="select-none">
                  <p className="text-sm font-medium">{food.name}</p>
                  <p className="text-xs text-gray-400">{food.kcal}千卡</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Log */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">运动日志</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between py-1"><span>今日消耗 {dailyStats?.caloriesBurned ?? 850}千卡</span><span className="text-accent-purple font-medium">→ 获得{energy}能量</span></div>
            <div className="flex justify-between py-1"><span>连续运动3天</span><span>奖励胡萝卜 🥕</span></div>
          </div>
        </div>

        {/* Accessory Shop */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">配饰商店</p>
          <div className="grid grid-cols-2 gap-2">
            {ACCESSORIES.map((item) => (
              <button key={item.name} className="jelly-btn p-3 flex items-center gap-3 text-left active:scale-90">
                <span className="text-2xl">{item.emoji}</span>
                <div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-gray-400">{item.points}积分</p></div>
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
