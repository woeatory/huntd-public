import { PubSub as PubSubInternal } from 'graphql-subscriptions';
import { PubSub } from '@/modules/pubSub/PubSub.typedefs';

export class PubSubConstructor extends PubSub {
  private pubsub: PubSub = new PubSubInternal();

    publish = this.pubsub.publish;

    subscribe = this.pubsub.subscribe;

    unsubscribe = this.pubsub.unsubscribe;

    asyncIterator = this.pubsub.asyncIterator;
}
