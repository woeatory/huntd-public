import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { UsersSearchSubscription } from '@/models/UsersSearchSubscription';
import { Models } from '@/models';

interface Args {
  userId: number
}
type Result = UsersSearchSubscription[];
type Key = string;

export class SubscriptionsByUserIdLoader extends DataLoader<
  Args, Result, Key
  > {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.userId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.userIds.add(key.userId);

            return set;
          },

          { userIds: new Set<number>() },
        );

        const subscriptions = await models.UsersSearchSubscription.findAll({
          where: {
            userId: {
              [Op.in]: [...options.userIds],
            },
          },
          order: [
            ['id', 'DESC'],
          ],
        });

        const subscriptionsMap = subscriptions
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn(cur);

              if (!acc[key]) {
                Object.assign(acc, { [key]: [] });
              }

              acc[key].push(cur);

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
