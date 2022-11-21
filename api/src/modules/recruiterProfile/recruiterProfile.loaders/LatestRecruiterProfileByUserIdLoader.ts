import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { Models } from '@/models';

interface Args {
  userId: number
}
type Result = RecruiterProfile | null;
type Key = string;

export class LatestRecruiterProfileByUserIdLoader extends DataLoader<
  Args, Result, Key
> {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.userId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.userId.add(key.userId);

            return set;
          },

          { userId: new Set<number>() },
        );

        const recruiterProfiles = await models.RecruiterProfile.findAll({
          where: {
            userId: {
              [Op.in]: [...options.userId],
            },
          },
          order: [
            ['id', 'ASC'],
          ],
        });

        const recruiterProfilesMap = recruiterProfiles
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

          return recruiterProfilesMap[key] || null;
        });
      },
    );
  }
}
