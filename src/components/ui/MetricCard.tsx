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
      className={`${onClick ? 'jelly-card' : 'glass-card'} ${className}`}
    >
      {children}
    </Component>
  );
}
