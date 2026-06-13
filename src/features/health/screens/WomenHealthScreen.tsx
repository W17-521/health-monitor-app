import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useHealthData } from '@/hooks/useHealthData';

const SYMPTOMS = ['痛经','腰痛','头痛','情绪波动','疲劳','腹胀','乳房胀痛','食欲变化'];
const FLOWS = ['少量','中量','大量','超大量'];

export function WomenHealthScreen() {
  const navigate = useNavigate();
  const { womenHealth } = useHealthData();

  const [cycleLength, setCycleLength] = useState(womenHealth?.cycleLength ?? 28);
  const [periodLength, setPeriodLength] = useState(womenHealth?.periodLength ?? 5);
  const [cycleStartDay, setCycleStartDay] = useState(womenHealth?.cycleDay ?? 3);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [flow, setFlow] = useState('');
  const [mood, setMood] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const today = new Date();
  const cycleStart = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - cycleStartDay + 1);
    return d;
  }, [cycleStartDay]);

  const days = useMemo(() => {
    const result: { day: number; type: string; date: Date }[] = [];
    for (let i = 0; i < cycleLength; i++) {
      const d = new Date(cycleStart);
      d.setDate(d.getDate() + i);
      let type = 'safe';
      if (i < periodLength) type = 'period';
      else if (i >= 12 && i <= 16) type = 'ovulation';
      else if (i >= 8 && i <= 18) type = 'danger';
      result.push({ day: i + 1, type, date: d });
    }
    return result;
  }, [cycleStart, cycleLength, periodLength]);

  const toggleSymptom = (s: string) => {
    setSymptoms((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSaveCycle = () => {
    setSavedMsg('周期设置已更新 ✓');
    setShowSettings(false);
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const typeColor: Record<string, string> = {
    period: 'bg-pink-100 text-pink-600 border-pink-200',
    ovulation: 'bg-purple-100 text-purple-600 border-purple-200',
    danger: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    safe: 'bg-green-50 text-green-600 border-green-200',
  };
  const typeLabel: Record<string, string> = {
    period: '经期', ovulation: '排卵期', danger: '危险期', safe: '安全期',
  };

  return (
    <div>
      <PageHeader
        title="女性健康"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Cycle Overview */}
        <div className="jelly-card p-4">
          <div className="flex justify-around text-center">
            <div><p className="text-2xl font-bold text-pink-500">{cycleStartDay}</p><p className="text-xs text-gray-400">当前第几天</p></div>
            <div><p className="text-2xl font-bold text-purple-500">{cycleLength}</p><p className="text-xs text-gray-400">周期天数</p></div>
            <div><p className="text-2xl font-bold text-blue-500">{periodLength}</p><p className="text-xs text-gray-400">经期天数</p></div>
          </div>
          <button onClick={() => setShowSettings(!showSettings)} className="w-full mt-3 py-2 jelly-btn text-sm text-accent-purple font-medium">
            {showSettings ? '收起设置' : '修改周期设置'}
          </button>
          {savedMsg && <p className="text-xs text-green-500 text-center mt-2">{savedMsg}</p>}
        </div>

        {/* Cycle Settings */}
        {showSettings && (
          <div className="jelly-card p-4 space-y-4">
            <p className="text-sm font-semibold">周期设置</p>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>周期天数</span><span className="font-bold text-purple-500">{cycleLength}天</span></div>
              <input type="range" min={21} max={40} value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} className="w-full accent-purple-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>经期天数</span><span className="font-bold text-pink-500">{periodLength}天</span></div>
              <input type="range" min={2} max={10} value={periodLength} onChange={(e) => setPeriodLength(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span>当前周期第几天</span><span className="font-bold text-blue-500">{cycleStartDay}天</span></div>
              <input type="range" min={1} max={cycleLength} value={cycleStartDay} onChange={(e) => setCycleStartDay(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div className="flex gap-2">
              <input type="date" className="flex-1 jelly-btn px-3 py-2 text-sm rounded-xl" onChange={(e) => {
                if (e.target.value) {
                  const picked = new Date(e.target.value);
                  const diff = Math.round((today.getTime() - picked.getTime()) / 86400000) + 1;
                  if (diff >= 1 && diff <= cycleLength) setCycleStartDay(diff);
                }
              }} />
              <span className="text-xs text-gray-400 self-center">选择末次经期首日</span>
            </div>
            <button onClick={handleSaveCycle} className="w-full py-2.5 jelly-btn-primary text-sm">保存设置</button>
          </div>
        )}

        {/* Calendar */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-3">{cycleStart.getFullYear()}年{cycleStart.getMonth()+1}月 周期日历</p>
          <div className="grid grid-cols-7 gap-1">
            {['一','二','三','四','五','六','日'].map((d) => (
              <div key={d} className="text-center text-[10px] text-gray-400 py-1">{d}</div>
            ))}
            {days.map((d) => (
              <button key={d.day} onClick={() => setSelectedDate(d.day)}
                className={`text-center py-1.5 text-xs rounded-lg border transition-all ${typeColor[d.type]} ${selectedDate===d.day?'ring-2 ring-purple-400 scale-110':''}`}>
                {d.day}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-3 text-[10px] justify-center flex-wrap">
            {(['period','ovulation','danger','safe'] as const).map((t) => (
              <div key={t} className="flex items-center gap-1"><div className={`w-3 h-3 rounded ${typeColor[t].split(' ')[0]}`}/><span className="text-gray-500">{typeLabel[t]}</span></div>
            ))}
          </div>
        </div>

        {/* Symptom Tracking */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-2">症状记录</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {SYMPTOMS.map((s) => (
              <button key={s} onClick={() => toggleSymptom(s)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${symptoms.includes(s)?'bg-pink-100 text-pink-600 font-medium':'bg-gray-50 text-gray-500 jelly-btn'}`}>
                {s}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-2">流量</p>
          <div className="flex gap-2 flex-wrap">
            {FLOWS.map((f) => (
              <button key={f} onClick={() => setFlow(f)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${flow===f?'bg-pink-100 text-pink-600 font-medium':'bg-gray-50 text-gray-500 jelly-btn'}`}>
                {f}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 mb-2">心情</p>
          <div className="flex gap-2 text-xl">
            {['😊','😐','😢','😡','😴'].map((e) => (
              <button key={e} onClick={() => setMood(e)}
                className={`p-2 rounded-full transition-all ${mood===e?'bg-purple-100 scale-125':'grayscale hover:grayscale-0'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div className="jelly-card p-4">
          <p className="text-sm font-semibold mb-2">提醒通知</p>
          <label className="flex items-center justify-between py-2"><span className="text-sm text-gray-600">经期将至提醒</span><input type="checkbox" defaultChecked className="accent-purple-500"/></label>
          <label className="flex items-center justify-between py-2"><span className="text-sm text-gray-600">排卵期提醒</span><input type="checkbox" defaultChecked className="accent-purple-500"/></label>
          <label className="flex items-center justify-between py-2"><span className="text-sm text-gray-600">症状记录提醒</span><input type="checkbox" className="accent-purple-500"/></label>
          <button className="w-full mt-3 py-2.5 jelly-btn-primary text-sm">导出趋势报告</button>
        </div>
      </div>
    </div>
  );
}
