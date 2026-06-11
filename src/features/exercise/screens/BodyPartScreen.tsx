import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useState } from 'react';

const BODY_PARTS = [
  { id: 'full', label: '全身', top: '40%', left: '50%', courses: ['全身拉伸操','活力有氧体操'] },
  { id: 'chest', label: '胸部', top: '20%', left: '50%', courses: ['力量核心训练','HIIT 高效燃脂'] },
  { id: 'arms', label: '上肢', top: '22%', left: '22%', courses: ['全身拉伸操','流瑜伽 · 柔韧提升'] },
  { id: 'abs', label: '腰腹', top: '38%', left: '50%', courses: ['垫上普拉提','力量核心训练'] },
  { id: 'hips', label: '臀部', top: '52%', left: '50%', courses: ['爆汗燃脂操','HIIT 高效燃脂'] },
  { id: 'legs', label: '腿部', top: '68%', left: '50%', courses: ['晨间唤醒体操','流瑜伽 · 柔韧提升'] },
  { id: 'shoulders', label: '肩部', top: '18%', left: '72%', courses: ['全身拉伸操','晨间唤醒体操'] },
];

export function BodyPartScreen() {
  const navigate = useNavigate();
  const [activePart, setActivePart] = useState<string | null>(null);

  const active = BODY_PARTS.find((p) => p.id === activePart);

  return (
    <div>
      <PageHeader
        title="局部精准训练"
        leftAction={<button onClick={() => navigate(-1)} className="text-sm text-gray-600">← 返回</button>}
      />
      <div className="px-4 space-y-4 pb-8">
        {/* Human Body Silhouette */}
        <div className="glass-card p-6 flex justify-center">
          <div className="relative w-48 h-72">
            {/* Simplified human body outline using divs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 120 200" className="w-full h-full">
                {/* Head */}
                <ellipse
                  cx="60" cy="18" rx="14" ry="16"
                  fill={activePart === 'full' ? '#A78BFA' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart('full')}
                />
                {/* Neck */}
                <rect x="55" y="34" width="10" height="8" fill="#E8ECF4" stroke="#D1D5DB" strokeWidth="0.5" />
                {/* Shoulders - line */}
                <line x1="25" y1="42" x2="95" y2="42" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
                {/* Torso */}
                <rect
                  x="35" y="42" width="50" height="55" rx="10"
                  fill={activePart === 'chest' || activePart === 'abs' || activePart === 'full' ? '#A78BFA' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart(activePart === 'chest' ? 'abs' : 'chest')}
                />
                {/* Left Arm */}
                <rect
                  x="18" y="42" width="14" height="55" rx="7"
                  fill={activePart === 'arms' || activePart === 'shoulders' || activePart === 'full' ? '#7B9FFF' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart(activePart === 'arms' ? 'shoulders' : 'arms')}
                />
                {/* Right Arm */}
                <rect
                  x="88" y="42" width="14" height="55" rx="7"
                  fill={activePart === 'arms' || activePart === 'shoulders' || activePart === 'full' ? '#7B9FFF' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart(activePart === 'shoulders' ? 'arms' : 'shoulders')}
                />
                {/* Left Leg */}
                <rect
                  x="40" y="100" width="16" height="60" rx="8"
                  fill={activePart === 'legs' || activePart === 'full' ? '#A78BFA' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart('legs')}
                />
                {/* Right Leg */}
                <rect
                  x="64" y="100" width="16" height="60" rx="8"
                  fill={activePart === 'legs' || activePart === 'full' ? '#A78BFA' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart('legs')}
                />
                {/* Hip area */}
                <rect
                  x="35" y="97" width="50" height="8" rx="4"
                  fill={activePart === 'hips' || activePart === 'full' ? '#A78BFA' : '#E8ECF4'}
                  stroke="#D1D5DB" strokeWidth="1"
                  className="transition-colors cursor-pointer"
                  onClick={() => setActivePart('hips')}
                />
              </svg>
            </div>

            {/* Labels */}
            {BODY_PARTS.map((part) => (
              <button
                key={part.id}
                onClick={() => setActivePart(part.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-medium px-2 py-0.5 rounded-full transition-all ${
                  activePart === part.id
                    ? 'bg-purple-100 text-purple-600 scale-110'
                    : 'bg-white/80 text-gray-500'
                }`}
                style={{ top: part.top, left: part.left }}
              >
                {part.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        {active && (
          <div className="glass-card p-4">
            <p className="text-sm font-semibold mb-3">{active.label}推荐课程</p>
            <div className="space-y-2">
              {active.courses.map((name) => (
                <button
                  key={name}
                  onClick={() => navigate(`/exercise/c1`)}
                  className="w-full jelly-btn p-3 text-left text-sm font-medium text-gray-700"
                >
                  🏃 {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {!active && (
          <div className="glass-card p-4 text-center text-sm text-gray-400">
            点击人体图上的部位或文字标签，查看对应的训练课程
          </div>
        )}
      </div>
    </div>
  );
}
