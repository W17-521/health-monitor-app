import type { ReactNode } from 'react';

interface StatBadgeProps {
  icon: ReactNode;
  value: string;
  label: string;
  color?: string;
}

export function StatBadge({ icon, value, label, color }: StatBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5" style={color ? { color } : undefined}>
        <span className="text-lg">{icon}</span>
        <span className="text-lg font-bold tabular-nums">{value}</span>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
