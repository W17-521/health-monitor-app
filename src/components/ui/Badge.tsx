interface BadgeProps {
  label: string;
  color?: string;
  className?: string;
}

export function Badge({ label, color, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${className}`}
      style={color ? { backgroundColor: color + '20', color } : undefined}
    >
      {label}
    </span>
  );
}
