import { QueueEventTypes } from '@/core/queue';

export interface QueueEvent<T extends QueueEventTypes, P> {
  type: T;
  payload: P;
}
