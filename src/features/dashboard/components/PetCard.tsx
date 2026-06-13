import { useNavigate } from 'react-router-dom';
import { MetricCard } from '@/components/ui';
import { usePetStore } from '@/stores/petStore';

const PET_TYPES: Record<string, { name: string; emoji: string }> = {
  corgi: { name: '小柯基', emoji: '🐶' },
  cat: { name: '小猫咪', emoji: '🐱' },
  bunny: { name: '小兔子', emoji: '🐰' },
  hamster: { name: '小仓鼠', emoji: '🐹' },
  panda: { name: '小熊猫', emoji: '🐼' },
  fox: { name: '小狐狸', emoji: '🦊' },
};

export function PetCard() {
  const navigate = useNavigate();
  const { activePetId, hunger, points } = usePetStore();
  const pet = PET_TYPES[activePetId] ?? PET_TYPES.corgi;

  return (
    <MetricCard onClick={() => navigate('/pet')}>
      <div className="flex items-center gap-4 w-full">
        <div className="text-4xl shrink-0">{pet.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{pet.name}</span>
            <span className="text-xs text-gray-400">💰{points}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10 shrink-0">饥饿</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all" style={{ width: `${hunger}%` }} />
            </div>
            <span className="text-xs text-gray-400 tabular-nums shrink-0">{Math.round(hunger)}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">今天动够了吗？喂我 →</p>
        </div>
      </div>
    </MetricCard>
  );
}
