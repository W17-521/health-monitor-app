import { userHandlers } from './user';
import { healthHandlers } from './health';
import { exerciseHandlers } from './exercise';

export const handlers = [...userHandlers, ...healthHandlers, ...exerciseHandlers];
