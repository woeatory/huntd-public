import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { CandidateProfileCity } from '@/models/CandidateProfileCity';
import { Models } from '@/models';

interface Args {
  candidateProfileId: number
}

type Result = CandidateProfileCity[];
type Key = string;

export class CandidateProfileCityByCandidateProfileIdLoader extends DataLoader<
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

        const CandidateProfileCities = await models.CandidateProfileCity
          .findAll({
            where: {
              candidateProfileId: {
                [Op.in]: [...options.candidateProfileIds],
              },
            },
          });

        const CandidateProfileCitiesMap = CandidateProfileCities
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
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

          return CandidateProfileCitiesMap[key];
        });
      },
    );
  }
}
