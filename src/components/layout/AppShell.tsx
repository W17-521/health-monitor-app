import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function AppShell() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--color-bg)]">
      <main className="flex-1 pb-20 safe-bottom">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
