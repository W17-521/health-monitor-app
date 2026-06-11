import { http, HttpResponse } from 'msw';
import { mockCourses } from '../data/courses';
import type { ExerciseCategory } from '@/types';

export const exerciseHandlers = [
  http.get('/api/exercise/courses', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') as ExerciseCategory | null;
    if (!category || category === 'all') {
      return HttpResponse.json(mockCourses);
    }
    const filtered = mockCourses.filter((c) => c.category === category);
    return HttpResponse.json(filtered);
  }),
];
