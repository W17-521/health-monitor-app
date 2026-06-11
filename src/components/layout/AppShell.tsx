import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function AppShell() {
  return (
    <div className="mobile-container flex flex-col">
      <main className="flex-1 pb-20 safe-bottom">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
