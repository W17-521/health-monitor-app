import { http, HttpResponse } from 'msw';
import { mockDailyStats, mockWeightRecords, mockWomenHealth, mockPetStatus, mockDietSummary } from '../data/health';

export const healthHandlers = [
  http.get('/api/health/daily', () => HttpResponse.json(mockDailyStats)),
  http.get('/api/health/weight', () => HttpResponse.json(mockWeightRecords)),
  http.get('/api/health/women', () => HttpResponse.json(mockWomenHealth)),
  http.get('/api/health/pet', () => HttpResponse.json(mockPetStatus)),
  http.get('/api/health/diet-summary', () => HttpResponse.json(mockDietSummary)),
];
