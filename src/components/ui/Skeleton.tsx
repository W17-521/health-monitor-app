interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = 20, rounded = '8px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{ width, height, borderRadius: rounded }}
    />
  );
}
