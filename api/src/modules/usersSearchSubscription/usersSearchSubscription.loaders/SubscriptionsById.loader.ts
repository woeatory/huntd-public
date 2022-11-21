import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { Models } from '@/models';

interface Args {
  id: number
}
type Result = UsersSearchSubscription | null;
type Key = string;

export class SubscriptionsByIdLoader extends DataLoader<
  Args, Result, Key
  > {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.id}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.id.add(key.id);

            return set;
          },

          { id: new Set<number>() },
        );

        const subscriptions = await models.UsersSearchSubscription.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const subscriptionsMap = subscriptions
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn(cur);

              Object.assign(acc, { [key]: cur });

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return subscriptionsMap[key] || null;
        });
      },
    );
  }
}
