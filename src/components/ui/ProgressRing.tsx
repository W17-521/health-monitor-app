interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function ProgressRing({
  percent,
  size = 140,
  strokeWidth = 10,
  color = 'url(#ringGradient)',
  trackColor = '#E8ECF4',
  children,
  onClick,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference * (1 - clamped / 100);
  const id = `ring-${Math.random().toString(36).slice(2, 8)}`;

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`relative inline-flex items-center justify-center ${onClick ? 'active:scale-[0.97] transition-transform cursor-pointer' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B9FFF" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={trackColor} strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </Component>
  );
}
