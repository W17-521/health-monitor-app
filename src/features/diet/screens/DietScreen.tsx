import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';
import { formatKcal, formatPercent } from '@/utils/format';

const MEALS = [
  { id: 'breakfast', time: '8:30', label: '早餐', foods: [
    { name: '全麦面包', kcal: 120, carbs: 22, protein: 5, fat: 2 },
    { name: '鸡蛋', kcal: 70, carbs: 1, protein: 6, fat: 5 },
    { name: '牛奶', kcal: 90, carbs: 10, protein: 6, fat: 3 },
  ]},
  { id: 'lunch', time: '12:15', label: '午餐', foods: [
    { name: '鸡胸肉沙拉', kcal: 180, carbs: 10, protein: 30, fat: 5 },
    { name: '杂粮饭', kcal: 150, carbs: 35, protein: 4, fat: 1 },
  ]},
  { id: 'dinner', time: '18:30', label: '晚餐', foods: [
    { name: '清蒸鱼', kcal: 120, carbs: 2, protein: 20, fat: 4 },
    { name: '炒青菜', kcal: 50, carbs: 5, protein: 2, fat: 3 },
  ]},
  { id: 'snack', time: '15:00', label: '加餐', foods: [
    { name: '坚果', kcal: 100, carbs: 4, protein: 3, fat: 8 },
  ]},
];

const FOOD_DB = [
  { name: '全麦面包', kcal: 120, carbs: 22, protein: 5, fat: 2 },
  { name: '白米饭', kcal: 200, carbs: 45, protein: 4, fat: 0 },
  { name: '鸡胸肉', kcal: 150, carbs: 0, protein: 30, fat: 3 },
  { name: '三文鱼', kcal: 180, carbs: 0, protein: 22, fat: 10 },
  { name: '西兰花', kcal: 35, carbs: 5, protein: 3, fat: 0 },
  { name: '苹果', kcal: 52, carbs: 14, protein: 0, fat: 0 },
  { name: '酸奶', kcal: 100, carbs: 12, protein: 5, fat: 3 },
  { name: '燕麦', kcal: 160, carbs: 27, protein: 6, fat: 3 },
  { name: '牛肉', kcal: 200, carbs: 0, protein: 28, fat: 10 },
  { name: '豆腐', kcal: 80, carbs: 3, protein: 8, fat: 4 },
];

export function DietScreen() {
  const navigate = useNavigate();
  const { dietSummary } = useHealthData();
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState(MEALS);

  const totalCalories = meals.reduce((sum, m) => sum + m.foods.reduce((s, f) => s + f.kcal, 0), 0);
  const budget = 1500;
  const remaining = budget - totalCalories;
  const percent = Math.round((totalCalories / budget) * 100);

  const totalCarbs = meals.reduce((sum, m) => sum + m.foods.reduce((s, f) => s + f.carbs, 0), 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.foods.reduce((s, f) => s + f.protein, 0), 0);
  const totalFat = meals.reduce((sum, m) => sum + m.foods.reduce((s, f) => s + f.fat, 0), 0);
  const totalMacro = totalCarbs + totalProtein + totalFat || 1;

  const filteredDB = FOOD_DB.filter((f) => f.name.includes(search));

  const addFood = (food: typeof FOOD_DB[0]) => {
    setMeals((prev) => {
      const updated = [...prev];
      const snackIdx = updated.findIndex((m) => m.id === 'snack');
      if (snackIdx >= 0) {
        updated[snackIdx] = { ...updated[snackIdx], foods: [...updated[snackIdx].foods, food] };
      }
      return updated;
    });
    setShowAdd(false);
    setSearch('');
  };

  return (
    <div>
      <PageHeader
        title="饮食日记"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Budget Bar */}
        <div className="jelly-card p-4">
          <div className="flex justify-between items-end mb-2">
            <div><p className="text-xs text-gray-500">今日预算 {formatKcal(budget)}</p><p className="text-2xl font-extrabold text-gray-800">{Math.round(totalCalories)}<span className="text-sm text-gray-400 font-normal">千卡</span></p></div>
            <div className="text-right"><p className={`text-lg font-bold ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>{remaining >= 0 ? `剩余 ${remaining}` : `超出 ${Math.abs(remaining)}`}</p><p className="text-xs text-gray-400">千卡</p></div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${remaining >= 0 ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-red-400'}`} style={{ width: `${Math.min(100, percent)}%` }} />
          </div>
          <p className="text-xs text-gray-400 text-right mt-1">{percent}%</p>
        </div>

        {/* Meal Timeline */}
        {meals.map((meal) => (
          <div key={meal.id} className="jelly-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-10">{meal.time}</span>
                <span className="text-sm font-semibold">{meal.label}</span>
              </div>
              <span className="text-sm font-bold text-accent-purple">
                {formatKcal(meal.foods.reduce((s, f) => s + f.kcal, 0))}
              </span>
            </div>
            {meal.foods.map((food, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
                <span className="text-gray-700">{food.name}</span>
                <div className="flex gap-2 text-xs text-gray-400">
                  <span>碳水{food.carbs}g</span>
                  <span>蛋白{food.protein}g</span>
                  <span>脂肪{food.fat}g</span>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Add Food */}
        <button onClick={() => setShowAdd(!showAdd)} className="w-full py-3 jelly-btn text-sm text-accent-purple font-medium">
          + 添加加餐 / 晚餐
        </button>

        {showAdd && (
          <div className="jelly-card p-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索食物..." className="w-full jelly-btn px-4 py-2.5 text-sm mb-3 outline-none" />
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {filteredDB.map((food, i) => (
                <button key={i} onClick={() => addFood(food)}
                  className="w-full flex justify-between items-center py-2.5 px-3 text-sm hover:bg-gray-50 rounded-xl transition-colors">
                  <span>{food.name}</span>
                  <span className="text-xs text-gray-400">{formatKcal(food.kcal)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Macro Analysis */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">营养分析</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-blue-500">碳水</span><span className="font-semibold">{totalCarbs}g ({formatPercent(Math.round((totalCarbs/totalMacro)*100))})</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-400 rounded-full" style={{width:`${Math.round((totalCarbs/totalMacro)*100)}%`}}/></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-green-500">蛋白质</span><span className="font-semibold">{totalProtein}g ({formatPercent(Math.round((totalProtein/totalMacro)*100))})</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-400 rounded-full" style={{width:`${Math.round((totalProtein/totalMacro)*100)}%`}}/></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-yellow-500">脂肪</span><span className="font-semibold">{totalFat}g ({formatPercent(Math.round((totalFat/totalMacro)*100))})</span></div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full" style={{width:`${Math.round((totalFat/totalMacro)*100)}%`}}/></div>
            </div>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <span>纤维: 18g</span>
            <span>水分: 1.2L</span>
            <span>钠: 1800mg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
