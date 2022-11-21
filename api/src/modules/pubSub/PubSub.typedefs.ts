export abstract class PubSub {
  abstract publish<T>(event: string, payload: T): Promise<void>;

  abstract subscribe<T = any>(
    event: string,
    onMessage: (message: T) => void,
    options?: unknown,
  ): Promise<number>

  abstract unsubscribe(subId: number): void;

  abstract asyncIterator<T>(
    events: string | string[],
    options?: unknown,
  ): AsyncIterator<T>;
}
