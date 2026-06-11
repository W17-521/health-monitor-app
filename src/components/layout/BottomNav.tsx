import { useLocation, useNavigate } from 'react-router-dom';
import { HouseIcon, ActivityIcon, ForkKnifeIcon, UsersIcon, UserIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Tab {
  path: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  disabled?: boolean;
}

const TABS: Tab[] = [
  { path: '/home', label: '首页', icon: (a) => <HouseIcon size={24} weight={a ? 'fill' : 'regular'} /> },
  { path: '/exercise', label: '运动', icon: (a) => <ActivityIcon size={24} weight={a ? 'fill' : 'regular'} /> },
  { path: '/diet', label: '饮食', icon: (a) => <ForkKnifeIcon size={24} weight={a ? 'fill' : 'regular'} />, disabled: true },
  { path: '/community', label: '广场', icon: (a) => <UsersIcon size={24} weight={a ? 'fill' : 'regular'} />, disabled: true },
  { path: '/profile', label: '我的', icon: (a) => <UserIcon size={24} weight={a ? 'fill' : 'regular'} /> },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTap = (tab: Tab) => {
    if (tab.disabled) return;
    navigate(tab.path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex justify-around items-end"
      style={{ paddingBottom: 'var(--safe-area-bottom)' }}
    >
      {TABS.map((tab) => {
        const isActive = pathname.startsWith(tab.path) && !tab.disabled;
        return (
          <button
            key={tab.path}
            onClick={() => handleTap(tab)}
            className={`relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-0 ${
              tab.disabled ? 'opacity-35' : ''
            }`}
          >
            <div className={isActive ? 'text-primary' : 'text-gray-400'}>
              {tab.icon(isActive)}
            </div>
            <span
              className={`text-[10px] leading-none ${
                isActive ? 'text-primary font-semibold' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
