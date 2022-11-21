import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { ProfileConnectionUserMeta } from '@/models/ProfileConnectionUserMeta';
import { Models } from '@/models';

interface Args {
  userId: number;
  profileConnectionId: number;
}
type Result = ProfileConnectionUserMeta | null;
type Key = string;

export class ProfileConnectionUserMetaByConnectionAndUserIdLoader extends
  DataLoader<Args, Result, Key> {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.userId}_${key.profileConnectionId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.userIds.add(key.userId);
            set.profileConnectionIds.add(key.profileConnectionId);

            return set;
          },

          {
            userIds: new Set<number>(),
            profileConnectionIds: new Set<number>(),
          },
        );

        const profileConnectionUserMeta = await models
          .ProfileConnectionUserMeta.findAll({
            where: {
              profileConnectionId: {
                [Op.in]: [...options.profileConnectionIds],
              },
              userId: {
                [Op.in]: [...options.userIds],
              },
            },
          });

        const profileConnectionUserMetaMap = profileConnectionUserMeta
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

          return profileConnectionUserMetaMap[key] || null;
        });
      },
    );
  }
}
