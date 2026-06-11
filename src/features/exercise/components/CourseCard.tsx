import { useNavigate } from 'react-router-dom';
import { Clock, Fire, Star } from '@phosphor-icons/react';
import { formatMinutes, formatKcal, formatNumber, difficultyLabel } from '@/utils/format';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/exercise/${course.id}`)}
      className="flex gap-3 bg-white rounded-card p-3 shadow-sm active:scale-[0.99] transition-transform w-full text-left"
    >
      <div className="shrink-0 w-24 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
        <span className="text-3xl">🏃</span>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <p className="text-sm font-semibold truncate">{course.title}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-0.5"><Clock size={12} />{formatMinutes(course.durationMinutes)}</span>
          <span>·</span>
          <span>{difficultyLabel(course.difficulty)}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5"><Fire size={12} />{formatKcal(course.caloriesBurn)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Star size={12} weight="fill" className="text-yellow-400" />
          <span>{course.rating}</span>
          <span>{formatNumber(course.completions)}人练过</span>
        </div>
      </div>
    </button>
  );
}
