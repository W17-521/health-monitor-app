import { MagnifyingGlass } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, CategoryPills } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { useExerciseData } from '@/hooks/useExerciseData';
import { CourseCard } from '../components/CourseCard';
import { CustomPlanCard } from '../components/CustomPlanCard';
import type { ExerciseCategory } from '@/types';

const CATEGORIES: { key: ExerciseCategory; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'fat-burn', label: '燃脂' },
  { key: 'yoga', label: '瑜伽' },
  { key: 'gymnastics', label: '体操' },
  { key: 'strength', label: '力量' },
];

export function ExerciseScreen() {
  const navigate = useNavigate();
  const { courses, category, setCategory, fetchCourses, isLoading } = useExerciseData();

  const handleCategoryChange = (key: string) => {
    setCategory(key as ExerciseCategory);
    fetchCourses(key as ExerciseCategory);
  };

  return (
    <div>
      <PageHeader
        title="跟练体操"
        rightAction={<MagnifyingGlass size={22} className="text-gray-700" />}
        leftAction={
          <button onClick={() => navigate(-1)} className="text-gray-700 text-sm">←</button>
        }
      />

      <CategoryPills items={CATEGORIES} active={category} onChange={handleCategoryChange} />

      <div className="px-4 space-y-3 pb-4">
        {isLoading ? (
          <>
            <Skeleton height={100} />
            <Skeleton height={100} />
            <Skeleton height={100} />
          </>
        ) : (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        )}
        <CustomPlanCard />
      </div>
    </div>
  );
}
