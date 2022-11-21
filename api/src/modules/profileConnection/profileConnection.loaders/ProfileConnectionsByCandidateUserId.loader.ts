import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { ProfileConnection } from '@/models/ProfileConnection';
import { Models } from '@/models';

interface Args {
  candidateUserId: number
}
type Result = ProfileConnection[];
type Key = string;

export class ProfileConnectionsByCandidateUserIdLoader extends DataLoader<
  Args, Result, Key
> {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.candidateUserId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.candidateUserId.add(key.candidateUserId);

            return set;
          },

          { candidateUserId: new Set<number>() },
        );

        const profileConnections = await models.ProfileConnection.findAll({
          where: {
            [Op.or]: [
              {
                candidateUserId: {
                  [Op.in]: [...options.candidateUserId],
                },
              },
            ],
          },
          order: [
            ['id', 'DESC'],
          ],
        });

        const profileConnectionsMap = profileConnections
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateUserId: cur.candidateUserId,
              });

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

          return profileConnectionsMap[key] || [];
        });
      },
    );
  }
}
