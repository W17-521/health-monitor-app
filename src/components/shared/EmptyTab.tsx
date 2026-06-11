import { SmileySad } from '@phosphor-icons/react';

interface EmptyTabProps {
  title: string;
}

export function EmptyTab({ title }: EmptyTabProps) {
  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center gap-4 text-gray-400">
      <SmileySad size={48} />
      <p className="text-sm">{title}功能即将上线</p>
    </div>
  );
}
