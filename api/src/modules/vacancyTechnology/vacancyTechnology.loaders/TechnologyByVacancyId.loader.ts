import DataLoader from 'dataloader';
import { Op } from 'sequelize';
import { Technology } from '@/models/Technology';
import { Models } from '@/models';

interface Args {
  vacancyId: number
}

type Result = Technology[];
type Key = string;

export class TechnologyByVacancyIdLoader extends DataLoader<
  Args, Result, Key
  > {
  constructor(models: Models) {
    const cacheKeyFn = (key: Args) => `${key.vacancyId}`;

    super(
      async (args) => {
        const options = args.reduce(
          (set, key) => {
            set.vacancyIds.add(key.vacancyId);

            return set;
          },

          { vacancyIds: new Set<number>() },
        );

        const Technologies = await models.VacancyTechnology
          .findAll({
            where: {
              vacancyId: {
                [Op.in]: [...options.vacancyIds],
              },
            },
            include: [
              { model: models.Technology },
            ],
          });

        const TechnologiesMap = Technologies
          .reduce<Record<Key, Result>>(
            (acc, cur) => {
              const key = cacheKeyFn({
                vacancyId: cur.vacancyId,
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
