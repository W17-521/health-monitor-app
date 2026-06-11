import { MetricCard } from '@/components/ui';
import type { PetStatus } from '@/types';

interface PetCardProps {
  pet: PetStatus;
}

const MOOD_EMOJI: Record<PetStatus['mood'], string> = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
};

const TYPE_EMOJI: Record<PetStatus['type'], string> = {
  dog: '🐶',
  cat: '🐱',
};

export function PetCard({ pet }: PetCardProps) {
  return (
    <MetricCard>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{TYPE_EMOJI[pet.type]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{pet.name}</span>
            <span className="text-xs text-gray-400">Lv.{pet.level}</span>
            <span>{MOOD_EMOJI[pet.mood]}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">饥饿</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${pet.hunger}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{pet.hunger}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">今天动够了吗？喂我 →</p>
        </div>
      </div>
    </MetricCard>
  );
}
