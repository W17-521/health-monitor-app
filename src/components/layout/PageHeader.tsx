import type { ReactNode } from 'react';

interface PageHeaderProps {
  title?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export function PageHeader({ title, leftAction, rightAction, transparent }: PageHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between h-12 px-4 ${
        transparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-lg border-b border-gray-100'
      }`}
    >
      <div className="flex-1 min-w-0 flex items-center">{leftAction}</div>
      {title && <h1 className="flex-none text-base font-semibold truncate mx-2">{title}</h1>}
      <div className="flex-1 min-w-0 flex items-center justify-end">{rightAction}</div>
    </header>
  );
}
