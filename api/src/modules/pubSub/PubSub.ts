import IORedis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { rootLogger } from '@/modules/logger';
import { PubSub } from './PubSub.typedefs';

export class PubSubConstructor extends PubSub {
  private redisOptions: IORedis.RedisOptions = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    connectTimeout: 15000,
  };

  private EventPrefix = process.env.APP_ENV;

  private graphqlPubSub = new RedisPubSub({
    connection: this.redisOptions,
    connectionListener: (error) => {
      if (error) {
        rootLogger.error(
          `Couldn't connect to Redis: ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          error.message,
        );
      } else {
        rootLogger.info('Successfully connected to redis');
      }
    },
  });

  private setPrefix(event: string) {
    return `${this.EventPrefix}_${event}`;
  }

  publish<T>(event: string, payload: T): Promise<void> {
    return this.graphqlPubSub.publish<T>(
      this.setPrefix(event),
      payload,
    );
  }

  subscribe<T = any>(
    event: string,
    onMessage: (message: T) => void,
    options?: unknown,
  ): Promise<number> {
    return this.graphqlPubSub.subscribe<T>(
      this.setPrefix(event),
      onMessage,
      options,
    );
  }

  unsubscribe(subId: number) {
    return this.graphqlPubSub.unsubscribe(subId);
  }

  asyncIterator<T>(
    events: string | string[],
    options?: unknown,
  ): AsyncIterator<T> {
    const triggers = [events].flat().map(
      (event) => this.setPrefix(event),
    );

    return this.graphqlPubSub.asyncIterator(
      triggers,
      options,
    );
  }
}
