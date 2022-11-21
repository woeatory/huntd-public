import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { EmploymentType } from '@/models/EmploymentType';
import { Models } from '@/models';

interface Args {
  candidateProfileId: number
}

type Result = EmploymentType[];
type Key = string;

export class EmploymentTypeByCandidateProfileIdLoader extends DataLoader<
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

        const EmploymentTypes = await models.CandidateProfileEmploymentType
          .findAll({
            where: {
              candidateProfileId: {
                [Op.in]: [...options.candidateProfileIds],
              },
            },
            include: [
              { model: models.EmploymentType },
            ],
          });

        const EmploymentTypesMap = EmploymentTypes
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                candidateProfileId: cur.candidateProfileId,
              });

              if (!acc[key]) {
                Object.assign(acc, { [key]: [] });
              }

              acc[key].push(cur.employmentType);

              return acc;
            },
            {},
          );

        return args.map((arg) => {
          const key = cacheKeyFn(arg);

          return EmploymentTypesMap[key];
        });
      },
    );
  }
}
