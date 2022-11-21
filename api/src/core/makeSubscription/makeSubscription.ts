import { withFilter } from 'graphql-subscriptions';
import { BaseCtx } from '@/core/typedefs';

export interface FilterFn<P, A>{
  (payload: P, args: A, ctx: BaseCtx): boolean | Promise<boolean>
}

export const makeSubscription = <P, A = unknown>(
  trigger: string | string[],
  filter: FilterFn<P, A> = () => true,
) => withFilter(
    (parent: P, args: A, ctx: BaseCtx) => ctx.pubSub.asyncIterator(trigger),
    filter,
  );
