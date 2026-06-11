import { http, HttpResponse } from 'msw';
import { mockProfile, mockBodyData } from '../data/user';

export const userHandlers = [
  http.get('/api/user/profile', () => HttpResponse.json(mockProfile)),
  http.get('/api/user/body-data', () => HttpResponse.json(mockBodyData)),
];
