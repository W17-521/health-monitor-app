import type { ReactNode } from 'react';

interface MetricCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MetricCard({ children, onClick, className = '' }: MetricCardProps) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      onClick={onClick}
      className={`bg-surface rounded-card p-4 shadow-sm ${onClick ? 'active:scale-[0.98] transition-transform cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
