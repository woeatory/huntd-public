import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { EmploymentLocation } from '@/models/EmploymentLocation';
import { Models } from '@/models';

interface Args {
  candidateProfileId: number
}

type Result = EmploymentLocation[];
type Key = string;

export class EmploymentLocationByCandidateProfileIdLoader extends DataLoader<
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

        const locations = await models.CandidateProfileEmploymentLocation
          .findAll({
            where: {
              candidateProfileId: {
                [Op.in]: [...options.candidateProfileIds],
              },
            },
            include: [
              { model: models.EmploymentLocation },
            ],
          });

        const EmploymentLocationsMap = locations
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
              });

              if (!acc[key]) {
                Object.assign(acc, { [key]: [] });
              }

              acc[key].push(cur.employmentLocation);

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return EmploymentLocationsMap[key];
        });
      },
    );
  }
}
