import { useNavigate } from 'react-router-dom';
import { Clock, Fire } from '@phosphor-icons/react';
import { formatMinutes, formatKcal } from '@/utils/format';
import type { Course } from '@/types';

interface CourseRecommendProps {
  courses: Course[];
}

export function CourseRecommend({ courses }: CourseRecommendProps) {
  const navigate = useNavigate();
  const top3 = courses.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between px-0 py-3">
        <h3 className="text-sm font-semibold">今日课程推荐</h3>
        <button onClick={() => navigate('/exercise')} className="text-xs text-primary font-medium">
          更多 →
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {top3.map((course) => (
          <button
            key={course.id}
            onClick={() => navigate(`/exercise/${course.id}`)}
            className="shrink-0 w-36 bg-white rounded-card shadow-sm overflow-hidden active:scale-[0.98] transition-transform"
          >
            <div className="h-20 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-2xl">🏃</span>
            </div>
            <div className="p-3 text-left">
              <p className="text-xs font-semibold truncate">{course.title}</p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500">
                <span className="flex items-center gap-0.5"><Clock size={10} /> {formatMinutes(course.durationMinutes)}</span>
                <span className="flex items-center gap-0.5"><Fire size={10} /> {formatKcal(course.caloriesBurn)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
