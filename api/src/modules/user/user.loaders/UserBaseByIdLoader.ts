import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { User } from '@/models/User';
import { Models } from '@/models';

interface Args {
  id: number
}
type Result = Pick<User, 'id' | 'nfts'> | null;
type Key = string;

export class UserBaseByIdLoader extends DataLoader<
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

        const users = await models.User.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
          attributes: ['id'],
        });

        const usersMap = users
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

          return usersMap[key] || null;
        });
      },
    );
  }
}
