import type { ReactNode } from 'react';

interface StatBadgeProps {
  icon: ReactNode;
  value: string;
  label: string;
  color?: string;
  onClick?: () => void;
}

export function StatBadge({ icon, value, label, color, onClick }: StatBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${onClick ? 'active:scale-[0.96] transition-transform' : ''}`}
    >
      <div className="flex items-center gap-1.5" style={color ? { color } : undefined}>
        <span className="text-lg">{icon}</span>
        <span className="text-lg font-bold tabular-nums">{value}</span>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </button>
  );
}
