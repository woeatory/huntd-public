import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { RecruiterProfile } from '@/models/RecruiterProfile';
import { Models } from '@/models';

interface Args {
  id: number
}
type Result = RecruiterProfile | null;
type Key = string;

export class RecruiterProfileByIdLoader extends DataLoader<
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

        const recruiterProfiles = await models.RecruiterProfile.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
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
