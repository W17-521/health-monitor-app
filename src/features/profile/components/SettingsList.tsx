import { useNavigate } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';

const MENU_ITEMS = [
  { label: '目标设定', path: '/profile/settings' },
  { label: '隐私设置', path: '/profile/settings' },
  { label: '提醒通知', path: '/profile/settings' },
  { label: '连接设备', path: '/profile/settings' },
  { label: '关于我们', path: '/profile/settings' },
];

export function SettingsList() {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-4">
      <p className="text-xs text-gray-500 mb-2">设置</p>
      <div className="divide-y divide-gray-50 -mx-4">
        {MENU_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className="flex items-center justify-between w-full py-3 px-4 text-sm text-gray-700 active:bg-gray-50"
          >
            <span>{item.label}</span>
            <CaretRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
