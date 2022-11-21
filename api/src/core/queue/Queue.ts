import { Logger } from '@mate-academy/core';
import { QueueEvents } from '@/core/queue';

export interface QueueEmitOptions {
  log: boolean;
}

export abstract class Queue {
  constructor(protected logger: Logger) {}

  abstract add(
    event: QueueEvents,
    options?: QueueEmitOptions,
  ): Promise<{ MessageId?: string | undefined }>
}
