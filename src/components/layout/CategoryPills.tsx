interface CategoryPillsProps {
  items: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export function CategoryPills({ items, active, onChange }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            active === item.key
              ? 'text-white bg-primary'
              : 'text-gray-600 bg-gray-100 active:bg-gray-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
