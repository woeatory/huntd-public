import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { CandidateProfile } from '@/models/CandidateProfile';
import { Models } from '@/models';

interface Args {
  id: number
}
type Result = CandidateProfile | null;
type Key = string;

export class CandidateProfileByIdLoader extends DataLoader<
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

        const candidateProfiles = await models.CandidateProfile.findAll({
          where: {
            id: {
              [Op.in]: [...options.id],
            },
          },
        });

        const candidateProfilesMap = candidateProfiles
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

          return candidateProfilesMap[key] || null;
        });
      },
    );
  }
}
