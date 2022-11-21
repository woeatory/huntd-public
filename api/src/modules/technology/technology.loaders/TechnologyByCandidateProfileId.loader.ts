import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Technology } from '@/models/Technology';
import { Models } from '@/models';

interface Args {
  candidateProfileId: number
}

type Result = Technology[];
type Key = string;

export class TechnologyByCandidateProfileIdLoader extends DataLoader<
  Args, Result, Key
> {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.candidateProfileId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.candidateProfileIds.add(key.candidateProfileId);

            return set;
          },

          { candidateProfileIds: new Set<number>() },
        );

        const Technologies = await models.CandidateProfileTechnology
          .findAll({
            where: {
              candidateProfileId: {
                [Op.in]: [...options.candidateProfileIds],
              },
            },
            order: ['id'],
            include: [
              { model: models.Technology },
            ],
          });

        const TechnologiesMap = Technologies
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
              });

              if (!acc[key]) {
                Object.assign(acc, { [key]: [] });
              }

              acc[key].push(cur.technology);

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return TechnologiesMap[key];
        });
      },
    );
  }
}
