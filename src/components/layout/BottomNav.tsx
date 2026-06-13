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
  { path: '/diet', label: '饮食', icon: (a) => <ForkKnifeIcon size={24} weight={a ? 'fill' : 'regular'} /> },
  { path: '/community', label: '广场', icon: (a) => <UsersIcon size={24} weight={a ? 'fill' : 'regular'} /> },
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
      className="fixed bottom-0 z-50 flex justify-around items-end w-full max-w-[430px]"
      style={{
        paddingBottom: 'var(--safe-area-bottom)',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(123,159,255,0.12)',
      }}
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
            <div className={isActive ? 'text-accent-purple' : 'text-gray-400'}>
              {tab.icon(isActive)}
            </div>
            <span className={`text-[10px] leading-none ${
              isActive ? 'text-accent-purple font-semibold' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
