import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { formatKcal, formatPercent } from '@/utils/format';

interface FoodItem { name: string; kcal: number; carbs: number; protein: number; fat: number; grams: number; time: string; }

const INITIAL_MEALS: FoodItem[] = [
  { name: '全麦面包', kcal: 240, carbs: 44, protein: 10, fat: 4, grams: 100, time: '08:30' },
  { name: '鸡蛋', kcal: 140, carbs: 2, protein: 12, fat: 10, grams: 100, time: '08:30' },
  { name: '牛奶', kcal: 90, carbs: 10, protein: 6, fat: 3, grams: 200, time: '08:30' },
  { name: '鸡胸肉沙拉', kcal: 180, carbs: 10, protein: 30, fat: 5, grams: 250, time: '12:15' },
  { name: '杂粮饭', kcal: 150, carbs: 35, protein: 4, fat: 1, grams: 150, time: '12:15' },
  { name: '清蒸鱼', kcal: 120, carbs: 2, protein: 20, fat: 4, grams: 150, time: '18:30' },
  { name: '炒青菜', kcal: 50, carbs: 5, protein: 2, fat: 3, grams: 200, time: '18:30' },
  { name: '坚果', kcal: 100, carbs: 4, protein: 3, fat: 8, grams: 20, time: '15:00' },
];

const FOOD_DB: { name: string; kcalPer100g: number; carbs: number; protein: number; fat: number; cat: string }[] = [
  { name: '全麦面包', kcalPer100g: 240, carbs: 44, protein: 10, fat: 4, cat: '主食' },
  { name: '白米饭', kcalPer100g: 130, carbs: 28, protein: 3, fat: 0, cat: '主食' },
  { name: '杂粮饭', kcalPer100g: 100, carbs: 23, protein: 3, fat: 1, cat: '主食' },
  { name: '燕麦', kcalPer100g: 370, carbs: 66, protein: 14, fat: 7, cat: '主食' },
  { name: '红薯', kcalPer100g: 86, carbs: 20, protein: 2, fat: 0, cat: '主食' },
  { name: '意大利面', kcalPer100g: 130, carbs: 25, protein: 5, fat: 1, cat: '主食' },
  { name: '馒头', kcalPer100g: 220, carbs: 45, protein: 7, fat: 1, cat: '主食' },
  { name: '鸡胸肉', kcalPer100g: 150, carbs: 0, protein: 30, fat: 3, cat: '蛋白质' },
  { name: '三文鱼', kcalPer100g: 200, carbs: 0, protein: 22, fat: 12, cat: '蛋白质' },
  { name: '牛肉', kcalPer100g: 200, carbs: 0, protein: 28, fat: 10, cat: '蛋白质' },
  { name: '鸡蛋', kcalPer100g: 140, carbs: 2, protein: 12, fat: 10, cat: '蛋白质' },
  { name: '虾仁', kcalPer100g: 100, carbs: 0, protein: 20, fat: 1, cat: '蛋白质' },
  { name: '豆腐', kcalPer100g: 80, carbs: 3, protein: 8, fat: 4, cat: '蛋白质' },
  { name: '酸奶', kcalPer100g: 100, carbs: 12, protein: 5, fat: 3, cat: '蛋白质' },
  { name: '西兰花', kcalPer100g: 35, carbs: 5, protein: 3, fat: 0, cat: '蔬菜' },
  { name: '菠菜', kcalPer100g: 23, carbs: 3, protein: 3, fat: 0, cat: '蔬菜' },
  { name: '番茄', kcalPer100g: 18, carbs: 4, protein: 1, fat: 0, cat: '蔬菜' },
  { name: '黄瓜', kcalPer100g: 15, carbs: 3, protein: 1, fat: 0, cat: '蔬菜' },
  { name: '胡萝卜', kcalPer100g: 37, carbs: 9, protein: 1, fat: 0, cat: '蔬菜' },
  { name: '芹菜', kcalPer100g: 14, carbs: 3, protein: 1, fat: 0, cat: '蔬菜' },
  { name: '苹果', kcalPer100g: 52, carbs: 14, protein: 0, fat: 0, cat: '水果' },
  { name: '香蕉', kcalPer100g: 90, carbs: 22, protein: 1, fat: 0, cat: '水果' },
  { name: '橙子', kcalPer100g: 47, carbs: 11, protein: 1, fat: 0, cat: '水果' },
  { name: '葡萄', kcalPer100g: 67, carbs: 17, protein: 1, fat: 0, cat: '水果' },
  { name: '牛油果', kcalPer100g: 160, carbs: 8, protein: 2, fat: 15, cat: '水果' },
  { name: '牛奶', kcalPer100g: 45, carbs: 4, protein: 3, fat: 2, cat: '饮品' },
  { name: '豆浆', kcalPer100g: 30, carbs: 2, protein: 3, fat: 1, cat: '饮品' },
  { name: '橙汁', kcalPer100g: 45, carbs: 10, protein: 1, fat: 0, cat: '饮品' },
  { name: '坚果', kcalPer100g: 500, carbs: 20, protein: 15, fat: 40, cat: '零食' },
  { name: '黑巧克力', kcalPer100g: 550, carbs: 50, protein: 8, fat: 35, cat: '零食' },
];

const FOOD_CATS = ['全部','主食','蛋白质','蔬菜','水果','饮品','零食'];
const TIMES = ['06:00','07:00','08:00','08:30','09:00','10:00','12:00','12:15','13:00','15:00','16:00','17:00','18:00','18:30','19:00','20:00','21:00'];

export function DietScreen() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<FoodItem[]>(INITIAL_MEALS);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('全部');
  const [addGrams, setAddGrams] = useState(100);
  const [addTime, setAddTime] = useState('12:00');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editGrams, setEditGrams] = useState(100);

  const totalCalories = meals.reduce((s, f) => s + f.kcal, 0);
  const budget = 1500;
  const remaining = budget - totalCalories;
  const totalCarbs = meals.reduce((s, f) => s + f.carbs, 0);
  const totalProtein = meals.reduce((s, f) => s + f.protein, 0);
  const totalFat = meals.reduce((s, f) => s + f.fat, 0);
  const macro = totalCarbs + totalProtein + totalFat || 1;

  const filtered = cat === '全部' ? FOOD_DB : FOOD_DB.filter((f) => f.cat === cat);
  const searched = search ? filtered.filter((f) => f.name.includes(search)) : filtered;

  const byTime = (a: FoodItem, b: FoodItem) => a.time.localeCompare(b.time);

  const addFood = (food: typeof FOOD_DB[0]) => {
    const ratio = addGrams / 100;
    setMeals((prev) => [...prev, {
      name: food.name, grams: addGrams, time: addTime,
      kcal: Math.round(food.kcalPer100g * ratio),
      carbs: Math.round(food.carbs * ratio),
      protein: Math.round(food.protein * ratio),
      fat: Math.round(food.fat * ratio),
    }].sort(byTime));
    setShowAdd(false); setSearch('');
  };

  const updateGrams = (idx: number, newGrams: number) => {
    setMeals((prev) => prev.map((m, i) => {
      if (i !== idx) return m;
      const ratio = newGrams / m.grams;
      return { ...m, grams: newGrams, kcal: Math.round(m.kcal * ratio), carbs: Math.round(m.carbs * ratio), protein: Math.round(m.protein * ratio), fat: Math.round(m.fat * ratio) };
    }));
    setEditingIdx(null);
  };

  const removeFood = (idx: number) => setMeals((prev) => prev.filter((_, i) => i !== idx));

  const grouped = meals.reduce<Record<string, FoodItem[]>>((acc, m) => {
    const t = m.time.slice(0, 2); const key = t < '11' ? '早餐' : t < '14' ? '午餐' : t < '17' ? '下午' : '晚餐';
    (acc[key] ??= []).push(m); return acc;
  }, {});

  return (
    <div>
      <PageHeader title="饮食日记" leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>} />
      <div className="px-4 space-y-4 pb-8">
        {/* Budget */}
        <div className="jelly-card p-4">
          <div className="flex justify-between items-end mb-2">
            <div><p className="text-xs text-gray-500">今日预算 {formatKcal(budget)}</p><p className="text-2xl font-extrabold">{Math.round(totalCalories)}<span className="text-sm text-gray-400 font-normal">千卡</span></p></div>
            <div className="text-right"><p className={`text-lg font-bold ${remaining>=0?'text-green-500':'text-red-500'}`}>{remaining>=0?`剩余 ${remaining}`:`超出 ${Math.abs(remaining)}`}</p><p className="text-xs text-gray-400">千卡</p></div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${remaining>=0?'bg-gradient-to-r from-blue-400 to-purple-400':'bg-red-400'}`} style={{width:`${Math.min(100,(totalCalories/budget)*100)}%`}}/></div>
        </div>

        {/* Meal groups */}
        {Object.entries(grouped).map(([label, items]) => (
          <div key={label} className="jelly-card p-4">
            <p className="text-sm font-semibold mb-2">{label} · {items[0].time}</p>
            {items.map((food, i) => {
              const gIdx = meals.indexOf(food);
              return (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <button onClick={() => { setEditingIdx(gIdx); setEditGrams(food.grams); }} className="flex-1 text-left text-sm text-gray-700">
                    <span>{food.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{food.grams}g</span>
                  </button>
                  <span className="text-sm font-medium text-accent-purple mr-2">{formatKcal(food.kcal)}</span>
                  <button onClick={() => removeFood(gIdx)} className="text-xs text-red-300 active:text-red-500">✕</button>
                </div>
              );
            })}
          </div>
        ))}

        {/* Edit grams modal */}
        {editingIdx !== null && meals[editingIdx] && (
          <div className="jelly-card p-4">
            <p className="text-sm font-semibold mb-2">修改: {meals[editingIdx].name}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">克数:</span>
              <input type="range" min={10} max={500} step={10} value={editGrams} onChange={(e) => setEditGrams(Number(e.target.value))} className="flex-1 accent-purple-500" />
              <span className="text-sm font-bold w-14 text-right">{editGrams}g</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => setEditingIdx(null)} className="flex-1 py-2 jelly-btn text-sm">取消</button>
              <button onClick={() => updateGrams(editingIdx, editGrams)} className="flex-1 py-2.5 jelly-btn-primary text-sm">保存</button>
            </div>
          </div>
        )}

        <button onClick={() => setShowAdd(!showAdd)} className="w-full py-3 jelly-btn text-sm text-accent-purple font-medium">+ 添加食物</button>

        {/* Add food panel */}
        {showAdd && (
          <div className="jelly-card p-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索食物..." className="w-full jelly-btn px-4 py-2.5 text-sm mb-3 outline-none" />
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-hide">
              {FOOD_CATS.map((c) => <button key={c} onClick={() => setCat(c)} className={`shrink-0 px-3 py-1 rounded-full text-xs ${cat===c?'bg-purple-100 text-purple-600 font-medium':'bg-gray-100 text-gray-500'}`}>{c}</button>)}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">时间:</span>
              <select value={addTime} onChange={(e) => setAddTime(e.target.value)} className="jelly-btn px-2 py-1 text-xs outline-none">
                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="text-xs text-gray-500 ml-3">克重:</span>
              <input type="range" min={10} max={500} step={10} value={addGrams} onChange={(e) => setAddGrams(Number(e.target.value))} className="flex-1 accent-purple-500" />
              <span className="text-xs font-bold w-12">{addGrams}g</span>
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {searched.slice(0, 12).map((food, i) => (
                <button key={i} onClick={() => addFood(food)}
                  className="w-full flex justify-between items-center py-2.5 px-3 text-sm hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="text-left"><span>{food.name}</span><span className="text-xs text-gray-400 ml-2">{food.kcalPer100g}kcal/100g</span></div>
                  <span className="text-xs text-gray-400">{Math.round(food.kcalPer100g * addGrams / 100)}千卡</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">营养分析</p>
          <div className="space-y-3">
            {([['碳水','blue',totalCarbs],['蛋白质','green',totalProtein],['脂肪','yellow',totalFat]] as const).map(([label,color,val]) => (
              <div key={label}><div className="flex justify-between text-sm mb-1"><span className={`text-${color}-500`}>{label}</span><span className="font-semibold">{val}g ({formatPercent(Math.round((val/macro)*100))})</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full bg-${color}-400 rounded-full`} style={{width:`${Math.round((val/macro)*100)}%`}}/></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
