import type { ReactNode } from 'react';

interface MetricCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MetricCard({ children, onClick, className = '' }: MetricCardProps) {
  const base = 'jelly-card w-full text-left p-4';
  const Component = onClick ? 'button' : 'div';
  return (
    <Component onClick={onClick} className={`${base} ${className}`}>
      {children}
    </Component>
  );
}
