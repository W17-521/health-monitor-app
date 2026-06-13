import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';
import { usePetStore } from '@/stores/petStore';

interface PetType {
  id: string; name: string; img: string; desc: string; bgColor: string;
}

const PET_TYPES: PetType[] = [
  { id: 'corgi', name: '小柯基', desc: '活泼好动的小短腿', bgColor: 'from-amber-100 via-orange-50 to-yellow-100',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f415.svg' },
  { id: 'cat', name: '小猫咪', desc: '优雅傲娇的毛球', bgColor: 'from-pink-100 via-rose-50 to-purple-100',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f408.svg' },
  { id: 'bunny', name: '小兔子', desc: '温柔可爱的长耳朵', bgColor: 'from-rose-100 via-pink-50 to-fuchsia-100',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f430.svg' },
  { id: 'hamster', name: '小仓鼠', desc: '软萌圆滚的小团子', bgColor: 'from-orange-100 via-amber-50 to-yellow-100',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f439.svg' },
  { id: 'panda', name: '小熊猫', desc: '呆萌贪吃的黑白团', bgColor: 'from-gray-100 via-slate-50 to-gray-200',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f43c.svg' },
  { id: 'fox', name: '小狐狸', desc: '机灵俏皮的大尾巴', bgColor: 'from-orange-100 via-amber-50 to-red-100',
    img: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f98a.svg' },
];

const ALL_FOODS = [
  { id: 'apple', emoji: '🍎', name: '苹果', kcal: 50, cat: '水果' },
  { id: 'banana', emoji: '🍌', name: '香蕉', kcal: 80, cat: '水果' },
  { id: 'grape', emoji: '🍇', name: '葡萄', kcal: 60, cat: '水果' },
  { id: 'watermelon', emoji: '🍉', name: '西瓜', kcal: 40, cat: '水果' },
  { id: 'carrot', emoji: '🥕', name: '胡萝卜', kcal: 30, cat: '蔬菜' },
  { id: 'broccoli', emoji: '🥦', name: '西兰花', kcal: 35, cat: '蔬菜' },
  { id: 'corn', emoji: '🌽', name: '玉米', kcal: 100, cat: '蔬菜' },
  { id: 'steak', emoji: '🥩', name: '牛排', kcal: 200, cat: '蛋白质' },
  { id: 'chicken', emoji: '🍗', name: '鸡腿', kcal: 180, cat: '蛋白质' },
  { id: 'fish', emoji: '🐟', name: '鱼肉', kcal: 120, cat: '蛋白质' },
  { id: 'egg', emoji: '🥚', name: '鸡蛋', kcal: 70, cat: '蛋白质' },
  { id: 'rice', emoji: '🍚', name: '米饭', kcal: 150, cat: '主食' },
  { id: 'bread', emoji: '🍞', name: '面包', kcal: 130, cat: '主食' },
  { id: 'noodle', emoji: '🍜', name: '拉面', kcal: 160, cat: '主食' },
  { id: 'cake', emoji: '🍰', name: '蛋糕', kcal: 300, cat: '甜品' },
  { id: 'icecream', emoji: '🍦', name: '冰淇淋', kcal: 180, cat: '甜品' },
  { id: 'cookie', emoji: '🍪', name: '曲奇', kcal: 140, cat: '甜品' },
  { id: 'donut', emoji: '🍩', name: '甜甜圈', kcal: 250, cat: '甜品' },
  { id: 'milk', emoji: '🥛', name: '牛奶', kcal: 90, cat: '饮品' },
  { id: 'juice', emoji: '🧃', name: '果汁', kcal: 70, cat: '饮品' },
];

const FOOD_CATS = ['全部','水果','蔬菜','蛋白质','主食','甜品','饮品'];

interface AccItem { emoji: string; name: string; points: number; position: string; }

const ACCESSORIES: AccItem[] = [
  { emoji: '🎀', name: '蝴蝶结', points: 200, position: 'top-0 -right-1' },
  { emoji: '👓', name: '墨镜', points: 500, position: 'top-[30%] left-1/2 -translate-x-1/2' },
  { emoji: '🎩', name: '礼帽', points: 350, position: '-top-2 left-1/2 -translate-x-1/2' },
  { emoji: '🧣', name: '围巾', points: 150, position: 'top-[45%] left-1/2 -translate-x-1/2' },
];

const REACTIONS = ['😋 好吃！','😍 太棒了！','🥰 还要还要~','😆 开心！','🤩 美味！','🎉 好幸福！'];
const INITIAL_ENERGY = 350;

export function PetScreen() {
  const navigate = useNavigate();
  const { petStatus, dailyStats } = useHealthData();
  const store = usePetStore();

  const [showSelector, setShowSelector] = useState(false);
  const [remainingEnergy, setRemainingEnergy] = useState(INITIAL_ENERGY);
  const [feedMsg, setFeedMsg] = useState('');
  const [feedBounce, setFeedBounce] = useState(false);
  const [petReaction, setPetReaction] = useState('😊');
  const [shakeHead, setShakeHead] = useState(false);
  const [foodCat, setFoodCat] = useState('全部');
  const [showAllFood, setShowAllFood] = useState(false);
  const [shopMsg, setShopMsg] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const activePet = PET_TYPES.find((p) => p.id === store.activePetId) ?? PET_TYPES[0];
  const filteredFoods = foodCat === '全部' ? ALL_FOODS : ALL_FOODS.filter((f) => f.cat === foodCat);
  const displayedFoods = showAllFood ? filteredFoods : filteredFoods.slice(0, 8);

  const handleFeed = useCallback((foodKcal: number, foodName: string, foodEmoji: string) => {
    const result = store.feed(foodKcal, remainingEnergy);
    if (!result.success) {
      setFeedMsg(`能量不足！${foodName}需要${foodKcal}千卡，剩余仅${remainingEnergy}`);
      setShakeHead(true); setPetReaction('😣');
      setTimeout(() => { setShakeHead(false); setPetReaction('😊'); setFeedMsg(''); }, 2000);
      return;
    }
    setRemainingEnergy(result.newEnergy);
    setFeedBounce(true);
    setPetReaction(REACTIONS[Math.floor(Math.random() * REACTIONS.length)]);
    setFeedMsg(`${foodEmoji} 喂食成功！消耗${foodKcal}千卡 · 剩余${result.newEnergy}千卡 · 获得${Math.round(foodKcal/5)}积分`);
    setTimeout(() => { setFeedBounce(false); setPetReaction('😊'); }, 1500);
    setTimeout(() => setFeedMsg(''), 3000);
  }, [remainingEnergy, store]);

  const handleBuyAccessory = (item: AccItem) => {
    if (store.equippedAccessories.includes(item.name)) {
      store.unequipAccessory(item.name);
      setShopMsg(`已取下${item.name}`);
    } else {
      const ok = store.buyAccessory(item.name, item.points);
      if (!ok) { setShopMsg(`积分不足！${item.name}需要${item.points}积分`); }
      else { setShopMsg(`✨ ${item.name} 已穿戴！`); }
    }
    setTimeout(() => setShopMsg(''), 2000);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    try {
      const { kcal, name, emoji } = JSON.parse(e.dataTransfer.getData('application/json'));
      handleFeed(kcal, name, emoji);
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
        {/* Pet Avatar with Accessories */}
        <div
          ref={dropRef} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          className={`jelly-card p-5 flex flex-col items-center transition-all duration-300 ${
            dragOver ? 'ring-4 ring-purple-300 scale-[1.02] bg-purple-50/50' : ''
          } ${feedBounce ? 'animate-bounce' : ''} ${shakeHead ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
        >
          <div className="relative">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${activePet.bgColor} flex items-center justify-center p-3 shadow-inner relative overflow-hidden`}>
              <img src={activePet.img} alt={activePet.name}
                className="w-full h-full object-contain drop-shadow-xl relative z-10 transition-transform duration-300"
                style={{ transform: feedBounce ? 'scale(1.3)' : shakeHead ? 'rotate-12' : 'scale(1)' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {feedBounce && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><span className="text-4xl animate-ping">💕</span></div>}
            </div>
            {/* Equipped accessories on pet */}
            {store.equippedAccessories.map((name) => {
              const acc = ACCESSORIES.find((a) => a.name === name);
              return acc ? (
                <span key={acc.name} className={`absolute z-20 text-xl drop-shadow-lg pointer-events-none ${acc.position}`}>
                  {acc.emoji}
                </span>
              ) : null;
            })}
          </div>
          <div className="flex items-center gap-2 text-lg font-bold mt-3">
            <span>{activePet.name}</span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-normal">Lv.{petStatus?.level ?? 5}</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{activePet.desc}</p>
          <div className="text-2xl mt-2 h-8">{petReaction}</div>
          {feedMsg && <p className="text-xs text-accent-purple mt-1 text-center px-2 leading-relaxed">{feedMsg}</p>}
          <div className="w-full mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10 shrink-0">饥饿</span>
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500" style={{ width: `${store.hunger}%` }} />
            </div>
            <span className="text-xs text-gray-400 tabular-nums shrink-0">{Math.round(store.hunger)}%</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <span>💰 {store.points} 积分</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">把食物拖到我身上来喂我吧~</p>
        </div>

        {/* Pet Selector */}
        {showSelector && (
          <div className="jelly-card p-4">
            <p className="text-sm font-semibold mb-3">选择宠物品种</p>
            <div className="grid grid-cols-3 gap-3">
              {PET_TYPES.map((pt) => (
                <button key={pt.id} onClick={() => { store.setActivePet(pt.id); setShowSelector(false); }}
                  className={`p-3 rounded-2xl text-center transition-all active:scale-90 ${
                    store.activePetId === pt.id ? 'bg-gradient-to-br from-blue-100 to-purple-100 ring-2 ring-purple-300 scale-105' : 'bg-gray-50/70 hover:bg-gray-100'
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

        {/* Energy Status */}
        <div className="jelly-card p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold">可用运动能量</p>
              <p className="text-xs text-gray-400 mt-0.5">今日消耗 {dailyStats?.caloriesBurned ?? 850}千卡 → 转化能量</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-extrabold ${remainingEnergy < 50 ? 'text-red-400' : 'text-accent-purple'}`}>{remainingEnergy}</p>
              <p className="text-xs text-gray-400">千卡</p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all" style={{ width: `${Math.min(100, (remainingEnergy/INITIAL_ENERGY)*100)}%` }} />
          </div>
        </div>

        {/* Food */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-2">可兑换食物</p>
          <p className="text-xs text-gray-400 mb-2">拖到宠物身上喂食，或直接点击</p>
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-hide">
            {FOOD_CATS.map((cat) => (
              <button key={cat} onClick={() => { setFoodCat(cat); setShowAllFood(false); }}
                className={`shrink-0 px-3 py-1 rounded-full text-xs transition-all ${foodCat===cat?'bg-purple-100 text-purple-600 font-medium':'bg-gray-100 text-gray-500'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {displayedFoods.map((food) => (
              <div key={food.id} draggable
                onDragStart={(e) => e.dataTransfer.setData('application/json', JSON.stringify({id:food.id,name:food.name,kcal:food.kcal,emoji:food.emoji}))}
                onClick={() => handleFeed(food.kcal, food.name, food.emoji)}
                className={`jelly-btn p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing active:scale-90 ${food.kcal>remainingEnergy?'opacity-40':''}`}>
                <span className="text-2xl select-none">{food.emoji}</span>
                <div className="select-none flex-1 min-w-0"><p className="text-sm font-medium truncate">{food.name}</p><p className="text-xs text-gray-400">{food.kcal}千卡</p></div>
              </div>
            ))}
          </div>
          {filteredFoods.length > 8 && (
            <button onClick={() => setShowAllFood(!showAllFood)} className="w-full mt-3 py-2 jelly-btn text-xs text-accent-purple font-medium">
              {showAllFood ? '收起' : `查看全部 ${filteredFoods.length} 种食物`}
            </button>
          )}
        </div>

        {/* Exercise Log */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">运动日志</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between py-1"><span>今日消耗 {dailyStats?.caloriesBurned ?? 850}千卡</span><span className="text-accent-purple font-medium">→ 获得{Math.round((dailyStats?.caloriesBurned??850)*0.1)}能量</span></div>
            <div className="flex justify-between py-1"><span>连续运动3天</span><span>奖励胡萝卜 🥕</span></div>
          </div>
        </div>

        {/* Accessory Shop */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-1">配饰商店</p>
          <p className="text-xs text-gray-400 mb-3">💰 当前积分: <span className="font-bold text-accent-purple">{store.points}</span></p>
          {shopMsg && <p className="text-xs text-center text-green-500 mb-2">{shopMsg}</p>}
          <div className="grid grid-cols-2 gap-2">
            {ACCESSORIES.map((item) => {
              const owned = store.equippedAccessories.includes(item.name);
              const canAfford = store.points >= item.points;
              return (
                <button key={item.name} onClick={() => handleBuyAccessory(item)}
                  className={`jelly-btn p-3 flex items-center gap-3 text-left active:scale-90 ${owned ? 'ring-2 ring-purple-300 bg-purple-50/50' : ''} ${!canAfford && !owned ? 'opacity-40' : ''}`}>
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.points}积分 {owned ? '✓ 已穿戴' : ''}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={() => navigate('/home')} className="w-full py-3 jelly-btn text-sm text-gray-600 font-medium">
          返回首页
        </button>
      </div>
    </div>
  );
}
