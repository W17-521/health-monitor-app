import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';

function GoalSettings() {
  return (
    <div className="space-y-4">
      <div className="jelly-card p-4">
        <p className="text-sm font-semibold mb-3">每日目标</p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">卡路里目标</span><span className="font-bold text-purple-500">1200千卡</span></div>
            <input type="range" min={500} max={3000} step={100} defaultValue={1200} className="w-full accent-purple-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">步数目标</span><span className="font-bold text-blue-500">8000步</span></div>
            <input type="range" min={2000} max={20000} step={1000} defaultValue={8000} className="w-full accent-blue-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">运动时长</span><span className="font-bold text-green-500">45分钟</span></div>
            <input type="range" min={10} max={120} step={5} defaultValue={45} className="w-full accent-green-500" />
          </div>
        </div>
        <button className="w-full mt-4 py-2.5 jelly-btn-primary text-sm">保存目标</button>
      </div>
    </div>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-4">
      <div className="jelly-card p-4">
        <p className="text-sm font-semibold mb-3">隐私设置</p>
        <label className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-sm text-gray-600">公开运动记录</span><input type="checkbox" defaultChecked className="accent-purple-500" /></label>
        <label className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-sm text-gray-600">公开体重数据</span><input type="checkbox" className="accent-purple-500" /></label>
        <label className="flex items-center justify-between py-3 border-b border-gray-100"><span className="text-sm text-gray-600">允许他人关注</span><input type="checkbox" defaultChecked className="accent-purple-500" /></label>
        <label className="flex items-center justify-between py-3"><span className="text-sm text-gray-600">隐身模式</span><input type="checkbox" className="accent-purple-500" /></label>
        <button className="w-full mt-3 py-2.5 jelly-btn-primary text-sm">保存设置</button>
      </div>
    </div>
  );
}

function ReminderSettings() {
  return (
    <div className="space-y-4">
      <div className="jelly-card p-4">
        <p className="text-sm font-semibold mb-3">提醒通知</p>
        <label className="flex items-center justify-between py-3 border-b border-gray-100"><div><span className="text-sm text-gray-600">每日运动提醒</span><p className="text-xs text-gray-400">每天晚上8:00提醒</p></div><input type="checkbox" defaultChecked className="accent-purple-500" /></label>
        <label className="flex items-center justify-between py-3 border-b border-gray-100"><div><span className="text-sm text-gray-600">饮水提醒</span><p className="text-xs text-gray-400">每2小时提醒一次</p></div><input type="checkbox" className="accent-purple-500" /></label>
        <label className="flex items-center justify-between py-3 border-b border-gray-100"><div><span className="text-sm text-gray-600">经期提醒</span><p className="text-xs text-gray-400">提前2天提醒</p></div><input type="checkbox" defaultChecked className="accent-purple-500" /></label>
        <label className="flex items-center justify-between py-3"><div><span className="text-sm text-gray-600">久坐提醒</span><p className="text-xs text-gray-400">每小时提醒站立</p></div><input type="checkbox" className="accent-purple-500" /></label>
      </div>
    </div>
  );
}

function DeviceSettings() {
  return (
    <div className="space-y-4">
      <div className="jelly-card p-4">
        <p className="text-sm font-semibold mb-3">连接设备</p>
        <p className="text-xs text-gray-400 mb-3">支持品牌: 华为 · 小米 · Apple Watch · Garmin · Fitbit</p>
        <button className="w-full py-3 jelly-btn-primary text-sm mb-2">🔍 搜索附近设备</button>
        <div className="mt-3 space-y-2">
          <div className="jelly-btn p-3 flex items-center justify-between">
            <div><p className="text-sm font-medium">HUAWEI WATCH GT 4</p><p className="text-xs text-gray-400">上次同步: 2小时前 · 电量82%</p></div>
            <span className="text-xs text-green-500 font-medium">已连接</span>
          </div>
          <div className="jelly-btn p-3 flex items-center justify-between">
            <div><p className="text-sm font-medium">小米体脂秤 2</p><p className="text-xs text-gray-400">上次同步: 1天前 · 电量65%</p></div>
            <span className="text-xs text-gray-400">未连接</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSettings() {
  return (
    <div className="space-y-4">
      <div className="jelly-card p-4 text-center">
        <p className="text-lg font-bold text-gray-800">健康监测</p>
        <p className="text-sm text-gray-500 mt-1">Health Monitor App</p>
        <p className="text-xs text-gray-400 mt-2">版本 1.0.0 · Phase A</p>
        <p className="text-xs text-gray-400 mt-4">基于 React 18 + Vite + Tailwind CSS 构建</p>
        <p className="text-xs text-gray-400 mt-1">© 2026 Health Monitor</p>
      </div>
    </div>
  );
}

const PAGES: Record<string, { title: string; Component: () => JSX.Element }> = {
  goal: { title: '目标设定', Component: GoalSettings },
  privacy: { title: '隐私设置', Component: PrivacySettings },
  reminders: { title: '提醒通知', Component: ReminderSettings },
  device: { title: '连接设备', Component: DeviceSettings },
  about: { title: '关于我们', Component: AboutSettings },
};

export function SettingsScreen() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const page = section && PAGES[section] ? PAGES[section] : { title: '设置', Component: () => (
    <div className="jelly-card p-4 text-center text-sm text-gray-400">请从左侧选择一个设置项</div>
  )};
  const { Component } = page;

  return (
    <div>
      <PageHeader
        title={page.title}
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 pb-8">
        <Component />
      </div>
    </div>
  );
}
