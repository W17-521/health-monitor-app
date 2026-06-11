import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useExerciseData } from '@/hooks/useExerciseData';
import { Clock, Fire, Star, Lightning } from '@phosphor-icons/react';
import { formatMinutes, formatKcal, formatNumber, difficultyLabel } from '@/utils/format';
import { useMemo } from 'react';

export function ExerciseDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses } = useExerciseData();
  const course = useMemo(() => courses.find((c) => c.id === id), [courses, id]);

  if (!course) {
    return (
      <div>
        <PageHeader
          title="课程详情"
          leftAction={<button onClick={() => navigate(-1)} className="text-gray-700 text-sm">← 返回</button>}
        />
        <div className="p-8 text-center text-gray-400">课程未找到</div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={course.title}
        leftAction={<button onClick={() => navigate(-1)} className="text-gray-700 text-sm">← 返回</button>}
      />

      <div className="px-4 space-y-4 pb-8">
        <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-card h-48 flex items-center justify-center">
          <span className="text-6xl">🏃‍♀️</span>
        </div>

        <div className="bg-white rounded-card p-4 shadow-sm">
          <h2 className="text-lg font-bold">{course.title}</h2>
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Clock size={16} />{formatMinutes(course.durationMinutes)}</span>
            <span className="flex items-center gap-1"><Fire size={16} />{formatKcal(course.caloriesBurn)}</span>
            <span className="flex items-center gap-1"><Lightning size={16} />{difficultyLabel(course.difficulty)}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
            <Star size={16} weight="fill" className="text-yellow-400" />
            <span>{course.rating}</span>
            <span>· {formatNumber(course.completions)}人练过</span>
          </div>
        </div>

        <button className="w-full py-3.5 bg-primary text-white rounded-btn text-base font-semibold active:scale-[0.98] transition-transform shadow-lg shadow-primary/30">
          开始训练
        </button>

        <p className="text-xs text-center text-gray-400">训练中界面将在后续版本中提供</p>
      </div>
    </div>
  );
}
