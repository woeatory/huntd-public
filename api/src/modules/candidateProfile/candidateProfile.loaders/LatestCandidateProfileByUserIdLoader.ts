import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { CandidateProfile } from '@/models/CandidateProfile';
import { CandidateProfileWorkPlace } from '@/models/CandidateProfileWorkPlace';
import { Models } from '@/models';

interface Args {
  userId: number
}
type Result = CandidateProfile | null;
type Key = string;

export class LatestCandidateProfileByUserIdLoader extends DataLoader<
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

        const candidateProfiles = await models.CandidateProfile.findAll({
          where: {
            userId: {
              [Op.in]: [...options.userId],
            },
          },
          order: [
            ['id', 'ASC'],
          ],
          include: [
            {
              model: CandidateProfileWorkPlace,
            },
          ],
          subQuery: false,
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
